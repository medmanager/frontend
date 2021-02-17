import React, { Fragment, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import shallow from 'zustand/shallow';
import LoadingScreen from '../screens/Loading/LoadingView';
import SignInScreen from '../screens/SignIn/SignInView';
import SignUpScreen from '../screens/SignUp/SignUpView';
import WelcomeScreen from '../screens/Welcome/WelcomeView';
import { useAuth } from '../store/useAuth';
import { getToken } from '../utils';
import Main from './Main';

const RootStack = createNativeStackNavigator();

StatusBar.setBarStyle('dark-content');

const Root = () => {
  const { restoreToken, isLoading, userToken, isSignout, setState } = useAuth(
    (state) => ({
      restoreToken: state.restoreToken,
      error: state.error,
      isLoading: state.isLoading,
      userToken: state.userToken,
      isSignout: state.isSignout,
      setState: state.setState,
    }),
    shallow,
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      const token = await getToken();

      // verify the token and set the auth state if the token is valid, otherwise show the sign in screen again
      restoreToken(token);
    };

    bootstrapAsync();
  }, [restoreToken, setState]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <RootStack.Navigator
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}>
      {userToken === null ? (
        <Fragment>
          <RootStack.Screen name="Welcome" component={WelcomeScreen} />
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
