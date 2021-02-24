import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AddMedicationButton from '../screens/AddMedication/AddMedicationButton';
import HomeScreen from '../screens/Home/HomeView';
import ProfileScreen from '../screens/Profile/ProfileView';
import { Colors } from '../utils';

const Tab = createBottomTabNavigator();

const RenderNull = () => null;

function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Calendar" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Calendar';

  switch (routeName) {
    case 'Calendar':
      return 'Calendar';
    case 'Profile':
      return 'My profile';
  }
}

const Tabs = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  }, [navigation, route]);

  return (
    <Tab.Navigator
      tabBarOptions={{ showLabel: false, activeTintColor: Colors.blue[500] }}>
      <Tab.Screen
        name="Calendar"
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
