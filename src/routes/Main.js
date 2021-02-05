import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import AddMedicationModal from '../screens/AddMedication/AddMedicationModal';
import Tabs from './Tabs';

const MainStack = createNativeStackNavigator();

const Main = () => {
  return (
    <MainStack.Navigator screenOptions={{ stackPresentation: 'modal' }}>
      <MainStack.Screen name="Home" component={Tabs} />
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
