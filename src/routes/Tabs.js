import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AddMedicationButton from '../screens/AddMedication/AddMedicationButton';
import HomeScreen from '../screens/Home/HomeView';
import ProfileScreen from '../screens/Profile/ProfileView';

const Tab = createBottomTabNavigator();

const RenderNull = () => null;

const Tabs = ({ navigation, route }) => {
  function getHeaderTitle() {
    // TODO: find a way to improve getting the header title
    // FIXME: there is a bug here where home does not return its title on the first render
    const routeName = getFocusedRouteNameFromRoute(route) || 'My Medications';

    switch (routeName) {
      case 'Home':
        return 'My Medications';
      case 'Profile':
        return 'My profile';
      default:
        return '';
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: getHeaderTitle() });
  }, [navigation, route]);

  return (
    <Tab.Navigator tabBarOptions={{ showLabel: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FeatherIcon name="home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="AddMedicationButton"
        component={RenderNull}
        options={{
          tabBarButton: AddMedicationButton,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FeatherIcon name="user" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
