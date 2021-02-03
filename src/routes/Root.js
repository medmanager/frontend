import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import React from 'react';
import { StatusBar } from 'react-native';
import AddMedicationModal from '../screens/AddMedication/AddMedicationModal';
import Main from './Main';

const RootStack = createStackNavigator();

StatusBar.setBarStyle('dark-content');

const Root = () => {
  return (
    <RootStack.Navigator
      mode="modal"
      initialRouteName="Main"
      screenOptions={TransitionPresets.ModalSlideFromBottomIOS}
      headerMode="none">
      <RootStack.Screen
        name="AddMedicationModal"
        component={AddMedicationModal}
      />
      <RootStack.Screen name="Main" component={Main} />
    </RootStack.Navigator>
  );
};

export default Root;
