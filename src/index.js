import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import ErrorHandler from './components/ErrorHandler';
import Root from './routes/Root';

enableScreens();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ErrorHandler>
          <Root />
        </ErrorHandler>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
