import React from 'react';
import { Button } from 'react-native';
import styled from 'styled-components/native';
import { useAuth } from '../../store/useAuth';
import { Colors, formatTime, getStatusText } from '../../utils';

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
      <TopText>Welcome back!</TopText>
      <SubText>{"\n"} Let's get you signed in. {"\n"}{"\n"}</SubText>
      <TextInput placeholder="Email" />
      <TextInput placeholder="Password" />
      <ButtonContainer>
      <AlternateButton onPress={handleSignUpPress}>
        <AlternateText>Don't have an account? 
          <AlternateText style={{color: 'orange'}}> Sign up</AlternateText>
        </AlternateText>
      </AlternateButton>
      <ContinueButton onPress={signIn}>
        <ContinueButtonText>Sign In</ContinueButtonText>
      </ContinueButton>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  alignItems: center;
  margin-top: 200px;
`;

const Text = styled.Text`
font-size: 16px;
`;

const TopText = styled.Text`
  textAlign: center;
  color: ${Colors.blue[500]};
  font-size: 30px;
`;

const SubText = styled.Text`
  textAlign: center;
  color: ${Colors.gray[600]};
  font-size: 24px;
`;

//Text input for email and password
const TextInput = styled.TextInput`
  width: 328px;
  height: 38px;
  font-size: 18px;
  color: #010101;
  border: 1px solid #2F80ED;
  border-radius: 8px;
  padding-left: 10px;
  margin-top: 20px;
`;

//Button at the bottom for either signing in or signing up
const ContinueButton = styled.TouchableOpacity`
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

const ContinueButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

//button for transitioning to the opposite screen (sign in vs sign up)
const AlternateButton = styled.TouchableOpacity`
margin-top: 12px;
background-color: transparent;
margin-left: 16px;
margin-right: 16px;
padding-top: 10px;
padding-bottom: 10px;
padding-left: 16px;
padding-right: 16px;
align-items: center;
`;

const AlternateText = styled.Text`
  color: ${Colors.gray[600]};
  font-size: 16px;
`;

//for positioning the buttons at the bottom of the screen
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

export default SignInScreen;
