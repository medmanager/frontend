import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StatusBar } from 'react-native';
import Main from './Main';

const RootStack = createStackNavigator();

StatusBar.setBarStyle('dark-content');

const Root = () => {
  return (
    <RootStack.Navigator initialRouteName="Main" headerMode="none">
      <RootStack.Screen name="Main" component={Main} />
    </RootStack.Navigator>
  );
};

export default Root;
