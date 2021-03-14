import PushNotificationIOS from '@react-native-community/push-notification-ios';
import React from 'react';
import { Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import AddMedicationModal from '../screens/AddMedication/AddMedicationModal';
import { Colors, setDeviceToken } from '../utils';
import Tabs from './Tabs';

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function ({ token }) {
    console.log('TOKEN:', token);
    setDeviceToken(token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: Platform.OS === 'ios',
});

const MainStack = createNativeStackNavigator();

const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        stackPresentation: 'modal',
        headerTopInsetEnabled: false,
      }}>
      <MainStack.Screen
        name="Home"
        component={Tabs}
        options={{
          headerTintColor: 'white',
          headerStyle: { backgroundColor: Colors.blue[500] },
        }}
      />
      <MainStack.Screen
        name="AddMedicationModal"
        component={AddMedicationModal}
        options={{
          headerShown: false,
        }}
      />
    </MainStack.Navigator>
  );
};

export default Main;
