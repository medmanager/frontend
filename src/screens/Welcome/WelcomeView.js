import React from 'react';
import { Button, View } from 'react-native';
import styled from 'styled-components/native';
import { Colors, formatTime, getStatusText } from '../../utils';

function WelcomeScreen({ navigation }) {
  const handleSignInPress = () => {
    navigation.navigate('SignIn');
  };

  const handleSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  return (
    <Container>
      <WelcomeText>Welcome To</WelcomeText>
      <WelcomeText>Med Manager 3.0</WelcomeText>
      <SubText>{"\n"} Managing your medications has</SubText>
      <SubText>never been easier</SubText>
      <ButtonContainer>
      <SignInButton onPress={handleSignInPress}>
        <SignInButtonText>Sign In</SignInButtonText>
      </SignInButton>
      <SignUpButton onPress={handleSignUpPress}>
        <SignUpButtonText>Create An Account</SignUpButtonText>
      </SignUpButton>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  alignItems: center;
  justifyContent: center;
`;

const WelcomeText = styled.Text`
  textAlign: center;
  color: ${Colors.blue[500]};
  font-size: 36px;
`;

const SubText = styled.Text`
  textAlign: center;
  color: ${Colors.gray[600]};
  font-size: 18px;
`;

const Text = styled.Text``;

const SignInButton = styled.TouchableOpacity`
  background-color: ${Colors.blue[500]};
  margin-left: 16px;
  margin-right: 16px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 16px;
  padding-right: 16px;
  align-items: center;
  border-radius: 8px;
`;

const SignInButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

const SignUpButton = styled.TouchableOpacity`
margin-top: 12px;
background-color: transparent;
margin-left: 16px;
margin-right: 16px;
padding-top: 10px;
padding-bottom: 10px;
padding-left: 16px;
padding-right: 16px;
align-items: center;
border: 1px solid #2F80ED;
border-radius: 8px;
`;

const SignUpButtonText = styled.Text`
  color: ${Colors.blue[500]};
  font-size: 16px;
`;

const ButtonContainer = styled.View`
  border-top-width: 1px;
  border-top-color: transparent;
  width: 100%;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 8px;
  padding-bottom: 8px;
  position: absolute;
  bottom: 30px;
`;

export default WelcomeScreen;
