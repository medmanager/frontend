import PushNotificationIOS from '@react-native-community/push-notification-ios';
import React, { useCallback, useEffect } from 'react';
import { Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import AddMedicationModal from '../screens/AddMedication/AddMedicationModal';
import EditMedicationInfoView from '../screens/EditMedication/EditMedicationInfoView';
import EditMedicationView from '../screens/EditMedication/EditMedicationView';
import MedicationView from '../screens/Medication/MedicationView';
import OccurrenceGroupNotificationModal from '../screens/OccurrenceGroupNotification/OccurrenceGroupNotificationModal';
import { Colors } from '../utils';
import { setupPushNotifications } from '../utils/notifications';
import Tabs from './Tabs';

const MainStack = createNativeStackNavigator();

const Main = ({ navigation }) => {
  const handleNotificationOpen = useCallback(
    (notification) => {
      const { occurrenceGroupId } = notification.data;
      navigation.navigate('OccurrenceGroupNotificationModal', {
        screen: 'OccurrenceGroupNotification',
        params: {
          occurrenceGroupId,
        },
      });
    },
    [navigation],
  );

  useEffect(() => {
    if (Platform.OS === 'ios') {
      PushNotificationIOS.setApplicationIconBadgeNumber(0);
    } else {
      PushNotification.setApplicationIconBadgeNumber(0);
    }

    setupPushNotifications(handleNotificationOpen);
  }, [handleNotificationOpen]);

  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="Home" component={Tabs} />
      <MainStack.Screen
        name="Medication"
        component={MedicationView}
        options={{
          headerShown: true,
          stackPresentation: 'push',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: Colors.blue[500] },
          headerBackTitle: '',
        }}
      />
      <MainStack.Screen
        name="EditMedication"
        component={EditMedicationView}
        options={{
          headerShown: true,
          stackPresentation: 'push',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: Colors.blue[500] },
          headerBackTitle: '',
        }}
      />
      <MainStack.Screen
        name="EditMedicationInfo"
        component={EditMedicationInfoView}
        options={{
          headerShown: true,
          stackPresentation: 'push',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: Colors.blue[500] },
          headerTitle: 'Medication Info',
        }}
      />
      <MainStack.Screen
        name="AddMedicationModal"
        component={AddMedicationModal}
        options={{
          headerShown: false,
          stackPresentation: 'modal',
        }}
      />
      <MainStack.Screen
        name="OccurrenceGroupNotificationModal"
        component={OccurrenceGroupNotificationModal}
        options={{
          headerShown: false,
          stackPresentation: 'modal',
        }}
      />
    </MainStack.Navigator>
  );
};

export default Main;
