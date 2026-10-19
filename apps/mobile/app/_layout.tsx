import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="intercity-search" />
        <Stack.Screen name="trip-details" />
        <Stack.Screen name="booking-review" />
        <Stack.Screen name="booking-detail" />
        <Stack.Screen name="track-ride" />
        <Stack.Screen name="on-demand" />
        <Stack.Screen name="request-status" />
        <Stack.Screen name="commute" />
      </Stack>
    </>
  );
}
