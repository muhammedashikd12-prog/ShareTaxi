import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { homeStats, notifications, rideModes, savedLocations, tripResults } from '../../src/mockData';
import { theme } from '../../src/theme';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>Kerala rides</Text>
      <Text style={styles.title}>Plan your next trip</Text>

      <View style={styles.statsRow}>
        {homeStats.map((stat) => (
          <View key={stat.label} style={styles.statBox}>
            <Text style={styles.statLabel}>{stat.label}</Text>
            <Text style={styles.statValue}>{stat.value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.walletCard}>
        <Text style={styles.walletLabel}>Demo wallet</Text>
        <Text style={styles.walletValue}>₹0.00</Text>
        <Text style={styles.walletMeta}>Prototype balance only • no payment processing enabled</Text>
      </View>

      <View style={styles.modeRow}>
        {rideModes.map((mode, index) => (
          <View key={mode} style={[styles.modeChip, index === 0 && styles.modeChipActive]}>
            <Text style={[styles.modeText, index === 0 && styles.modeTextActive]}>{mode}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Quick actions</Text>
      <View style={styles.actionGrid}>
        <Pressable style={styles.actionCard} onPress={() => router.push('/intercity-search')}>
          <Text style={styles.actionText}>Intercity</Text>
        </Pressable>
        <Pressable style={styles.actionCard} onPress={() => router.push('/on-demand')}>
          <Text style={styles.actionText}>On-demand</Text>
        </Pressable>
        <Pressable style={styles.actionCard} onPress={() => router.push('/commute')}>
          <Text style={styles.actionText}>Commute</Text>
        </Pressable>
      </View>

      <View style={styles.savedCard}>
        <Text style={styles.sectionTitle}>Saved locations</Text>
        <View style={styles.savedRow}>
          {savedLocations.map((location) => (
            <View key={location} style={styles.savedPill}>
              <Text style={styles.savedText}>{location}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.noticeCard}>
        <Text style={styles.sectionTitle}>Updates</Text>
        {notifications.map((item) => (
          <View key={item.id} style={styles.noticeRow}>
            <View style={[styles.noticeDot, item.kind === 'ride' ? styles.noticeDotRide : item.kind === 'offer' ? styles.noticeDotOffer : styles.noticeDotSystem]} />
            <View style={styles.noticeContent}>
              <Text style={styles.noticeTitle}>{item.title}</Text>
              <Text style={styles.noticeText}>{item.detail}</Text>
              <Text style={styles.noticeTime}>{item.time}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Popular routes</Text>
      {tripResults.map((trip) => (
        <Pressable
          key={trip.id}
          style={styles.tripCard}
          onPress={() => router.push({ pathname: '/trip-details', params: { id: trip.id } })}
        >
          <Text style={styles.tripTitle}>{trip.title}</Text>
          <Text style={styles.tripMeta}>{trip.route}</Text>
          <Text style={styles.tripMeta}>{trip.departure} • {trip.seatsLeft} seats left</Text>
          <Text style={styles.price}>₹{trip.price}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  content: { padding: 20, paddingBottom: 32 },
  eyebrow: {
    color: theme.primary,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontSize: 12,
    marginBottom: 8,
  },
  title: { fontSize: 32, fontWeight: '800', color: theme.navy, marginBottom: 18 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 18 },
  statBox: {
    flex: 1,
    backgroundColor: '#edf9f7',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#cfeae4',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  statLabel: { color: '#475569', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.8 },
  statValue: { color: theme.navy, fontSize: 18, fontWeight: '800', marginTop: 6 },
  walletCard: {
    backgroundColor: theme.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 18,
    marginBottom: 18,
  },
  walletLabel: { color: theme.primaryDark, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, fontSize: 11 },
  walletValue: { color: theme.navy, fontSize: 28, fontWeight: '800', marginTop: 8 },
  walletMeta: { color: '#475569', marginTop: 6 },
  modeRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  modeChip: {
    flex: 1,
    backgroundColor: theme.card,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.border,
  },
  modeChipActive: { backgroundColor: '#dff8f6', borderColor: '#9adac7' },
  modeText: { fontSize: 13, fontWeight: '700', color: '#334155', textAlign: 'center' },
  modeTextActive: { color: theme.primaryDark },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: theme.navy, marginBottom: 12 },
  actionGrid: { flexDirection: 'row', gap: 10, marginBottom: 22 },
  actionCard: {
    flex: 1,
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: { fontWeight: '700', color: theme.navy },
  savedCard: {
    backgroundColor: '#edf9f7',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#cfeae4',
    padding: 16,
    marginBottom: 18,
  },
  savedRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  savedPill: {
    backgroundColor: '#fff',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#cfeae4',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  savedText: { color: theme.primaryDark, fontWeight: '700' },
  noticeCard: {
    backgroundColor: theme.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 16,
    marginBottom: 18,
  },
  noticeRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  noticeDot: { width: 10, height: 10, borderRadius: 999, marginTop: 6, marginRight: 10 },
  noticeDotRide: { backgroundColor: theme.primary },
  noticeDotOffer: { backgroundColor: '#f59e0b' },
  noticeDotSystem: { backgroundColor: '#10b981' },
  noticeContent: { flex: 1 },
  noticeTitle: { color: theme.navy, fontWeight: '700', marginBottom: 4 },
  noticeText: { color: '#334155', lineHeight: 20 },
  noticeTime: { color: '#64748b', fontSize: 12, marginTop: 4 },
  tripCard: {
    backgroundColor: theme.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 18,
    marginBottom: 12,
  },
  tripTitle: { fontSize: 18, fontWeight: '800', color: theme.navy },
  tripMeta: { color: '#4b5563', fontSize: 14, marginTop: 4 },
  price: { color: theme.primary, fontWeight: '800', fontSize: 22, marginTop: 10 },
});
