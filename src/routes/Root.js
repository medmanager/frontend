import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Fragment, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import shallow from 'zustand/shallow';
import LoadingScreen from '../screens/Loading/LoadingView';
import SignInScreen from '../screens/SignIn/SignInView';
import SignUpScreen from '../screens/SignUp/SignUpView';
import { useAuth } from '../store/useAuth';
import Main from './Main';

const RootStack = createNativeStackNavigator();

StatusBar.setBarStyle('dark-content');

const Root = () => {
  const { restoreToken, isLoading, userToken, isSignout } = useAuth(
    (state) => ({
      restoreToken: state.restoreToken,
      isLoading: state.isLoading,
      userToken: state.userToken,
      isSignout: state.isSignout,
    }),
    shallow,
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let token;

      try {
        token = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      restoreToken(token);
    };

    bootstrapAsync();
  }, [restoreToken]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <RootStack.Navigator
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}>
      {userToken === null ? (
        <Fragment>
          <RootStack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              replaceAnimation: isSignout ? 'pop' : 'push',
            }}
          />
          <RootStack.Screen name="SignUp" component={SignUpScreen} />
        </Fragment>
      ) : (
        <RootStack.Screen name="Main" component={Main} />
      )}
    </RootStack.Navigator>
  );
};

export default Root;
