import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getBookings } from '../../src/mockData';
import { theme } from '../../src/theme';

export default function BookingsScreen() {
  const [bookingList, setBookingList] = useState(getBookings);

  useFocusEffect(useCallback(() => {
    setBookingList([...getBookings()]);
  }, []));

  const getBadgeStyle = (status: string) => {
    switch (status) {
      case 'Cancelled':
        return styles.badgeCancelled;
      case 'Completed':
        return styles.badgeCompleted;
      case 'In progress':
        return styles.badgeProgress;
      case 'Upcoming':
        return styles.badgeUpcoming;
      default:
        return styles.badgeDefault;
    }
  };

  const getBadgeTextStyle = (status: string) => {
    switch (status) {
      case 'Cancelled':
        return styles.badgeTextCancelled;
      case 'Completed':
        return styles.badgeTextCompleted;
      case 'In progress':
        return styles.badgeTextProgress;
      case 'Upcoming':
        return styles.badgeTextUpcoming;
      default:
        return styles.badgeTextDefault;
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>My bookings</Text>

      <View style={styles.summaryRow}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Active</Text>
          <Text style={styles.summaryValue}>{bookingList.filter((b) => b.status !== 'Upcoming' && b.status !== 'Completed' && b.status !== 'Cancelled').length}</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Upcoming</Text>
          <Text style={styles.summaryValue}>{bookingList.filter((b) => b.status === 'Upcoming').length}</Text>
        </View>
      </View>

      {bookingList.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No bookings yet</Text>
          <Text style={styles.meta}>Confirmed prototype bookings will appear here.</Text>
        </View>
      ) : bookingList.map((booking) => (
        <Pressable key={booking.id} style={styles.card} onPress={() => router.push({ pathname: '/booking-detail', params: { id: booking.id } })}>
          <Text style={styles.id}>{booking.id}</Text>
          <Text style={styles.trip}>{booking.trip}</Text>
          <Text style={styles.meta}>{booking.date}</Text>
          <View style={styles.badgeRow}>
            <View style={[styles.badge, getBadgeStyle(booking.status)]}><Text style={[styles.badgeText, getBadgeTextStyle(booking.status)]}>{booking.status}</Text></View>
            <Text style={styles.link}>View</Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  content: { padding: 20, paddingBottom: 24 },
  title: { fontSize: 28, fontWeight: '800', color: theme.navy, marginBottom: 18 },
  summaryRow: { flexDirection: 'row', gap: 12, marginBottom: 18 },
  summaryBox: {
    flex: 1,
    backgroundColor: '#edf9f7',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#cfeae4',
    padding: 14,
  },
  summaryLabel: { color: '#475569', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.8 },
  summaryValue: { color: theme.navy, fontSize: 24, fontWeight: '800', marginTop: 6 },
  card: {
    backgroundColor: theme.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 18,
    marginBottom: 12,
  },
  emptyState: { backgroundColor: theme.card, borderWidth: 1, borderColor: theme.border, borderRadius: 18, padding: 18 },
  emptyTitle: { color: theme.navy, fontWeight: '800', fontSize: 18, marginBottom: 6 },
  id: { color: theme.primary, fontWeight: '700', marginBottom: 6 },
  trip: { fontSize: 18, fontWeight: '700', color: theme.navy },
  meta: { marginTop: 8, color: '#475569' },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeDefault: { backgroundColor: '#dff8f6' },
  badgeUpcoming: { backgroundColor: '#ebf3ff' },
  badgeProgress: { backgroundColor: '#ecfdf5' },
  badgeCompleted: { backgroundColor: '#e7f9ee' },
  badgeCancelled: { backgroundColor: '#fff1f2' },
  badgeText: { fontWeight: '700', fontSize: 12 },
  badgeTextDefault: { color: theme.primaryDark },
  badgeTextUpcoming: { color: '#2563eb' },
  badgeTextProgress: { color: '#047857' },
  badgeTextCompleted: { color: '#166534' },
  badgeTextCancelled: { color: '#be123c' },
  link: { color: theme.primary, fontWeight: '700' },
});
