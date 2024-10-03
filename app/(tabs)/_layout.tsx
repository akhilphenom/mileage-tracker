import { Tabs } from 'expo-router';
import React from 'react';
import { Colors } from '@/constants/colors';
import { useColorScheme } from '@/hooks/use-color-scheme.hook';
import { Feather, FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: { paddingTop: 10 },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'home' : 'home-outline'} color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="refuelling"
        options={{
          title: 'Refuelling',
          tabBarIcon: ({ color, focused }) => {
            if (focused) {
              return <FontAwesome name="filter" size={24} color={color} />
            }
            return <Feather name="filter" size={24} color={color} />
          }
        }}
      />
      <Tabs.Screen
        name="performance"
        options={{
          title: 'Performance',
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'stats-chart' : 'stats-chart-outline'} size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="vehicles"
        options={{
          title: 'Vehicles',
          tabBarIcon: ({ color, focused }) => {
            if (focused) {
              return <FontAwesome5 name="motorcycle" size={24} color={color} />
            }
            return <FontAwesome name="motorcycle" size={24} color={color} />
          }
        }}
      />
    </Tabs>
  );
}
