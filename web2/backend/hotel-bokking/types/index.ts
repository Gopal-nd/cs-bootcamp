import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().uuid().or(z.string()).optional(),
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["customer", "owner"]),
  phone: z.string().optional().nullable(),
  created_at: z.date().optional()
});



export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});


export const HotelSchema = z.object({
  id: z.string().optional(),
  ownerId: z.string().optional(),
  name: z.string().min(1),
  description: z.string().optional().nullable(),
  city: z.string().min(1),
  country: z.string().min(1),
  amenities: z.array(z.string()).default([]),
  rating: z.number().min(0).max(5).default(0).optional(),
  total_reviews: z.number().int().min(0).default(0).optional(),
  created_at: z.date().optional()
});

export const RoomSchema = z.object({
  id: z.string().optional(),
  hotel_id: z.string().optional(),
  roomNumber: z.string().min(1),
  roomType: z.string().min(1),
  pricePerNight: z.number().positive(),
  maxOccupancy: z.number().int().positive(),
  created_at: z.date().optional()
});

export const BookingSchema = z.object({
  id: z.string().optional(),
  user_id: z.string().optional(),
  roomId: z.string(),
  hotel_id: z.string().optional(),
  checkInDate: z.coerce.date(),
  checkOutDate: z.coerce.date(),
  guests: z.number().int().positive(),
  total_price: z.number().positive().optional(),
  status: z.enum(["confirmed", "cancelled"]).default("confirmed"),
  booking_date: z.date().optional(),
  cancelled_at: z.date().optional().nullable()
}).refine(
  (data) => data.checkOutDate > data.checkInDate,
  { message: "Check-out must be after check-in" }
);

export const ReviewSchema = z.object({
  id: z.string().optional(),
  user_id: z.string().optional(),
  hotel_id: z.string().optional(),
  bookingId: z.string(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional().nullable(),
  created_at: z.date().optional()
});

