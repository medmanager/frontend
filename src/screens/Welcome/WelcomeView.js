import React from 'react';
import { Button } from 'react-native';
import styled from 'styled-components/native';

function WelcomeScreen({ navigation }) {
  const handleSignInPress = () => {
    navigation.navigate('SignIn');
  };

  const handleSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  return (
    <Container>
      <Text>Welcome Screen</Text>
      <Button
        onPress={handleSignInPress}
        title="Already have an account? Sign in"
      />
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

export default WelcomeScreen;
