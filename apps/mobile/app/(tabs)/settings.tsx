import { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { theme } from '../../src/theme';

export default function SettingsScreen() {
  const [tripAlerts, setTripAlerts] = useState(true);
  const [lowDataMode, setLowDataMode] = useState(false);
  const [shareLocation, setShareLocation] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.block}>
        <View style={styles.row}>
          <View>
            <Text style={styles.label}>Trip alerts</Text>
            <Text style={styles.value}>Instant updates for rides and matching</Text>
          </View>
          <Switch value={tripAlerts} onValueChange={setTripAlerts} trackColor={{ false: '#cbd5e1', true: '#99f6e4' }} thumbColor={tripAlerts ? theme.primary : '#f8fafc'} />
        </View>
      </View>

      <View style={styles.block}>
        <View style={styles.row}>
          <View>
            <Text style={styles.label}>Low data mode</Text>
            <Text style={styles.value}>Reduce media and refresh load</Text>
          </View>
          <Switch value={lowDataMode} onValueChange={setLowDataMode} trackColor={{ false: '#cbd5e1', true: '#99f6e4' }} thumbColor={lowDataMode ? theme.primary : '#f8fafc'} />
        </View>
      </View>

      <View style={styles.block}>
        <View style={styles.row}>
          <View>
            <Text style={styles.label}>Location sharing</Text>
            <Text style={styles.value}>Limited to active trip duration</Text>
          </View>
          <Switch value={shareLocation} onValueChange={setShareLocation} trackColor={{ false: '#cbd5e1', true: '#99f6e4' }} thumbColor={shareLocation ? theme.primary : '#f8fafc'} />
        </View>
      </View>

      <View style={styles.block}>
        <Text style={styles.label}>Region</Text>
        <Text style={styles.value}>Kerala, India (prototype config)</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background, padding: 20 },
  title: { fontSize: 28, fontWeight: '800', color: theme.navy, marginBottom: 18 },
  block: {
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  label: { fontWeight: '700', color: theme.primaryDark, marginBottom: 4 },
  value: { color: '#334155', maxWidth: 220 },
});
