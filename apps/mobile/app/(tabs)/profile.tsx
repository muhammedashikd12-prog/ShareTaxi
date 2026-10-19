import { StyleSheet, Text, View } from 'react-native';
import { profileHighlights, safetyTips, savedLocations } from '../../src/mockData';
import { theme } from '../../src/theme';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.card}>
        <Text style={styles.name}>Demo rider</Text>
        <Text style={styles.sub}>Prototype profile • Kochi</Text>
      </View>

      <View style={styles.badgeRow}>
        {profileHighlights.map((item) => (
          <View key={item.label} style={styles.badgeBox}>
            <Text style={styles.badgeLabel}>{item.label}</Text>
            <Text style={styles.badgeValue}>{item.value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.listItem}>
        <Text style={styles.label}>Saved locations</Text>
        <Text style={styles.value}>{savedLocations.join(', ')}</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.label}>Support</Text>
        <Text style={styles.value}>Prototype support only • no live helpline connected</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.label}>Safety tips</Text>
        {safetyTips.map((tip) => (
          <Text key={tip} style={styles.tip}>{'• '}{tip}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background, padding: 20 },
  title: { fontSize: 28, fontWeight: '800', color: theme.navy, marginBottom: 18 },
  card: {
    backgroundColor: theme.card,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: theme.border,
    marginBottom: 16,
  },
  name: { fontSize: 22, fontWeight: '800', color: theme.navy },
  sub: { color: '#475569', marginTop: 6 },
  badgeRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  badgeBox: {
    flex: 1,
    backgroundColor: '#edf9f7',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#cfeae4',
    padding: 12,
  },
  badgeLabel: { color: '#475569', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.8 },
  badgeValue: { color: theme.navy, fontSize: 14, fontWeight: '700', marginTop: 6 },
  listItem: {
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  label: { fontWeight: '700', color: theme.primaryDark, marginBottom: 4 },
  value: { color: '#334155' },
  tip: { color: '#334155', marginTop: 8, lineHeight: 20 },
});
