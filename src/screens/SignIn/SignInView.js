import React from 'react';
import { Button } from 'react-native';
import styled from 'styled-components/native';
import { useAuth } from '../../store/useAuth';

function SignInScreen({ navigation }) {
  const signIn = useAuth((state) => state.signIn);

  /**
   * signIn() will call the backend with the data passed to it and then set the apps authenticated state
   * if it was able to sign in properly
   */

  const handleSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  return (
    <Container>
      <Text>Sign in screen</Text>
      <Button onPress={signIn} title="Sign in" />
      <Button
        onPress={handleSignUpPress}
        title="Dont' have an account? Sign up"
      />
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Text = styled.Text``;

export default SignInScreen;
