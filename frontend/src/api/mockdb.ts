import type { Booking, EarningsSummary, Property, User } from "../types";

const today = new Date();
const iso = (d: Date) => d.toISOString();

const addDays = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
};

export const mockUsers: User[] = [
  {
    id: "u_guest_1",
    role: "guest",
    fullName: "Kuuka Mukayi",
    email: "guest@zamstay.com",
    phone: "+260 97 000 0000",
    isEmailVerified: true,
    isPhoneVerified: true,
    createdAt: iso(addDays(-120)),
  },
  {
    id: "u_partner_1",
    role: "partner",
    fullName: "ZamStay Partner",
    email: "partner@zamstay.com",
    phone: "+260 96 000 0000",
    isEmailVerified: true,
    isPhoneVerified: true,
    createdAt: iso(addDays(-240)),
  },
];

export const mockProperties: Property[] = [
  {
    id: "p_1",
    ownerId: "u_partner_1",
    title: "Executive Apartment — Kabulonga",
    description:
      "Modern executive apartment in a quiet area with security, fast Wi-Fi, and backup power.",
    type: "apartment",
    city: "Lusaka",
    area: "Kabulonga",
    address: "Kabulonga Road, Lusaka",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    pricePerNight: { currency: "ZMW", amount: 1450 },
    amenities: ["wifi", "aircon", "parking", "kitchen", "generator", "security", "workspace"],
    photos: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02e8?auto=format&fit=crop&w=1400&q=80",
    ],
    rating: 4.7,
    reviewsCount: 38,
    isVerified: true,
    isActive: true,
    createdAt: iso(addDays(-50)),
  },
  {
    id: "p_2",
    ownerId: "u_partner_1",
    title: "Safari Lodge Stay — Livingstone",
    description:
      "Peaceful lodge near Livingstone with breakfast, pool, and reliable water.",
    type: "lodge",
    city: "Livingstone",
    area: "Highlands",
    address: "Livingstone Highlands",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    pricePerNight: { currency: "ZMW", amount: 980 },
    amenities: ["wifi", "parking", "pool", "breakfast", "security", "borehole"],
    photos: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80",
    ],
    rating: 4.5,
    reviewsCount: 19,
    isVerified: false,
    isActive: true,
    createdAt: iso(addDays(-18)),
  },
  {
    id: "p_3",
    ownerId: "u_partner_1",
    title: "Guest House — Kitwe CBD",
    description:
      "Affordable guest house near the CBD. Great for short business stays.",
    type: "guesthouse",
    city: "Kitwe",
    area: "CBD",
    address: "CBD, Kitwe",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    pricePerNight: { currency: "ZMW", amount: 520 },
    amenities: ["wifi", "parking", "security"],
    photos: [
      "https://images.unsplash.com/photo-1560067174-8943bd26e4b9?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1400&q=80",
    ],
    rating: 4.2,
    reviewsCount: 11,
    isVerified: true,
    isActive: true,
    createdAt: iso(addDays(-7)),
  },
];

export const mockBookings: Booking[] = [
  {
    id: "b_1",
    propertyId: "p_1",
    guestId: "u_guest_1",
    ownerId: "u_partner_1",
    checkIn: iso(addDays(2)),
    checkOut: iso(addDays(5)),
    guests: 2,
    nights: 3,
    status: "confirmed",
    subtotal: { currency: "ZMW", amount: 1450 * 3 },
    serviceFee: { currency: "ZMW", amount: 1450 * 3 * 0.12 },
    total: { currency: "ZMW", amount: 1450 * 3 * 1.12 },
    createdAt: iso(addDays(-1)),
  },
  {
    id: "b_2",
    propertyId: "p_3",
    guestId: "u_guest_1",
    ownerId: "u_partner_1",
    checkIn: iso(addDays(-10)),
    checkOut: iso(addDays(-7)),
    guests: 1,
    nights: 3,
    status: "completed",
    subtotal: { currency: "ZMW", amount: 520 * 3 },
    serviceFee: { currency: "ZMW", amount: 520 * 3 * 0.12 },
    total: { currency: "ZMW", amount: 520 * 3 * 1.12 },
    createdAt: iso(addDays(-20)),
  },
];

export function calcEarnings(ownerId: string): EarningsSummary {
  const bookings = mockBookings.filter(
    (b) => b.ownerId === ownerId && (b.status === "completed" || b.status === "confirmed")
  );

  const gross = bookings.reduce((sum, b) => sum + b.subtotal.amount, 0);
  const fees = bookings.reduce((sum, b) => sum + b.serviceFee.amount, 0);
  const net = bookings.reduce((sum, b) => sum + (b.subtotal.amount - b.serviceFee.amount), 0);

  return {
    ownerId,
    period: "all_time",
    gross: { currency: "ZMW", amount: Math.round(gross) },
    fees: { currency: "ZMW", amount: Math.round(fees) },
    net: { currency: "ZMW", amount: Math.round(net) },
    completedBookings: bookings.filter((b) => b.status === "completed").length,
  };
}