// src/types/index.ts

export type UserRole = "guest" | "partner" | "admin";

export type User = {
  id: string;
  role: UserRole;
  fullName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  createdAt: string;
};

export type Money = {
  currency: "ZMW";
  amount: number; // store as number for mock
};

export type PropertyType =
  | "lodge"
  | "apartment"
  | "guesthouse"
  | "hotel"
  | "bnb"
  | "villa";

export type PropertyAmenity =
  | "wifi"
  | "aircon"
  | "parking"
  | "kitchen"
  | "generator"
  | "borehole"
  | "security"
  | "pool"
  | "breakfast"
  | "workspace";

export type Property = {
  id: string;
  ownerId: string;

  title: string;
  description: string;
  type: PropertyType;

  city: string;
  area?: string;
  address?: string;

  bedrooms: number;
  bathrooms: number;
  maxGuests: number;

  pricePerNight: Money;

  amenities: PropertyAmenity[];
  photos: string[];

  rating: number;
  reviewsCount: number;

  isVerified: boolean;
  createdAt: string;
};

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export type Booking = {
  id: string;
  propertyId: string;
  guestId: string;
  ownerId: string;

  checkIn: string;  // ISO date
  checkOut: string; // ISO date

  guests: number;
  status: BookingStatus;

  subtotal: Money;
  serviceFee: Money;
  total: Money;

  createdAt: string;
};

export type EarningsSummary = {
  ownerId: string;
  period: "this_month" | "last_month" | "this_year" | "all_time";
  gross: Money;
  fees: Money;
  net: Money;
  completedBookings: number;
};

export type CalendarDay = {
  date: string; // YYYY-MM-DD
  isBlocked: boolean;
  bookingId?: string;
  propertyId?: string;
};
