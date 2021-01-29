import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Tabs from './Tabs';

const MainStack = createStackNavigator();

const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerTitleStyle: {},
      }}>
      <MainStack.Screen name="Home" component={Tabs} />
    </MainStack.Navigator>
  );
};

export default Main;
