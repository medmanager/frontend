import {
  createStackNavigator,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import React from 'react';
import AddMedicationCamera from './AddMedicationCameraView';
import AddMedicationFrequencyView from './AddMedicationFrequencyView';
import AddMedicationReminderView from './AddMedicationReminderView';
import AddMedicationTimeView from './AddMedicationTimeView';
import AddMedicationView from './AddMedicationView';

const Stack = createStackNavigator();

const AddMedicationModal = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
      }}>
      <Stack.Screen
        name="AddMedication"
        component={AddMedicationView}
        options={{ title: 'Add Medication' }}
      />
      <Stack.Screen
        name="AddMedicationFrequency"
        component={AddMedicationFrequencyView}
        options={{ title: 'Frequency' }}
      />
      <Stack.Screen
        name="AddMedicationTime"
        component={AddMedicationTimeView}
        options={{ title: 'Time' }}
      />
      <Stack.Screen
        name="AddMedicationReminder"
        component={AddMedicationReminderView}
        options={{ title: 'Reminder' }}
      />
      <Stack.Screen
        name="AddMedicationCamera"
        component={AddMedicationCamera}
      />
    </Stack.Navigator>
  );
};

export default AddMedicationModal;
