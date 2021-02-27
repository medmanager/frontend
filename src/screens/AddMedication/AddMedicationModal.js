import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { Colors } from '../../utils';
import AddMedicationCamera from './AddMedicationCameraView';
import AddMedicationConfirmationView from './AddMedicationConfirmationView';
import AddMedicationCustomFrequencyView from './AddMedicationCustomFrequencyView';
import AddMedicationScheduleView from './AddMedicationScheduleView';
import AddMedicationView from './AddMedicationView';

const Stack = createNativeStackNavigator();

const AddMedicationModal = () => {
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
        name="AddMedication"
        component={AddMedicationView}
        options={{ title: 'Add Medication' }}
      />
      <Stack.Screen
        name="AddMedicationCustomFrequency"
        component={AddMedicationCustomFrequencyView}
        options={{ title: 'Custom Frequency' }}
      />
      <Stack.Screen
        name="AddMedicationSchedule"
        component={AddMedicationScheduleView}
        options={{ title: 'Schedule' }}
      />
      <Stack.Screen
        name="AddMedicationConfirmation"
        component={AddMedicationConfirmationView}
        options={{ title: 'Confirm' }}
      />
      <Stack.Screen
        name="AddMedicationCamera"
        component={AddMedicationCamera}
      />
    </Stack.Navigator>
  );
};

export default AddMedicationModal;
