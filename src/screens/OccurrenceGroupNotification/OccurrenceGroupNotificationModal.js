import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { Colors } from '../../utils';
import OccurrenceGroupNotificationView from './OccurrenceGroupNotificationView';

const Stack = createNativeStackNavigator();

const OccurrenceNotificationModal = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        statusBarAnimation: 'slide',
        headerTintColor: 'white',
        headerStyle: { backgroundColor: Colors.blue[500] },
        headerBackTitle: '',
        headerTopInsetEnabled: false,
      }}>
      <Stack.Screen
        name="OccurrenceGroupNotification"
        component={OccurrenceGroupNotificationView}
        options={{ title: 'Dose' }}
      />
    </Stack.Navigator>
  );
};

export default OccurrenceNotificationModal;
