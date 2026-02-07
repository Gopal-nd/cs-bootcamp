import type { Request, Response } from "express";
import { availabilitySchema, dateQuerySchema, durationMinutesSchema, serviceSchema } from "../utils/validation";
import { prisma } from "../../db";
import type { ServiceType } from "../../generated/prisma/enums";

export async function bookAppointments(req: Request, res: Response) {
  try {
    const { slotId } = req.body;
    if (!slotId || typeof slotId !== "string") {
      return res.status(400).json({ error: "Invalid slotId" });
    }

    // 2. Parse slotId
    const parsed = parseSlotId(slotId);
    if (!parsed) {
      return res.status(400).json({ error: "Invalid slotId format" });
    }

    const { serviceId, date, startTime } = parsed;

    const dateObj = new Date(date as string);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (dateObj < today) {
      return res.status(400).json({ error: "Past slots not allowed" });
    }

    // 3. Fetch service
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
      select: {
        durationMinutes: true,
        providerId: true,
      },
    });

    if (!service) {
      return res.status(400).json({ error: "Invalid service" });
    }

    // 4. Provider cannot book own service
    if (service.providerId === req.user?.id) {
      return res.status(403).json({
        error: "Service provider cannot book own service",
      });
    }

    // 5. Derive endTime
    const startMinutes = toMinutes(startTime);
    const endMinutes = startMinutes + service.durationMinutes;
    const endTime = toHHMM(endMinutes);

    // 6. Validate availability
    const dayOfWeek = dateObj.getDay();

    const availability = await prisma.availability.findFirst({
      where: {
        serviceId,
        dayOfWeek,
        AND: [
          { startTime: { lte: startTime } },
          { endTime: { gte: endTime } },
        ],
      },
    });

    if (!availability) {
      return res.status(400).json({
        error: "Slot not within service availability",
      });
    }

    // 7. Transaction (RACE-SAFE)
    const appointment = await prisma.$transaction(async (tx) => {
      const existing = await tx.appointments.findUnique({
        where: { slotId },
      });

      if (existing) {
        throw new Error("SLOT_ALREADY_BOOKED");
      }

      return await tx.appointments.create({
        data: {
          userId: req.user?.id!,
          serviceId: serviceId as string,
          date: new Date(date as string),
          startTime,
          endTime,
          slotId,
          status: "BOOKED",
        },
      });
    });

    // 8. Success
    return res.status(201).json({
      id: appointment.id,
      slotId: appointment.slotId,
      status: appointment.status,
    });
  } catch (err: any) {
    if (err.message === "SLOT_ALREADY_BOOKED") {
      return res.status(409).json({ error: "Slot already booked" });
    }

    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

function parseSlotId(slotId: string) {
  const match = slotId.match(
    /^([a-f0-9-]+)_(\d{4}-\d{2}-\d{2})_([01]\d|2[0-3]):(00|30)$/
  );

  if (!match) return null;

  return {
    serviceId: match[1],
    date: match[2],
    startTime: `${match[3]}:${match[4]}`,
  };
}

function toMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function toHHMM(minutes: number) {
  const h = String(Math.floor(minutes / 60)).padStart(2, "0");
  const m = String(minutes % 60).padStart(2, "0");
  return `${h}:${m}`;
}



export async function getUserAppointments(req: Request, res: Response) {
  try {
    // 1️⃣ Auth check
    const user = req.user; // injected by auth middleware

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // 2️⃣ Fetch appointments
    const appointments = await prisma.appointments.findMany({
      where: {
        userId: user.id,
      },
      select: {
        date: true,
        startTime: true,
        endTime: true,
        status: true,
        service: {
          select: {
            name: true,
            type: true,
          },
        },
      },
      orderBy: [
        { date: "asc" },
        { startTime: "asc" },
      ],
    });

    // 3️⃣ Shape response
    const response = appointments.map((a) => ({
      serviceName: a.service.name,
      type: a.service.type,
      date: a.date.toISOString().split("T")[0], // YYYY-MM-DD
      startTime: a.startTime,
      endTime: a.endTime,
      status: a.status,
    }));

    return res.status(200).json(response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

