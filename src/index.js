import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import SplashScreen from 'react-native-splash-screen';
import { QueryClientProvider } from 'react-query';
import ErrorHandler from './components/ErrorHandler';
import Root from './routes/Root';
import { queryClient } from './store';

export default class App extends Component {
  componentDidMount() {
    enableScreens();
    SplashScreen.hide();
  }

  render() {
    return (
      <ErrorHandler>
        <SafeAreaProvider>
          <ActionSheetProvider>
            <QueryClientProvider client={queryClient}>
              <NavigationContainer>
                <Root />
              </NavigationContainer>
            </QueryClientProvider>
          </ActionSheetProvider>
        </SafeAreaProvider>
      </ErrorHandler>
    );
  }
}
