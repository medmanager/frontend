import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import ActivityIcon from '../components/icons/activity';
import HomeIcon from '../components/icons/home';
import PillIcon from '../components/icons/pill';
import UserIcon from '../components/icons/user';
import HomeScreen from '../screens/Home/HomeView';
import MedicationsScreen from '../screens/Medications/MedicationsView';
import ProfileScreen from '../screens/Profile/ProfileView';
import TrackScreen from '../screens/Track/TrackView';
import { Colors } from '../utils';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator tabBarOptions={{ activeTintColor: Colors.blue[500] }}>
      <Tab.Screen
        name="Calendar"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <HomeIcon focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Track"
        component={TrackScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <ActivityIcon focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Medications"
        component={MedicationsScreen}
        options={{
          tabBarLabel: 'Meds',
          tabBarIcon: ({ color, focused }) => (
            <PillIcon focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <UserIcon focused={focused} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
