import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0f766e',
        tabBarLabelStyle: { fontWeight: '700' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home-outline"
              color={typeof color === 'string' ? color : '#0f766e'}
              size={typeof size === 'number' ? size : 24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: 'Bookings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="ticket-outline"
              color={typeof color === 'string' ? color : '#0f766e'}
              size={typeof size === 'number' ? size : 24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person-outline"
              color={typeof color === 'string' ? color : '#0f766e'}
              size={typeof size === 'number' ? size : 24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="settings-outline"
              color={typeof color === 'string' ? color : '#0f766e'}
              size={typeof size === 'number' ? size : 24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
