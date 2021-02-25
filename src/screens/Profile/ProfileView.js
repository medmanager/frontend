import React from 'react';
import { Button } from 'react-native';
import styled from 'styled-components/native';
import { useAuth } from '../../store/useAuth';

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

export default ProfileScreen;
