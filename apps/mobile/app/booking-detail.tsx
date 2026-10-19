import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { cancelBooking, getBookings, rescheduleBooking, tripResults, updateBookingStatus } from '../src/mockData';
import { theme } from '../src/theme';

export default function BookingDetailScreen() {
  const params = useLocalSearchParams<{ id?: string; confirmed?: string }>();
  const bookingId = String(params.id ?? '');
  const booking = getBookings().find((item) => item.id === bookingId);
  const [showReschedule, setShowReschedule] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [newDate, setNewDate] = useState(booking?.date ?? '');
  const [rescheduleError, setRescheduleError] = useState<string | null>(null);

  if (!booking) {
    return (
      <View style={[styles.container, styles.unavailable]}>
        <Text style={styles.title}>Booking not found</Text>
        <Text style={styles.metaText}>This booking reference is not present in the current prototype session.</Text>
        <Pressable style={styles.primaryButton} onPress={() => router.back()}>
          <Text style={styles.primaryText}>Back</Text>
        </Pressable>
      </View>
    );
  }

  const canChangeBooking = booking.status === 'Confirmed' || booking.status === 'Upcoming';
  const canComplete = booking.status === 'In progress';
  const trip = booking.tripId ? tripResults.find((item) => item.id === booking.tripId) : undefined;

  const handleCancel = () => {
    setShowCancelConfirm(true);
  };

  const confirmCancel = () => {
    cancelBooking(booking.id);
    setShowCancelConfirm(false);
    router.back();
  };

  const handleReschedule = () => {
    const saved = rescheduleBooking(booking.id, newDate);
    if (!saved) {
      setRescheduleError('Enter a different date for this booking.');
      return;
    }

    setShowReschedule(false);
    router.back();
  };

  const handleComplete = () => {
    updateBookingStatus(booking.id, 'Completed');
    router.back();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {params.confirmed === 'true' ? (
        <View style={styles.confirmedBanner}>
          <Text style={styles.confirmedTitle}>Prototype booking confirmed</Text>
          <Text style={styles.confirmedText}>No payment was collected and no driver was dispatched.</Text>
        </View>
      ) : null}

      <Text style={styles.eyebrow}>Booking details</Text>
      <Text style={styles.title}>{booking.trip}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Booking reference</Text>
        <Text style={styles.value}>{booking.id}</Text>
        <Text style={styles.label}>Status</Text>
        <Text style={styles.value}>{booking.status}</Text>
        <Text style={styles.label}>Scheduled time</Text>
        <Text style={styles.value}>{booking.date}</Text>
        {booking.pickup ? (
          <>
            <Text style={styles.label}>Pickup</Text>
            <Text style={styles.value}>{booking.pickup}</Text>
          </>
        ) : null}
        <Text style={styles.label}>Passengers</Text>
        <Text style={styles.value}>{booking.seats ?? 1}</Text>
        {booking.fare !== undefined ? (
          <>
            <Text style={styles.label}>Estimated prototype fare</Text>
            <Text style={styles.value}>₹{booking.fare}</Text>
          </>
        ) : null}
        {trip ? (
          <>
            <Text style={styles.label}>Arrival</Text>
            <Text style={styles.value}>{trip.arrival} • {trip.dropoff}</Text>
          </>
        ) : null}
      </View>

      <View style={styles.metaBox}>
        <Text style={styles.metaTitle}>Prototype only</Text>
        <Text style={styles.metaText}>Driver coordination, live tracking, dispatch, and payments are not connected.</Text>
      </View>

      {params.confirmed === 'true' ? (
        <Pressable style={styles.historyButton} onPress={() => router.replace('/(tabs)/bookings')}>
          <Text style={styles.historyButtonText}>View My Bookings</Text>
        </Pressable>
      ) : null}

      {canChangeBooking ? (
        <View style={styles.row}>
          <Pressable style={styles.secondaryButton} onPress={() => {
            setNewDate(booking.date);
            setRescheduleError(null);
            setShowReschedule(true);
          }}>
            <Text style={styles.secondaryText}>Reschedule</Text>
          </Pressable>
          <Pressable
            style={styles.primaryButton}
            onPress={() => router.push({ pathname: '/track-ride', params: { trip: booking.trip, driver: trip?.driver ?? 'Prototype only' } })}
          >
            <Text style={styles.primaryText}>View demo tracking</Text>
          </Pressable>
        </View>
      ) : canComplete ? (
        <Pressable style={styles.primaryButton} onPress={handleComplete}>
          <Text style={styles.primaryText}>Mark complete</Text>
        </Pressable>
      ) : null}

      {canChangeBooking ? (
        <Pressable style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelText}>Cancel booking</Text>
        </Pressable>
      ) : null}

      <Modal visible={showReschedule} transparent animationType="fade" onRequestClose={() => setShowReschedule(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Reschedule prototype booking</Text>
            <Text style={styles.modalHint}>Enter a new date or date and time.</Text>
            <TextInput
              accessibilityLabel="New booking date"
              style={styles.dateInput}
              value={newDate}
              onChangeText={setNewDate}
              placeholder="e.g. 28 Oct 2026"
              autoCapitalize="words"
            />
            {rescheduleError ? <Text accessibilityRole="alert" style={styles.error}>{rescheduleError}</Text> : null}
            <View style={styles.row}>
              <Pressable style={styles.secondaryButton} onPress={() => setShowReschedule(false)}>
                <Text style={styles.secondaryText}>Keep current date</Text>
              </Pressable>
              <Pressable style={styles.primaryButton} onPress={handleReschedule}>
                <Text style={styles.primaryText}>Save new date</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={showCancelConfirm} transparent animationType="fade" onRequestClose={() => setShowCancelConfirm(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Cancel this booking?</Text>
            <Text style={styles.modalHint}>This prototype action releases the reserved seats. No payment or dispatch service is connected.</Text>
            <View style={styles.row}>
              <Pressable style={styles.secondaryButton} onPress={() => setShowCancelConfirm(false)}>
                <Text style={styles.secondaryText}>Keep booking</Text>
              </Pressable>
              <Pressable style={styles.cancelConfirmButton} onPress={confirmCancel}>
                <Text style={styles.cancelConfirmText}>Confirm cancellation</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  content: { padding: 20, paddingBottom: 32 },
  unavailable: { justifyContent: 'center', padding: 24 },
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
  label: { color: theme.primaryDark, fontWeight: '700', marginTop: 10 },
  value: { color: '#334155', fontSize: 16, marginTop: 6 },
  confirmedBanner: { backgroundColor: '#e7f9ee', borderColor: '#bbf7d0', borderWidth: 1, borderRadius: 16, padding: 14, marginBottom: 18 },
  confirmedTitle: { color: '#166534', fontWeight: '800', fontSize: 16 },
  confirmedText: { color: '#166534', marginTop: 4, lineHeight: 20 },
  metaBox: {
    backgroundColor: '#edf9f7',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#cfeae4',
    padding: 16,
    marginBottom: 20,
  },
  metaTitle: { color: theme.primaryDark, fontWeight: '800', marginBottom: 8 },
  metaText: { color: '#334155', lineHeight: 22 },
  row: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  primaryButton: {
    flex: 1,
    backgroundColor: theme.primary,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: { color: '#fff', fontWeight: '700', textAlign: 'center' },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#eafaf7',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryText: { color: theme.primaryDark, fontWeight: '700', textAlign: 'center' },
  cancelButton: {
    backgroundColor: '#fff1f2',
    borderWidth: 1,
    borderColor: '#fecdd3',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  cancelText: { color: '#be123c', fontWeight: '700' },
  historyButton: { backgroundColor: theme.navy, borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginBottom: 14 },
  historyButtonText: { color: '#fff', fontWeight: '700' },
  modalBackdrop: { flex: 1, backgroundColor: '#0f172a88', justifyContent: 'center', padding: 20 },
  modalCard: { backgroundColor: '#fff', borderRadius: 20, padding: 20 },
  modalTitle: { color: theme.navy, fontWeight: '800', fontSize: 20 },
  modalHint: { color: '#475569', marginTop: 8, marginBottom: 14 },
  dateInput: { borderWidth: 1, borderColor: theme.border, borderRadius: 12, padding: 14, marginBottom: 12, color: theme.navy },
  error: { color: theme.danger, fontWeight: '700', marginBottom: 12 },
  cancelConfirmButton: { flex: 1, backgroundColor: '#be123c', borderRadius: 14, paddingVertical: 16, paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center' },
  cancelConfirmText: { color: '#fff', fontWeight: '700', textAlign: 'center' },
});
