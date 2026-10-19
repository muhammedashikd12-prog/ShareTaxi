import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { theme } from '../src/theme';

export default function OnboardingScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>Welcome aboard</Text>
      <Text style={styles.title}>Set up your ShareTaxi account</Text>
      <Text style={styles.subtitle}>Keep your rides, saved locations, and safety preferences ready.</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Phone number</Text>
        <TextInput style={styles.input} value='+91 98765 43210' />

        <Text style={styles.label}>Referral code</Text>
        <TextInput style={styles.input} value='Optional' />
      </View>

      <View style={styles.optionList}>
        <Pressable style={styles.optionCard}>
          <Text style={styles.optionTitle}>Continue with Google</Text>
          <Text style={styles.optionMeta}>Fast sign-in for existing riders</Text>
        </Pressable>
        <Pressable style={styles.optionCard}>
          <Text style={styles.optionTitle}>Continue with phone</Text>
          <Text style={styles.optionMeta}>Secure OTP verification</Text>
        </Pressable>
      </View>

      <View style={styles.footerRow}>
        <Pressable style={styles.secondaryButton} onPress={() => router.push('/(tabs)')}>
          <Text style={styles.secondaryText}>Skip for now</Text>
        </Pressable>
        <Pressable style={styles.primaryButton} onPress={() => router.push('/(tabs)')}>
          <Text style={styles.primaryText}>Continue</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  content: { padding: 24, paddingBottom: 32 },
  eyebrow: { color: theme.primary, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase', fontSize: 12 },
  title: { fontSize: 32, fontWeight: '800', color: theme.navy, marginTop: 8 },
  subtitle: { color: '#475569', fontSize: 16, lineHeight: 24, marginTop: 12, marginBottom: 20 },
  card: {
    backgroundColor: theme.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 18,
    marginBottom: 18,
  },
  label: { color: theme.primaryDark, fontWeight: '700', marginTop: 12, marginBottom: 8 },
  input: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: theme.navy,
  },
  optionList: { gap: 12, marginBottom: 22 },
  optionCard: {
    backgroundColor: theme.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 16,
  },
  optionTitle: { color: theme.navy, fontWeight: '800', fontSize: 16 },
  optionMeta: { color: '#475569', marginTop: 6 },
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
