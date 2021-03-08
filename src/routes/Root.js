import React, { Fragment, useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { useQueryClient } from 'react-query';
import shallow from 'zustand/shallow';
import LoadingScreen from '../screens/Loading/LoadingView';
import SignInScreen from '../screens/SignIn/SignInView';
import SignUpScreen from '../screens/SignUp/SignUpView';
import WelcomeScreen from '../screens/Welcome/WelcomeView';
import { useAuth } from '../store/useAuth';
import { getToken } from '../utils';
import Main from './Main';

const RootStack = createNativeStackNavigator();

LogBox.ignoreLogs([
  'Warning: Setting a timer',
  "Warning: Can't perform a React state update",
]);

const Root = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { restoreToken, userToken, isSignout } = useAuth(
    (state) => ({
      restoreToken: state.restoreToken,
      error: state.error,
      userToken: state.userToken,
      isSignout: state.isSignout,
    }),
    shallow,
  );
  const queryClient = useQueryClient();

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    (async () => {
      setIsLoading(true);

      const token = await getToken();
      // verify the token and set the auth state if the token is valid, otherwise show the sign in screen again
      await restoreToken(token);
      // try {
      //   await queryClient.prefetchQuery('calendarOccurrences', () =>
      //     api.getCalendarOccurrences(token),
      //   );
      //   await queryClient.prefetchQuery('medications', () =>
      //     api.getMedications(token),
      //   );
      // } catch (ignored) {}

      setIsLoading(false);
    })();
  }, [restoreToken, queryClient]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <RootStack.Navigator
      initialRouteName="Main"
      screenOptions={{ headerShown: false, headerTopInsetEnabled: false }}>
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
