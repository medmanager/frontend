import React from 'react';
import { Button } from 'react-native';
import styled from 'styled-components/native';

function SignUpScreen({ navigation }) {
  const handleSignInPress = () => {
    navigation.navigate('SignIn');
  };

  return (
    <Container>
      <Text>Sign up screen</Text>
      <Button
        onPress={handleSignInPress}
        title="Already have an account? Sign in"
      />
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Text = styled.Text``;

export default SignUpScreen;
