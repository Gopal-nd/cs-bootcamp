import type { Request, Response } from "express";
import { availabilitySchema, dateQuerySchema, durationMinutesSchema, serviceSchema } from "../utils/validation";
import { prisma } from "../../db";
import type { ServiceType } from "../../generated/prisma/enums";
import type { string } from "zod";

export async function createServices(req: Request, res: Response) {
  try {
    const { data, success, error } = serviceSchema.safeParse(req.body)
    if (!success) {
      res.json(error).status(400)
    }
    const serviceBooking = await prisma.service.create({
      data: {
        name: data?.name as string,
        type: data?.type as ServiceType,
        durationMinutes: data?.durationMinutes as number,
        providerId: data?.providerId as string
      }
    })

    res.status(201).json(serviceBooking)

  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}


export async function setAvailability(req: Request, res: Response) {
  try {
    const { data, success, error } = availabilitySchema.safeParse(req.body)
    if (!success) {
      res.json(error).status(400)
    }
    const existAtTime = await prisma.availability.findMany({
      where: {
        serviceId: data?.serviceId as string,
        dayOfWeek: data?.dayOfWeek as number,
        AND: [
          { startTime: { lt: data?.endTime } },
          { endTime: { gt: data?.startTime } }
        ]
      },
    })
    if (existAtTime) {
      res.status(409).json({ message: "overlap" })
    }

    const setAvailability = await prisma.availability.create({
      data: {
        dayOfWeek: data?.dayOfWeek as number,
        startTime: data?.startTime as string,
        endTime: data?.endTime as string,
        serviceId: data?.serviceId as string

      },
      select: {
        serviceId: true,
        dayOfWeek: true,
        endTime: true,
        startTime: true
      }

    })

    res.status(201).json(setAvailability)

  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}


export async function getAllServices(req: Request, res: Response) {
  try {
    const parsed = serviceSchema.safeParse(req.query);

    if (!parsed.success) {
      return res.status(400).json({
        error: "Invalid service type",
      });
    }

    const { type } = parsed.data;
    const services = await prisma.service.findMany({
      where: type ? { type } : undefined,
      select: {
        id: true,
        name: true,
        type: true,
        durationMinutes: true,
        user: {
          select: {
            name: true
          }
        }
      }
    })
    const response = services.map((s) => ({
      id: s.id,
      name: s.name,
      type: s.type,
      durationMinutes: s.durationMinutes,
      providerName: s.user.name,
    }));
    res.status(200).json(response)

  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getServiceSlot(req: Request, res: Response) {
  try {
    const parsed = dateQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    const { serviceId } = req.params;
    const dateStr = parsed.data.date;
    const date = new Date(dateStr);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) {
      return res.status(400).json({ error: "Past dates not allowed" });
    }

    const service = await prisma.service.findUnique({
      where: { id: serviceId as string },
      select: { durationMinutes: true },
    });

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    const duration = service.durationMinutes;

    // 3. Day of week (0–6)
    const dayOfWeek = date.getDay();

    // 4. Fetch availability
    const availabilities = await prisma.availability.findMany({
      where: { serviceId: serviceId as string, dayOfWeek },
    });

    if (availabilities.length === 0) {
      return res.status(200).json({
        serviceId,
        date: dateStr,
        slots: [],
      });
    }

    // 5. Fetch booked appointments
    const appointments = await prisma.appointments.findMany({
      where: {
        serviceId: serviceId as string,
        date: new Date(dateStr),
        status: "BOOKED",
      },
      select: {
        startTime: true,
        endTime: true,
      },
    });

    const bookedRanges = appointments.map((a) => ({
      start: toMinutes(a.startTime),
      end: toMinutes(a.endTime),
    }));

    // 6. Generate slots
    const slots = [];

    for (const avail of availabilities) {
      let cursor = toMinutes(avail.startTime);
      const availEnd = toMinutes(avail.endTime);

      while (cursor + duration <= availEnd) {
        const slotStart = cursor;
        const slotEnd = cursor + duration;

        const conflict = bookedRanges.some((b) =>
          overlaps(slotStart, slotEnd, b.start, b.end)
        );

        if (!conflict) {
          const startTime = toHHMM(slotStart);
          const endTime = toHHMM(slotEnd);

          slots.push({
            slotId: `${serviceId}_${dateStr}_${startTime}`,
            startTime,
            endTime,
          });
        }

        cursor += 30; // step always 30 mins
      }
    }

    // 7. Return response
    return res.status(200).json({
      serviceId,
      date: dateStr,
      slots,
    });

  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
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
function overlaps(startA: number, endA: number, startB: number, endB: number) {
  return startA < endB && endA > startB;
}

