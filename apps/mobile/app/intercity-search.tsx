import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { findTrips, rideSortOptions } from '../src/mockData';
import { theme } from '../src/theme';

export default function IntercitySearchScreen() {
  const [from, setFrom] = useState('Kochi');
  const [to, setTo] = useState('Bengaluru');
  const [departureDate, setDepartureDate] = useState('25 Oct 2026');
  const [passengers, setPassengers] = useState(2);
  const [activeSort, setActiveSort] = useState<(typeof rideSortOptions)[number]>('Best match');
  const [error, setError] = useState<string | null>(null);

  const visibleTrips = useMemo(() => {
    const sorted = findTrips(from, to, passengers);
    if (activeSort === 'Cheapest') return sorted.sort((a, b) => a.price - b.price);
    if (activeSort === 'Fastest') return sorted.sort((a, b) => a.durationMinutes - b.durationMinutes);
    return sorted.sort((a, b) => b.rating * 10 + b.seatsLeft - (a.rating * 10 + a.seatsLeft));
  }, [activeSort, from, passengers, to]);

  const handleSearch = () => {
    const trimmedFrom = from.trim();
    const trimmedTo = to.trim();

    if (!trimmedFrom || !trimmedTo) {
      setError('Please enter both pickup and destination cities.');
      return;
    }

    if (trimmedFrom.toLowerCase() === trimmedTo.toLowerCase()) {
      setError('Pickup and destination must be different.');
      return;
    }

    if (!departureDate.trim()) {
      setError('Choose a departure date before searching.');
      return;
    }

    if (visibleTrips.length === 0) {
      setError('No prototype trips match this route and passenger count.');
      return;
    }

    setError(null);
    router.push({
      pathname: '/trip-details',
      params: { id: visibleTrips[0].id, passengers: String(passengers), date: departureDate.trim() },
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Intercity search</Text>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>From</Text>
        <TextInput style={styles.input} value={from} onChangeText={setFrom} placeholder="e.g. Kochi" />
      </View>
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>To</Text>
        <TextInput style={styles.input} value={to} onChangeText={setTo} placeholder="e.g. Bengaluru" />
      </View>
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Departure date</Text>
        <TextInput style={styles.input} value={departureDate} onChangeText={setDepartureDate} placeholder="25 Oct 2026" />
      </View>

      <View style={styles.passengerRow}>
        <Text style={styles.label}>Passengers</Text>
        <View style={styles.stepper}>
          <Pressable style={styles.counterButton} onPress={() => setPassengers((value) => Math.max(1, value - 1))}>
            <Text style={styles.counterText}>−</Text>
          </Pressable>
          <Text style={styles.passengerValue}>{passengers}</Text>
          <Pressable style={styles.counterButton} onPress={() => setPassengers((value) => Math.min(4, value + 1))}>
            <Text style={styles.counterText}>+</Text>
          </Pressable>
        </View>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable style={styles.primaryButton} onPress={handleSearch}>
        <Text style={styles.primaryButtonText}>Search rides</Text>
      </Pressable>

      <Text style={styles.sectionTitle}>Sort options</Text>
      <View style={styles.sortRow}>
        {rideSortOptions.map((option) => (
          <Pressable
            key={option}
            style={[styles.sortButton, activeSort === option && styles.sortButtonActive]}
            onPress={() => setActiveSort(option)}
          >
            <Text style={[styles.sortText, activeSort === option && styles.sortTextActive]}>{option}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Available trips</Text>
      {visibleTrips.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No matching trips found</Text>
          <Text style={styles.emptyText}>Try a different route or fewer passengers. Prototype trips are shown only when enough seats remain.</Text>
        </View>
      ) : (
        visibleTrips.map((trip) => (
          <Pressable
            key={trip.id}
            style={styles.tripCard}
            onPress={() => router.push({
              pathname: '/trip-details',
              params: { id: trip.id, passengers: String(passengers), date: departureDate.trim() },
            })}
          >
            <Text style={styles.tripTitle}>{trip.title}</Text>
            <Text style={styles.tripMeta}>{trip.departure} • {trip.durationMinutes} min</Text>
            <Text style={styles.tripMeta}>₹{trip.price} • {trip.seatsLeft} seats left • {trip.rating}★</Text>
          </Pressable>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  content: { padding: 20, paddingBottom: 30 },
  title: { fontSize: 30, fontWeight: '800', color: theme.navy, marginBottom: 18 },
  fieldGroup: { marginBottom: 14 },
  label: { fontWeight: '700', color: '#475569', marginBottom: 8 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: theme.border,
    color: theme.navy,
  },
  passengerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  counterButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#edf9f7',
    borderWidth: 1,
    borderColor: '#cfeae4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: { fontSize: 22, color: theme.primaryDark, fontWeight: '700' },
  passengerValue: { minWidth: 18, textAlign: 'center', color: theme.navy, fontSize: 18, fontWeight: '800' },
  error: { color: theme.danger, fontWeight: '700', marginBottom: 12 },
  primaryButton: {
    backgroundColor: theme.primary,
    borderRadius: 14,
    paddingVertical: 14,
    marginTop: 4,
    marginBottom: 22,
  },
  primaryButtonText: { color: '#fff', textAlign: 'center', fontWeight: '700' },
  sortRow: { flexDirection: 'row', gap: 8, marginBottom: 20, flexWrap: 'wrap' },
  sortButton: {
    backgroundColor: theme.card,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: theme.border,
  },
  sortButtonActive: { backgroundColor: '#dff8f6', borderColor: '#9adac7' },
  sortText: { color: '#334155', fontWeight: '700' },
  sortTextActive: { color: theme.primaryDark },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: theme.navy, marginBottom: 12 },
  tripCard: {
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },
  tripTitle: { fontSize: 18, fontWeight: '800', color: theme.navy },
  tripMeta: { color: '#475569', fontSize: 14, marginTop: 4 },
  emptyState: {
    backgroundColor: '#edf9f7',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#cfeae4',
    padding: 18,
  },
  emptyTitle: { fontWeight: '800', color: theme.navy, marginBottom: 6 },
  emptyText: { color: '#475569' },
});
