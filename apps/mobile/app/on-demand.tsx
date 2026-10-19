import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { onDemandMatches } from '../src/mockData';
import { theme } from '../src/theme';

export default function OnDemandScreen() {
  const [pickup, setPickup] = useState('Kakkanad');
  const [destination, setDestination] = useState('Infopark');
  const [passengers, setPassengers] = useState(2);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!pickup.trim() || !destination.trim()) {
      setError('Please add both pickup and destination before submitting.');
      return;
    }

    if (pickup.trim().toLowerCase() === destination.trim().toLowerCase()) {
      setError('Pickup and destination must be different.');
      return;
    }

    setError(null);
    router.push({ pathname: '/request-status', params: { mode: 'on-demand', pickup, destination, passengers: String(passengers) } });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>On-demand shared ride</Text>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Pickup</Text>
        <TextInput style={styles.input} value={pickup} onChangeText={setPickup} placeholder="Kakkanad" />
      </View>
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Destination</Text>
        <TextInput style={styles.input} value={destination} onChangeText={setDestination} placeholder="Infopark" />
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

      <View style={styles.card}>
        <Text style={styles.summaryLabel}>Prototype request summary</Text>
        <Text style={styles.value}>{pickup} → {destination}</Text>
        <Text style={styles.value}>{passengers} riders</Text>
      </View>

      <Text style={styles.sectionTitle}>Matching riders</Text>
      {onDemandMatches.map((match) => (
        <View key={match.id} style={styles.matchCard}>
          <Text style={styles.matchTitle}>{match.title}</Text>
          <Text style={styles.matchMeta}>{match.eta} away • {match.seats} seats available</Text>
          <Text style={styles.matchFare}>{match.fare}</Text>
        </View>
      ))}

      <Pressable style={styles.cta} onPress={handleSubmit}>
        <Text style={styles.ctaText}>Submit request</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  content: { padding: 20, paddingBottom: 30 },
  title: { fontSize: 30, fontWeight: '800', color: theme.navy, marginBottom: 18 },
  fieldGroup: { marginBottom: 14 },
  label: { color: '#475569', fontWeight: '700', marginBottom: 8 },
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
  card: {
    backgroundColor: theme.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 18,
    marginBottom: 18,
  },
  summaryLabel: { color: theme.primaryDark, fontWeight: '700', marginBottom: 8 },
  value: { color: '#334155', fontSize: 16, marginTop: 6 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: theme.navy, marginBottom: 12 },
  matchCard: {
    backgroundColor: theme.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 16,
    marginBottom: 12,
  },
  matchTitle: { fontSize: 18, fontWeight: '700', color: theme.navy },
  matchMeta: { color: '#475569', marginTop: 6 },
  matchFare: { color: theme.primary, fontSize: 22, fontWeight: '800', marginTop: 12 },
  cta: {
    backgroundColor: theme.primary,
    borderRadius: 14,
    paddingVertical: 16,
    marginTop: 12,
  },
  ctaText: { color: '#fff', textAlign: 'center', fontWeight: '700' },
});
