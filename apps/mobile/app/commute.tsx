import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { getCommutePreference, saveCommutePreference, setCommuteEnabled } from '../src/mockData';
import { theme } from '../src/theme';

export default function CommuteScreen() {
  const initialPreference = getCommutePreference();
  const [home, setHome] = useState(initialPreference.home);
  const [work, setWork] = useState(initialPreference.work);
  const [enabled, setEnabled] = useState(initialPreference.enabled);
  const [status, setStatus] = useState('Prototype commute settings are saved in memory only.');

  const handleSave = () => {
    saveCommutePreference({ home: home.trim() || initialPreference.home, work: work.trim() || initialPreference.work });
    setCommuteEnabled(enabled);
    setStatus('Commute preferences updated for this prototype session.');
  };

  const handleToggle = (nextValue: boolean) => {
    setEnabled(nextValue);
    setStatus(nextValue ? 'Recurring commute enabled for the demo.' : 'Recurring commute paused for this prototype session.');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Daily commute</Text>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Home</Text>
        <TextInput style={styles.input} value={home} onChangeText={setHome} placeholder="Kakkanad" />
      </View>
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Work</Text>
        <TextInput style={styles.input} value={work} onChangeText={setWork} placeholder="Infopark" />
      </View>

      <View style={styles.card}>
        <View style={styles.switchRow}>
          <View>
            <Text style={styles.cardTitle}>Recurring commute</Text>
            <Text style={styles.value}>Enable a demo weekly routine</Text>
          </View>
          <Switch
            value={enabled}
            onValueChange={handleToggle}
            trackColor={{ false: '#cbd5e1', true: '#99f6e4' }}
            thumbColor={enabled ? theme.primary : '#f8fafc'}
          />
        </View>
        <Text style={styles.value}>Weekdays: {initialPreference.weekdays.join(', ')}</Text>
        <Text style={styles.value}>Departure: {initialPreference.departure}</Text>
        <Text style={styles.value}>Return: {initialPreference.return}</Text>
      </View>

      <Text style={styles.status}>{status}</Text>

      <Pressable style={styles.cta} onPress={handleSave}>
        <Text style={styles.ctaText}>Save preference</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={() => router.back()}>
        <Text style={styles.secondaryText}>Back</Text>
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
  card: {
    backgroundColor: theme.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 18,
    marginVertical: 18,
  },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  cardTitle: { fontSize: 20, fontWeight: '800', color: theme.navy },
  value: { color: '#334155', marginTop: 8 },
  status: { color: theme.primaryDark, fontWeight: '700', marginBottom: 14 },
  cta: {
    backgroundColor: theme.primary,
    borderRadius: 14,
    paddingVertical: 16,
  },
  ctaText: { color: '#fff', textAlign: 'center', fontWeight: '700' },
  secondaryButton: {
    backgroundColor: '#eafaf7',
    borderRadius: 14,
    paddingVertical: 14,
    marginTop: 12,
    alignItems: 'center',
  },
  secondaryText: { color: theme.primaryDark, fontWeight: '700' },
});
