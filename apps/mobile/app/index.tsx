import { router } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { theme } from '../src/theme';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.badge}>ShareTaxi.co</Text>
        <Text style={styles.title}>Your route. Shared.</Text>
        <Text style={styles.subtitle}>
          Discover safe intercity seats, demand-matched rides, and recurring commute options for Kerala.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Prototype mode</Text>
          <Text style={styles.cardText}>
            Booking, matching, and commute flows below are clearly labeled mock data for product development.
          </Text>
        </View>

        <View style={styles.buttonStack}>
          <Text style={styles.primaryButton} onPress={() => router.push('/onboarding')}>
            Continue to app
          </Text>
          <Text style={styles.secondaryButton} onPress={() => router.push('/intercity-search')}>
            Search a ride
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.background,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#dff8f6',
    color: theme.primaryDark,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  title: {
    fontSize: 42,
    lineHeight: 46,
    fontWeight: '800',
    color: theme.navy,
    marginBottom: 12,
  },
  subtitle: {
    color: '#475569',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 22,
  },
  card: {
    backgroundColor: theme.card,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: theme.border,
    marginBottom: 28,
  },
  cardLabel: {
    color: theme.primary,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  cardText: {
    color: '#334155',
    lineHeight: 22,
  },
  buttonStack: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: theme.primary,
    color: '#fff',
    textAlign: 'center',
    borderRadius: 14,
    paddingVertical: 16,
    fontWeight: '700',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#eafaf7',
    color: theme.primaryDark,
    textAlign: 'center',
    borderRadius: 14,
    paddingVertical: 16,
    fontWeight: '700',
    fontSize: 16,
  },
});
