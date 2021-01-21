import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import 'react-native-gesture-handler';
import HomeScreen from '../screens/Home/HomeScreenView';
import SettingsScreen from '../screens/Settings/SettingsScreenView';

const BottomTab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Home" component={HomeScreen} />
      <BottomTab.Screen name="Settings" component={SettingsScreen} />
    </BottomTab.Navigator>
  );
}
