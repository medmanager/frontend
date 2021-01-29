import PropTypes from 'prop-types';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const Button = ({
  text,
  instructions,
  containerStyle,
  textStyle,
  isSubmitting,
  disabled,
  indicatorColor,
  ...props
}) => {
  return (
    <ButtonContainer
      onPress={() => {
        if (instructions) instructions();
      }}
      disabled={disabled || isSubmitting}>
      {isSubmitting ? (
        <ActivityIndicator color={indicatorColor} />
      ) : (
        <Text>{text}</Text>
      )}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.TouchableOpacity`
  background-color: grey;
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

const stylePropsType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.object),
  PropTypes.object,
]);

Button.propTypes = {
  containerStyle: stylePropsType,
  textStyle: stylePropsType,
};

export default Button;
