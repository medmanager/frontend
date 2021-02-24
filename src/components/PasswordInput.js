import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import { Colors } from '../utils';
import Error from './Error';
import Label from './Label';

const PasswordInput = ({ label, inputStyle, touched, error, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () =>
    setShowPassword((previousState) => !previousState);

  return (
    <Container>
      <Label>{label}</Label>
      <InputContainer>
        <TextInputContainer>
          <TextInput
            secureTextEntry={!showPassword}
            placeholder="Password"
            textContentType="password"
            returnKeyType="go"
            autoCorrect={false}
            style={inputStyle}
            {...props}
          />
        </TextInputContainer>
        <HidePasswordContainer>
          <HidePasswordToggleButton
            onPress={toggleShowPassword}
            activeOpacity={0.6}>
            <Icon
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color={Colors.gray[700]}
            />
          </HidePasswordToggleButton>
        </HidePasswordContainer>
      </InputContainer>
      {touched && error && <Error>{error}</Error>}
    </Container>
  );
};

const Container = styled.View`
  margin-bottom: 16px;
`;

const InputContainer = styled.View`
  flex-direction: row;
  background-color: white;
  border-width: 0.5px;
  border-color: ${Colors.gray[300]}
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 8px;
`;

const HidePasswordContainer = styled.View`
  flex: 1;
  align-items: flex-end;
  justify-content: center;
`;

const HidePasswordToggleButton = styled.TouchableOpacity`
  height: 20px;
  width: 20px;
`;

const TextInputContainer = styled.View`
  flex: 6;
`;

const TextInput = styled.TextInput`
  font-size: 16px;
  background-color: transparent;
  padding: 0;
`;

export default PasswordInput;
