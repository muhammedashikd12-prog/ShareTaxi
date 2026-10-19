import { router, useLocalSearchParams } from 'expo-router';
import { useFocusEffect } from 'expo-router';
import { useCallback, useMemo, useReducer, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { tripResults } from '../src/mockData';
import { theme } from '../src/theme';

export default function TripDetailsScreen() {
  const params = useLocalSearchParams<{ id: string; passengers?: string; date?: string }>();
  const trip = tripResults.find((item) => item.id === params.id);
  const [, refreshAvailability] = useReducer((value: number) => value + 1, 0);
  const [selectedSeats, setSelectedSeats] = useState(() => {
    const requestedSeats = Number(params.passengers ?? '1');
    return trip ? Math.max(1, Math.min(Number.isInteger(requestedSeats) && requestedSeats > 0 ? requestedSeats : 1, trip.seatsLeft, 4)) : 1;
  });
  const [selectedPickup, setSelectedPickup] = useState(trip?.pickup ?? '');

  useFocusEffect(useCallback(() => {
    refreshAvailability();
  }, []));

  const baseFare = useMemo(() => (trip?.price ?? 0) * selectedSeats, [trip?.price, selectedSeats]);
  const serviceFee = useMemo(() => Math.round(baseFare * 0.08), [baseFare]);
  const safetyFee = useMemo(() => Math.round(baseFare * 0.03), [baseFare]);
  const estimatedFare = useMemo(() => baseFare + serviceFee + safetyFee, [baseFare, serviceFee, safetyFee]);
  const pickupOptions = trip ? [trip.pickup, 'InfoPark Junction', 'Palarivattom'] : [];

  if (!trip) {
    return (
      <View style={[styles.container, styles.unavailable]}>
        <Text style={styles.title}>Trip unavailable</Text>
        <Text style={styles.description}>This prototype trip could not be found. Return to search and choose an available trip.</Text>
        <Pressable style={styles.unavailableButton} onPress={() => router.back()}>
          <Text style={styles.unavailableButtonText}>Back to search</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>Prototype trip details</Text>
      <Text style={styles.title}>{trip.title}</Text>
      <Text style={styles.route}>{trip.route}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Departure</Text>
        <Text style={styles.value}>{trip.departure}</Text>
        <Text style={styles.label}>Arrival</Text>
        <Text style={styles.value}>{trip.arrival}</Text>
        <Text style={styles.label}>Duration</Text>
        <Text style={styles.value}>{trip.durationMinutes} min</Text>
        <Text style={styles.label}>Boarding window</Text>
        <Text style={styles.value}>{trip.pickupWindow}</Text>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaBox}><Text style={styles.metaLabel}>Sample driver</Text><Text style={styles.metaValue}>{trip.driver}</Text></View>
        <View style={styles.metaBox}><Text style={styles.metaLabel}>Vehicle</Text><Text style={styles.metaValue}>{trip.vehicle}</Text></View>
      </View>
      <View style={styles.metaRow}>
        <View style={styles.metaBox}><Text style={styles.metaLabel}>Sample rating</Text><Text style={styles.metaValue}>{trip.rating}★</Text></View>
        <View style={styles.metaBox}><Text style={styles.metaLabel}>Seats</Text><Text style={styles.metaValue}>{trip.seatsLeft} left</Text></View>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Pickup point</Text>
        <View style={styles.chipRow}>
          {pickupOptions.map((option) => (
            <Pressable
              key={option}
              style={[styles.chip, selectedPickup === option && styles.chipSelected]}
              onPress={() => setSelectedPickup(option)}
            >
              <Text style={[styles.chipText, selectedPickup === option && styles.chipTextSelected]}>{option}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.seatSelector}>
        <Text style={styles.seatTitle}>Passengers</Text>
        <View style={styles.stepper}>
          <Pressable style={styles.counterButton} onPress={() => setSelectedSeats((value) => Math.max(1, value - 1))}>
            <Text style={styles.counterText}>−</Text>
          </Pressable>
          <Text style={styles.seatValue}>{selectedSeats}</Text>
          <Pressable style={styles.counterButton} onPress={() => setSelectedSeats((value) => Math.min(Math.min(4, trip.seatsLeft), value + 1))}>
            <Text style={styles.counterText}>+</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Why travellers choose this ride</Text>
        <View style={styles.amenityRow}>
          {trip.amenities.map((item) => (
            <View key={item} style={styles.amenityPill}>
              <Text style={styles.amenityText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      <Text style={styles.description}>{trip.description}</Text>
      <Text style={styles.prototypeNote}>Sample listing only. Driver details, availability, and trip updates are not live.</Text>

      <View style={styles.fareCard}>
        <Text style={styles.fareTitle}>Fare summary</Text>
        <View style={styles.fareRow}><Text style={styles.fareLabel}>Base fare</Text><Text style={styles.fareValue}>₹{baseFare}</Text></View>
        <View style={styles.fareRow}><Text style={styles.fareLabel}>Service fee</Text><Text style={styles.fareValue}>₹{serviceFee}</Text></View>
        <View style={styles.fareRow}><Text style={styles.fareLabel}>Safety charge</Text><Text style={styles.fareValue}>₹{safetyFee}</Text></View>
        <View style={styles.fareRowTotal}><Text style={styles.fareLabelStrong}>Total</Text><Text style={styles.fareValueStrong}>₹{estimatedFare}</Text></View>
      </View>

      <View style={styles.footerBar}>
        <View>
          <Text style={styles.priceLabel}>Estimated total</Text>
          <Text style={styles.price}>₹{estimatedFare}</Text>
        </View>
        <Pressable
          style={[styles.cta, trip.seatsLeft < selectedSeats && styles.ctaDisabled]}
          disabled={trip.seatsLeft < selectedSeats}
          onPress={() => router.push({
            pathname: '/booking-review',
            params: {
              id: trip.id,
              seats: String(selectedSeats),
              pickup: selectedPickup,
              date: params.date ?? trip.departure,
            },
          })}
        >
          <Text style={styles.ctaText}>Review booking</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  content: { padding: 20, paddingBottom: 30 },
  eyebrow: { color: theme.primary, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase', fontSize: 12 },
  title: { fontSize: 30, fontWeight: '800', color: theme.navy, marginTop: 8 },
  route: { fontSize: 16, color: '#475569', marginBottom: 20 },
  card: {
    backgroundColor: theme.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 18,
    marginBottom: 16,
  },
  label: { fontWeight: '700', color: theme.primaryDark, marginTop: 10 },
  value: { fontSize: 16, color: '#334155', marginTop: 4 },
  metaRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  metaBox: { flex: 1, backgroundColor: theme.card, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: theme.border },
  metaLabel: { color: '#475569', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 },
  metaValue: { color: theme.navy, fontWeight: '700', marginTop: 6 },
  sectionCard: {
    backgroundColor: theme.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: { color: theme.primaryDark, fontWeight: '700', marginBottom: 12 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: theme.border,
    backgroundColor: '#f8fafc',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  chipSelected: { backgroundColor: '#e7f6f3', borderColor: '#bfe8dc' },
  chipText: { color: '#334155', fontWeight: '600' },
  chipTextSelected: { color: theme.primaryDark },
  seatSelector: {
    backgroundColor: theme.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 16,
    marginBottom: 16,
  },
  seatTitle: { color: theme.primaryDark, fontWeight: '700', marginBottom: 10 },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 170,
  },
  counterButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#edf9f7',
    borderWidth: 1,
    borderColor: '#cfeae4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: { fontSize: 24, color: theme.primaryDark, fontWeight: '700' },
  seatValue: { fontSize: 20, fontWeight: '800', color: theme.navy },
  amenityRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  amenityPill: { backgroundColor: '#edf9f7', borderRadius: 999, paddingVertical: 7, paddingHorizontal: 10, marginRight: 8, marginBottom: 8 },
  amenityText: { color: theme.primaryDark, fontWeight: '600', fontSize: 12 },
  description: { color: '#334155', lineHeight: 22, marginBottom: 20 },
  prototypeNote: { color: theme.primaryDark, lineHeight: 21, fontWeight: '600', marginBottom: 16 },
  fareCard: {
    backgroundColor: theme.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 16,
    marginBottom: 18,
  },
  fareTitle: { color: theme.navy, fontWeight: '800', marginBottom: 12, fontSize: 16 },
  fareRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  fareLabel: { color: '#475569' },
  fareValue: { color: '#1f2937', fontWeight: '600' },
  fareRowTotal: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: theme.border },
  fareLabelStrong: { color: theme.navy, fontWeight: '800' },
  fareValueStrong: { color: theme.primary, fontWeight: '800' },
  footerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 18,
    padding: 16,
  },
  unavailable: { padding: 24, justifyContent: 'center' },
  unavailableButton: { marginTop: 18, backgroundColor: theme.primary, borderRadius: 14, padding: 16 },
  unavailableButtonText: { color: '#fff', textAlign: 'center', fontWeight: '700' },
  priceLabel: { color: '#475569', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 },
  price: { color: theme.primary, fontSize: 24, fontWeight: '800' },
  cta: { backgroundColor: theme.primary, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12 },
  ctaDisabled: { opacity: 0.45 },
  ctaText: { color: '#fff', fontWeight: '700' },
});
