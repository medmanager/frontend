import {
  createStackNavigator,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import React from 'react';
import BackButton from '../../components/BackButton';
import { Colors } from '../../utils';
import AddMedicationCamera from './AddMedicationCameraView';
import AddMedicationConfirmationView from './AddMedicationConfirmationView';
import AddMedicationCustomFrequencyView from './AddMedicationCustomFrequencyView';
import AddMedicationView from './AddMedicationView';

const Stack = createStackNavigator();

const AddMedicationModal = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
        headerLeft: BackButton,
        headerTintColor: Colors.blue[500],
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
