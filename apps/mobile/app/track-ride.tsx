import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { theme } from '../src/theme';

export default function TrackRideScreen() {
  const params = useLocalSearchParams<{ trip?: string; driver?: string }>();
  const tripName = String(params.trip ?? 'Kochi to Bengaluru');
  const driverName = String(params.driver ?? 'Anoop K');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>Prototype demo</Text>
      <Text style={styles.title}>Simulated ride progress</Text>

      <View style={styles.card}>
        <Text style={styles.tripName}>{tripName}</Text>
        <Text style={styles.meta}>Sample driver: {driverName}</Text>
        <Text style={styles.meta}>Simulated ETA: 8 mins</Text>
        <Text style={styles.meta}>Sample vehicle: Hyundai Creta</Text>
        <Text style={styles.demoNote}>This screen does not use GPS or live driver updates.</Text>
      </View>

      <View style={styles.progressCard}>
        <Text style={styles.progressTitle}>Route progress</Text>
        <View style={styles.progressTrack}>
          <View style={styles.progressFill} />
        </View>
        <View style={styles.labelRow}>
          <Text style={styles.label}>Pickup</Text>
          <Text style={styles.label}>On the way</Text>
          <Text style={styles.label}>Destination</Text>
        </View>
      </View>

      <View style={styles.timelineCard}>
        <Text style={styles.timelineTitle}>Ride updates</Text>
        {[
          'Sample driver assigned for this prototype preview.',
          'Sample pickup and route matching state.',
          'Simulated arrival window: 8 minutes.'
        ].map((item, index) => (
          <View key={item} style={styles.timelineRow}>
            <View style={[styles.dot, index === 0 && styles.dotActive]} />
            <Text style={styles.timelineText}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={styles.footerRow}>
        <Pressable style={styles.secondaryButton} onPress={() => router.push('/(tabs)')}>
          <Text style={styles.secondaryText}>Home</Text>
        </Pressable>
        <Pressable style={styles.primaryButton} onPress={() => router.back()}>
          <Text style={styles.primaryText}>Back to request</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  content: { padding: 20, paddingBottom: 32 },
  eyebrow: { color: theme.primary, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase', fontSize: 12 },
  title: { fontSize: 30, fontWeight: '800', color: theme.navy, marginTop: 8, marginBottom: 18 },
  card: {
    backgroundColor: theme.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 18,
    marginBottom: 18,
  },
  tripName: { fontSize: 24, fontWeight: '800', color: theme.navy },
  meta: { color: '#334155', marginTop: 8, fontSize: 15 },
  demoNote: { color: theme.primaryDark, marginTop: 12, lineHeight: 20, fontWeight: '600' },
  progressCard: {
    backgroundColor: theme.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 18,
    marginBottom: 18,
  },
  progressTitle: { color: theme.navy, fontWeight: '800', fontSize: 18, marginBottom: 16 },
  progressTrack: {
    height: 10,
    backgroundColor: '#e2e8f0',
    borderRadius: 999,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    width: '72%',
    height: '100%',
    backgroundColor: theme.primary,
    borderRadius: 999,
  },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between' },
  label: { color: '#475569', fontSize: 12 },
  timelineCard: {
    backgroundColor: theme.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 18,
    marginBottom: 22,
  },
  timelineTitle: { color: theme.navy, fontWeight: '800', fontSize: 18, marginBottom: 12 },
  timelineRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 12 },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: '#cbd5e1',
    marginTop: 6,
  },
  dotActive: { backgroundColor: theme.primary },
  timelineText: { flex: 1, color: '#334155', lineHeight: 22 },
  footerRow: { flexDirection: 'row', gap: 12 },
  primaryButton: {
    flex: 1,
    backgroundColor: theme.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryText: { color: '#fff', fontWeight: '700' },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#eafaf7',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryText: { color: theme.primaryDark, fontWeight: '700' },
});
