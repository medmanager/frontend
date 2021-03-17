import PushNotificationIOS from '@react-native-community/push-notification-ios';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import AddMedicationModal from '../screens/AddMedication/AddMedicationModal';
import OccurrenceNotificationModal from '../screens/OccurrenceNotification/OccurrenceNotificationModal';
import { Colors } from '../utils';
import { setupPushNotification } from '../utils/notifications';
import Tabs from './Tabs';

const MainStack = createNativeStackNavigator();

const Main = ({ navigation }) => {
  const handleNotificationOpen = (notification) => {
    console.log('recieved notification');
    console.log(notification);
    navigation.navigate('OccurrenceNotificationModal', {
      screen: 'OccurrenceNotification',
      params: {
        dosageId: notification.data.dosageId,
        medicationId: notification.data.medicationId,
        occurrenceId: notification.data.occurrenceId,
      },
    });
  };

  useEffect(() => {
    if (Platform.OS === 'ios') {
      PushNotificationIOS.setApplicationIconBadgeNumber(0);
    } else {
      PushNotification.setApplicationIconBadgeNumber(0);
    }

    setupPushNotification(handleNotificationOpen);
  }, []);

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
      <MainStack.Screen
        name="OccurrenceNotificationModal"
        component={OccurrenceNotificationModal}
        options={{
          headerShown: false,
        }}
      />
    </MainStack.Navigator>
  );
};

export default Main;
