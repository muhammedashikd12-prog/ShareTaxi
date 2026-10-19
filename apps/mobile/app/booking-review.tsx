import { router, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { addBooking, tripResults } from '../src/mockData';
import { theme } from '../src/theme';

export default function BookingReviewScreen() {
  const params = useLocalSearchParams<{ id: string; seats?: string; pickup?: string; date?: string }>();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);
  const trip = tripResults.find((item) => item.id === params.id);
  const seats = Number(params.seats ?? '1');

  if (!trip) {
    return (
      <View style={[styles.container, styles.unavailable]}>
        <Text style={styles.title}>Trip unavailable</Text>
        <Text style={styles.noteText}>Return to search and choose an available prototype trip.</Text>
        <Pressable style={styles.cta} onPress={() => router.back()}>
          <Text style={styles.ctaText}>Back to trip details</Text>
        </Pressable>
      </View>
    );
  }

  const pickup = params.pickup?.trim() || trip.pickup;
  const departureDate = params.date?.trim() || trip.departure;
  const isValidBooking = Number.isInteger(seats) && seats >= 1 && seats <= 4 && seats <= trip.seatsLeft;
  const baseTotal = trip.price * seats;
  const serviceFee = Math.round(baseTotal * 0.08);
  const safetyFee = Math.round(baseTotal * 0.03);
  const total = baseTotal + serviceFee + safetyFee;

  const handleConfirm = () => {
    if (isSubmittingRef.current) return;
    if (!isValidBooking) {
      setError(`This trip can no longer accommodate ${seats} seat${seats === 1 ? '' : 's'}. Return to trip details and choose an available option.`);
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    const bookingId = `BK-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const result = addBooking({
      id: bookingId,
      trip: `${trip.title} • ${pickup}`,
      tripId: trip.id,
      date: `${departureDate} • ${trip.departure}`,
      status: 'Confirmed',
      pickup,
      seats,
      fare: total,
    });

    if (!result.ok) {
      setError(result.error);
      isSubmittingRef.current = false;
      setIsSubmitting(false);
      return;
    }

    router.replace({ pathname: '/booking-detail', params: { id: bookingId, confirmed: 'true' } });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Review booking</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Trip</Text>
        <Text style={styles.value}>{trip.title}</Text>
        <Text style={styles.label}>Departure</Text>
        <Text style={styles.value}>{departureDate} • {trip.departure}</Text>
        <Text style={styles.label}>Pickup</Text>
        <Text style={styles.value}>{pickup}</Text>
        <Text style={styles.label}>Passenger count</Text>
        <Text style={styles.value}>{seats} seat{seats > 1 ? 's' : ''}</Text>
        <Text style={styles.label}>Fare summary</Text>
        <Text style={styles.value}>₹{baseTotal} base + ₹{serviceFee} service + ₹{safetyFee} safety = ₹{total} estimated</Text>
      </View>

      <View style={styles.note}>
        <Text style={styles.noteText}>Prototype booking only. No payment will be collected and no driver will be dispatched.</Text>
      </View>

      {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}

      <Pressable
        style={[styles.cta, (!isValidBooking || isSubmitting) && styles.ctaDisabled]}
        onPress={handleConfirm}
        disabled={!isValidBooking || isSubmitting}
      >
        <Text style={styles.ctaText}>{isSubmitting ? 'Confirming…' : 'Confirm prototype booking'}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  content: { padding: 20, paddingBottom: 32 },
  unavailable: { justifyContent: 'center' },
  title: { fontSize: 30, fontWeight: '800', color: theme.navy, marginBottom: 18 },
  card: {
    backgroundColor: theme.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 18,
    marginBottom: 18,
  },
  label: { color: theme.primaryDark, fontWeight: '700', marginTop: 12 },
  value: { color: '#334155', fontSize: 16, marginTop: 6 },
  note: {
    backgroundColor: '#eefaf7',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#bfe8dc',
    marginBottom: 20,
  },
  noteText: { color: theme.primaryDark, lineHeight: 22 },
  error: { color: theme.danger, fontWeight: '700', marginBottom: 14 },
  cta: {
    backgroundColor: theme.primary,
    borderRadius: 14,
    paddingVertical: 16,
  },
  ctaDisabled: { opacity: 0.5 },
  ctaText: { color: '#fff', textAlign: 'center', fontWeight: '700', fontSize: 16 },
});
