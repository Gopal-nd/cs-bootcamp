import type { Request, Response } from "express";
import { availabilitySchema, dateQuerySchema, durationMinutesSchema, serviceSchema } from "../utils/validation";
import { prisma } from "../../db";
import type { ServiceType } from "../../generated/prisma/enums";


export const providerShedule = async (req: Request, res: Response) => {
  try {
    // 1️⃣ Auth
    const provider = req.user; // injected by JWT middleware

    if (!provider) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (provider.role !== "SERVICE_PROVIDER") {
      return res.status(403).json({ error: "Forbidden" });
    }

    // 2️⃣ Validate date
    const parsed = dateQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    const dateStr = parsed.data.date;
    const date = new Date(dateStr);

    // 3️⃣ Fetch services + appointments in ONE query
    const services = await prisma.service.findMany({
      where: {
        providerId: provider.id,
      },
      select: {
        id: true,
        name: true,
        appointments: {
          where: {
            date: date,
          },
          select: {
            id: true,
            startTime: true,
            endTime: true,
            status: true,
            user: {
              select: {
                name: true,
              },
            },
          },
          orderBy: {
            startTime: "asc",
          },
        },
      },
    });

    // 4️⃣ Shape response
    const response = {
      date: dateStr,
      services: services.map((service) => ({
        serviceId: service.id,
        serviceName: service.name,
        appointments: service.appointments.map((a) => ({
          appointmentId: a.id,
          userName: a.user.name,
          startTime: a.startTime,
          endTime: a.endTime,
          status: a.status,
        })),
      })),
    };

    return res.status(200).json(response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

