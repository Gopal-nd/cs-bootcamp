import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(6),
  role: z.enum(["USER", "SERVICE_PROVIDER"]),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const timeHHMM = z.string().regex(
  /^([01]\d|2[0-3]):(00|30)$/,
  "Time must be HH:MM with minutes 00 or 30"
);


export const futureDate = z.coerce.date().refine((date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
}, "Past dates are not allowed");


export const RoleEnum = z.enum(["USER", "SERVICE_PROVIDER"]);

export const ServiceTypeEnum = z.enum([
  "MEDICAL",
  "HOUSE_HELP",
  "BEAUTY",
  "FITNESS",
  "EDUCATION",
  "OTHER",
]);

export const AppointmentStatusEnum = z.enum(["BOOKED", "CANCELLED"]);


export const durationMinutesSchema = z
  .number()
  .int()
  .min(30)
  .max(120)
  .refine((v) => v % 30 === 0, {
    message: "Duration must be multiple of 30",
  });

export const serviceSchema = z.object({
  name: z.string().min(1),
  type: ServiceTypeEnum,
  durationMinutes: durationMinutesSchema,
  providerId: z.string().uuid()
});

export const availabilitySchema = z
  .object({
    serviceId: z.string().uuid(),
    dayOfWeek: z.number().int().min(0).max(6),
    startTime: timeHHMM,
    endTime: timeHHMM,
  })
  .refine((data) => data.startTime < data.endTime, {
    message: "startTime must be before endTime",
    path: ["endTime"],
  });

export const appointmentSchema = z
  .object({
    userId: z.string().uuid(),
    serviceId: z.string().uuid(),
    date: futureDate,
    startTime: timeHHMM,
    endTime: timeHHMM,
    slotId: z.string(),
    status: AppointmentStatusEnum,

  })
  .refine((data) => data.startTime < data.endTime, {
    message: "startTime must be before endTime",
    path: ["endTime"],
  });


export const dateQuerySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
});

