import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { tripResults } from '../src/mockData';
import { theme } from '../src/theme';

export default function RequestStatusScreen() {
  const params = useLocalSearchParams<{ id?: string; seats?: string; pickup?: string; destination?: string; mode?: string; trip?: string; driver?: string; }>();
  const mode = params.mode ?? 'booking';

  const trip = tripResults.find((item) => item.id === params.id) ?? tripResults[0];
  const seats = Number(params.seats ?? '2');

  const isOnDemand = mode === 'on-demand';
  const primaryTitle = isOnDemand ? 'Request received' : 'Booking confirmed';
  const statusTitle = isOnDemand ? `${params.pickup ?? 'Pickup'} → ${params.destination ?? 'Destination'}` : trip.title;
  const statusMessage = isOnDemand
    ? 'Prototype matching is in progress. This request is simulated and not connected to live dispatch or payment services.'
    : 'Prototype booking status only. No driver has been assigned or dispatched.';

  const handleTrack = () => {
    if (isOnDemand) {
      router.push({ pathname: '/track-ride', params: { trip: statusTitle, driver: 'Prototype matcher' } });
      return;
    }

    router.push({ pathname: '/track-ride', params: { trip: trip.title, driver: trip.driver } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>Status</Text>
      <Text style={styles.title}>{primaryTitle}</Text>

      <View style={styles.card}>
        <Text style={styles.status}>{statusTitle}</Text>
        {isOnDemand ? (
          <>
            <Text style={styles.meta}>Pickup: {params.pickup ?? 'Not set'}</Text>
            <Text style={styles.meta}>Destination: {params.destination ?? 'Not set'}</Text>
            <Text style={styles.meta}>Passengers: {seats}</Text>
          </>
        ) : (
          <>
            <Text style={styles.meta}>Pickup: {trip.pickup}</Text>
            <Text style={styles.meta}>Passengers: {seats}</Text>
            <Text style={styles.meta}>This sample booking has no live driver or arrival estimate.</Text>
          </>
        )}
      </View>

      <View style={styles.progressBox}>
        <Text style={styles.progressLabel}>Current phase</Text>
        <Text style={styles.progressText}>{statusMessage}</Text>
      </View>

      <Pressable style={styles.cta} onPress={handleTrack}>
        <Text style={styles.ctaText}>View demo tracking</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background, padding: 24, justifyContent: 'center' },
  eyebrow: { color: theme.primary, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase', fontSize: 12 },
  title: { fontSize: 30, fontWeight: '800', color: theme.navy, marginTop: 10 },
  card: {
    backgroundColor: theme.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 20,
    marginVertical: 20,
  },
  status: { fontSize: 22, fontWeight: '800', color: theme.navy },
  meta: { color: '#475569', lineHeight: 24, marginTop: 8 },
  progressBox: {
    backgroundColor: '#edf9f7',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#cfeae4',
    padding: 16,
    marginBottom: 20,
  },
  progressLabel: { color: theme.primaryDark, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, fontSize: 11 },
  progressText: { color: theme.navy, marginTop: 8, lineHeight: 22, fontWeight: '600' },
  cta: {
    backgroundColor: theme.primary,
    borderRadius: 14,
    paddingVertical: 16,
  },
  ctaText: { color: '#fff', textAlign: 'center', fontWeight: '700' },
});
