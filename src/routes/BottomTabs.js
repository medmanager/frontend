import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from '../screens/Home/HomeScreenView';
import SettingsScreen from '../screens/Settings/SettingsScreenView';
import FeatherIcon from 'react-native-vector-icons/Feather';

const BottomTab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <BottomTab.Navigator tabBarOptions={{ showLabel: false }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FeatherIcon name="home" color={color} size={24} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FeatherIcon name="settings" color={color} size={24} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
