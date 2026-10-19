import {
  addBooking,
  cancelBooking,
  findTrips,
  getBookings,
  rescheduleBooking,
  saveCommutePreference,
  setCommuteEnabled,
  tripResults,
  updateBookingStatus,
} from '../src/mockData';

const makeBooking = (tripId: string, id: string, seats = 1) => {
  const trip = tripResults.find((item) => item.id === tripId);
  if (!trip) throw new Error(`Test trip not found: ${tripId}`);

  return {
    id,
    trip: trip.title,
    tripId: trip.id,
    date: '25 Oct 2026',
    status: 'Confirmed' as const,
    pickup: trip.pickup,
    seats,
    fare: trip.price * seats,
  };
};

describe('ShareTaxi booking lifecycle', () => {
  test('creates a booking once and reduces available seats once', () => {
    const trip = tripResults[0];
    const originalSeats = trip.seatsLeft;
    const booking = makeBooking(trip.id, `TEST-${Date.now()}-add`, 2);

    expect(addBooking(booking).ok).toBe(true);
    expect(addBooking(booking)).toEqual({ ok: false, error: 'This booking has already been created.' });
    expect(getBookings().filter((item) => item.id === booking.id)).toHaveLength(1);
    expect(trip.seatsLeft).toBe(originalSeats - 2);

    cancelBooking(booking.id);
    expect(trip.seatsLeft).toBe(originalSeats);
  });

  test('rejects invalid or over-capacity bookings without changing state', () => {
    const trip = tripResults[1];
    const originalSeats = trip.seatsLeft;
    const oversold = makeBooking(trip.id, `TEST-${Date.now()}-oversold`, originalSeats + 1);
    const invalidCount = makeBooking(trip.id, `TEST-${Date.now()}-invalid`, 0);

    expect(addBooking(oversold).ok).toBe(false);
    expect(addBooking(invalidCount).ok).toBe(false);
    expect(getBookings().some((item) => item.id === oversold.id || item.id === invalidCount.id)).toBe(false);
    expect(trip.seatsLeft).toBe(originalSeats);
  });

  test('cancelling restores seats exactly once and cancelled bookings cannot be reopened', () => {
    const trip = tripResults[1];
    const originalSeats = trip.seatsLeft;
    const booking = makeBooking(trip.id, `TEST-${Date.now()}-cancel`);
    expect(addBooking(booking).ok).toBe(true);

    cancelBooking(booking.id);
    cancelBooking(booking.id);
    updateBookingStatus(booking.id, 'Confirmed');

    expect(getBookings().find((item) => item.id === booking.id)?.status).toBe('Cancelled');
    expect(trip.seatsLeft).toBe(originalSeats);
  });

  test('reschedules a valid active booking without changing seat availability', () => {
    const trip = tripResults[2];
    const originalSeats = trip.seatsLeft;
    const booking = makeBooking(trip.id, `TEST-${Date.now()}-reschedule`);
    expect(addBooking(booking).ok).toBe(true);

    expect(rescheduleBooking(booking.id, '28 Oct 2026, 10:00 AM')).toBe(true);
    expect(rescheduleBooking(booking.id, '28 Oct 2026, 10:00 AM')).toBe(false);
    expect(getBookings().find((item) => item.id === booking.id)).toMatchObject({
      date: '28 Oct 2026, 10:00 AM',
      status: 'Upcoming',
    });
    expect(trip.seatsLeft).toBe(originalSeats - 1);
    cancelBooking(booking.id);
    expect(trip.seatsLeft).toBe(originalSeats);
  });

  test('finds only exact matching routes with enough available seats', () => {
    expect(findTrips(' kochi ', 'BENGALURU', 2).map((trip) => trip.id)).toContain('kochi-bengaluru');
    expect(findTrips('Kochi', 'Bengaluru', 4)).toHaveLength(0);
    expect(findTrips('Kochi', 'Kochi', 1)).toHaveLength(0);
  });
});

describe('ShareTaxi commute preferences', () => {
  test('saves and toggles commute settings', () => {
    const updated = saveCommutePreference({ home: 'Aluva', work: 'Kakkanad' });
    expect(updated.home).toBe('Aluva');
    expect(updated.work).toBe('Kakkanad');

    const enabled = setCommuteEnabled(false);
    expect(enabled.enabled).toBe(false);
  });
});
