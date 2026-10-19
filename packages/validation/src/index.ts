import { z } from 'zod';

export const searchRideSchema = z.object({
  from: z.string().min(2, 'Pickup location is required'),
  to: z.string().min(2, 'Drop location is required'),
  date: z.string().min(1, 'Travel date is required'),
  passengers: z.coerce.number().int().min(1).max(6)
});

export const bookingSchema = z.object({
  tripId: z.string().min(1, 'Trip is required'),
  passengerName: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  seats: z.coerce.number().int().min(1).max(4)
});

export type SearchRideInput = z.infer<typeof searchRideSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
