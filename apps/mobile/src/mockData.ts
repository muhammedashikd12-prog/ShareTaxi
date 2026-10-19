export type RideMode = 'Intercity' | 'On-demand' | 'Commute';

export type Trip = {
  id: string;
  title: string;
  route: string;
  departure: string;
  arrival: string;
  durationMinutes: number;
  seatsLeft: number;
  price: number;
  rating: number;
  driver: string;
  vehicle: string;
  pickup: string;
  pickupWindow: string;
  dropoff: string;
  description: string;
  amenities: string[];
};

export type BookingStatus = 'Confirmed' | 'Upcoming' | 'In progress' | 'Completed' | 'Cancelled';

export type Booking = {
  id: string;
  trip: string;
  tripId?: string;
  date: string;
  status: BookingStatus;
  pickup?: string;
  seats?: number;
  fare?: number;
};

export const rideModes: RideMode[] = ['Intercity', 'On-demand', 'Commute'];

export const tripResults: Trip[] = [
  {
    id: 'kochi-bengaluru',
    title: 'Kochi to Bengaluru',
    route: 'Kochi → Bengaluru',
    departure: '7:30 AM',
    arrival: '2:10 PM',
    durationMinutes: 390,
    seatsLeft: 3,
    price: 1299,
    rating: 4.8,
    driver: 'Anoop K',
    vehicle: 'Hyundai Creta',
    pickup: 'Kakkanad Metro Station',
    pickupWindow: 'Boarding window: 7:15 - 7:45 AM',
    dropoff: 'Bengaluru City Terminal',
    description: 'Sample ride listing with AC and luggage details for prototype review.',
    amenities: ['AC cabin', '2 cabin bags', 'Sample driver profile', 'Demo tracking preview']
  },
  {
    id: 'trivandrum-kochi',
    title: 'Trivandrum to Kochi',
    route: 'Trivandrum → Kochi',
    departure: '8:15 AM',
    arrival: '1:45 PM',
    durationMinutes: 330,
    seatsLeft: 2,
    price: 899,
    rating: 4.7,
    driver: 'Shibin M',
    vehicle: 'Maruti Swift',
    pickup: 'Pattom Bus Stand',
    pickupWindow: 'Boarding window: 8:00 - 8:30 AM',
    dropoff: 'Aluva Market',
    description: 'Sample scheduled ride for prototype booking only.',
    amenities: ['AC', 'Sample seating preference', 'Sample route', 'Flexible dropoff demo']
  },
  {
    id: 'ernakulam-aluva',
    title: 'Ernakulam to Aluva',
    route: 'Ernakulam → Aluva',
    departure: '9:10 AM',
    arrival: '9:55 AM',
    durationMinutes: 45,
    seatsLeft: 4,
    price: 220,
    rating: 4.9,
    driver: 'Riya S',
    vehicle: 'Kia Seltos',
    pickup: 'MG Road',
    pickupWindow: 'Boarding window: 9:00 - 9:20 AM',
    dropoff: 'Aluva Station',
    description: 'Sample short-distance ride with pickup details for prototype review.',
    amenities: ['Quick ride sample', 'Sample driver rating', 'Easy pickup demo', 'No payment connected']
  }
];

export const homeStats = [
  { label: 'Next ride', value: 'Demo only' },
  { label: 'Saved rides', value: '0 demo' },
  { label: 'Matches', value: 'No live data' }
];

export let bookings: Booking[] = [
  { id: 'BK-1024', trip: 'Kochi → Bengaluru', tripId: 'kochi-bengaluru', date: '25 Oct 2026', status: 'Confirmed', pickup: 'Kakkanad Metro Station', seats: 2 },
  { id: 'BK-1029', trip: 'Kochi office commute', tripId: 'ernakulam-aluva', date: 'Mon, 9:00 AM', status: 'Upcoming', pickup: 'Infopark Gate 3', seats: 1 },
  { id: 'BK-1038', trip: 'Ernakulam → Aluva', tripId: 'ernakulam-aluva', date: 'Tue, 9:10 AM', status: 'In progress', pickup: 'MG Road', seats: 1 }
];

export const getBookings = () => bookings;

export const addBooking = (booking: Booking) => {
  if (!booking.id.trim()) {
    return { ok: false as const, error: 'A booking reference is required.' };
  }

  if (bookings.some((item) => item.id === booking.id)) {
    return { ok: false as const, error: 'This booking has already been created.' };
  }

  const seats = booking.seats ?? 1;
  if (!Number.isInteger(seats) || seats < 1 || seats > 4) {
    return { ok: false as const, error: 'Choose between 1 and 4 seats.' };
  }

  const trip = booking.tripId ? tripResults.find((item) => item.id === booking.tripId) : undefined;
  if (booking.tripId && !trip) {
    return { ok: false as const, error: 'This trip is no longer available.' };
  }
  if (trip && seats > trip.seatsLeft) {
    return { ok: false as const, error: `Only ${trip.seatsLeft} seat${trip.seatsLeft === 1 ? '' : 's'} remain.` };
  }

  if (trip) trip.seatsLeft -= seats;
  bookings = [booking, ...bookings];
  return { ok: true as const, booking };
};

export const updateBookingStatus = (bookingId: string, status: BookingStatus) => {
  const booking = bookings.find((item) => item.id === bookingId);
  if (!booking || booking.status === status || booking.status === 'Cancelled' || booking.status === 'Completed') {
    return bookings;
  }

  if (status === 'Cancelled' && booking.tripId) {
    const trip = tripResults.find((item) => item.id === booking.tripId);
    if (trip) trip.seatsLeft += booking.seats ?? 1;
  }

  bookings = bookings.map((item) => item.id === bookingId ? { ...item, status } : item);
  return bookings;
};

export const cancelBooking = (bookingId: string) => updateBookingStatus(bookingId, 'Cancelled');

export const rescheduleBooking = (bookingId: string, date: string) => {
  const normalizedDate = date.trim();
  const booking = bookings.find((item) => item.id === bookingId);
  if (
    !booking ||
    !normalizedDate ||
    normalizedDate === booking.date ||
    booking.status === 'Cancelled' ||
    booking.status === 'Completed' ||
    booking.status === 'In progress'
  ) {
    return false;
  }

  bookings = bookings.map((item) => item.id === bookingId
    ? { ...item, date: normalizedDate, status: 'Upcoming' }
    : item);
  return true;
};

export const findTrips = (from: string, to: string, passengers: number) => {
  const normalizedFrom = from.trim().toLowerCase();
  const normalizedTo = to.trim().toLowerCase();
  if (!normalizedFrom || !normalizedTo || normalizedFrom === normalizedTo || !Number.isInteger(passengers) || passengers < 1) {
    return [];
  }

  return tripResults.filter((trip) => {
    const [origin, destination] = trip.route.split('→').map((city) => city.trim().toLowerCase());
    return origin === normalizedFrom && destination === normalizedTo && trip.seatsLeft >= passengers;
  });
};

export const onDemandMatches = [
  { id: 'OD-1', title: 'Shared ride to Infopark', eta: '9 mins', seats: 2, fare: '₹280' },
  { id: 'OD-2', title: 'Airport route match', eta: '11 mins', seats: 1, fare: '₹320' },
  { id: 'OD-3', title: 'Market route pickup', eta: '14 mins', seats: 3, fare: '₹210' }
];

export const rideSortOptions = ['Best match', 'Cheapest', 'Fastest'] as const;

export const savedLocations = ['Kakkanad', 'Infopark', 'Airport', 'Palarivattom'];

export const profileHighlights = [
  { label: 'Payment', value: 'Prototype only' },
  { label: 'Safety', value: 'Demo checks only' },
  { label: 'Support', value: 'No live assistance' }
];

export type NotificationItem = {
  id: string;
  title: string;
  detail: string;
  time: string;
  kind: 'ride' | 'system' | 'offer';
};

export const safetyTips = [
  'Share trip details with a trusted contact before the ride starts.',
  'Use the in-app emergency button only for critical safety issues.',
  'Check the driver and vehicle details before boarding.'
];

export const notifications: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Demo status',
    detail: 'This trip update is simulated only and does not represent a live driver.',
    time: '2 min ago',
    kind: 'ride'
  },
  {
    id: 'n2',
    title: 'No active offer',
    detail: 'This app shows demo-only offers and never claims a live promotion.',
    time: '18 min ago',
    kind: 'offer'
  },
  {
    id: 'n3',
    title: 'Prototype reminder',
    detail: 'No emergency-service, dispatch, or payment integrations are connected.',
    time: '1 hour ago',
    kind: 'system'
  }
];

export let commutePreference = {
  home: 'Kakkanad',
  work: 'Infopark',
  weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  departure: '8:30 AM',
  return: '6:15 PM',
  enabled: true
};

export const getCommutePreference = () => commutePreference;

export const saveCommutePreference = (updates: Partial<typeof commutePreference>) => {
  commutePreference = { ...commutePreference, ...updates };
  return commutePreference;
};

export const setCommuteEnabled = (enabled: boolean) => {
  commutePreference = { ...commutePreference, enabled };
  return commutePreference;
};
