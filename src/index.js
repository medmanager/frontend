import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { QueryClientProvider } from 'react-query';
import ErrorHandler from './components/ErrorHandler';
import Root from './routes/Root';
import { queryClient } from './store';

enableScreens();

export default function App() {
  return (
    <SafeAreaProvider>
      <ActionSheetProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <ErrorHandler>
              <Root />
            </ErrorHandler>
          </NavigationContainer>
        </QueryClientProvider>
      </ActionSheetProvider>
    </SafeAreaProvider>
  );
}
