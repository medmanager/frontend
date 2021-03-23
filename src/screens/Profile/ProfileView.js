import React from 'react';
import { Button } from 'react-native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import styled from 'styled-components/native';
import { useAuth } from '../../store/useAuth';
import { defaultNavigatorScreenOptions } from '../../utils';

function ProfileScreen() {
  const signOut = useAuth((state) => state.signOut);
  return (
    <Container>
      <Text>Profile Screen</Text>
      <Button onPress={signOut} title="Sign out" />
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Text = styled.Text``;

const ProfileStack = createNativeStackNavigator();

export default () => (
  <ProfileStack.Navigator screenOptions={defaultNavigatorScreenOptions}>
    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
  </ProfileStack.Navigator>
);
