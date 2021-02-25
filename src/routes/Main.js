import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import AddMedicationModal from '../screens/AddMedication/AddMedicationModal';
import { Colors } from '../utils';
import Tabs from './Tabs';

const MainStack = createNativeStackNavigator();

const Main = () => {
  return (
    <MainStack.Navigator screenOptions={{ stackPresentation: 'modal' }}>
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
