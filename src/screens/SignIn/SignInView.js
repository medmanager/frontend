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
      <Text>Sign in screen</Text>
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
`;

const Text = styled.Text``;

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
