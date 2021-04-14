import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { Colors } from '../utils';

const Button = ({
  text,
  isSubmitting,
  disabled,
  indicatorColor,
  onPress,
  ...props
}) => {
  return (
    <ButtonContainer
      activeOpacity={disabled ? 1 : 0.7}
      disabled={disabled || isSubmitting}
      onPress={!disabled && onPress}
      {...props}>
      {isSubmitting ? (
        <ActivityIndicator color={indicatorColor} />
      ) : (
        <Text>{text}</Text>
      )}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.TouchableOpacity`
  background-color: ${Colors.blue[500]};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  margin-top: 10px;
  margin-bottom: 10px;
  padding-top: 16px;
  padding-bottom: 16px;
  border-radius: 14px;
`;

const Text = styled.Text`
  text-align: center;
  color: white;
  font-size: 20px;
`;

Button.defaultProps = {
  text: '',
  isSubmitting: false,
  indicatorColor: 'white',
};

export default Button;
