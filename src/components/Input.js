import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components/native';

const Input = ({
  label,
  inputStyle,
  containerStyle,
  touched,
  error,
  ...props
}) => {
  return (
    <Container style={containerStyle}>
      <Label>{label}</Label>
      <TextInput style={inputStyle} {...props} />
      {touched && error && <Error>{error}</Error>}
    </Container>
  );
};

const Label = styled.Text`
  font-size: 14px;
  color: #828282;
`;

const Container = styled.View`
  margin-top: 16px;
  margin-bottom: 16px;
`;

const TextInput = styled.TextInput`
  border-bottom-width: 1px;
  font-size: 18px;
  color: black;
  min-height: 40px;
  padding: 10px;
`;

const Error = styled.Text`
  color: red;
  font-size: 12px;
`;

const stylePropsType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.object),
  PropTypes.object,
]);

Input.propTypes = {
  inputStyle: stylePropsType,
  containerStyle: stylePropsType,
  ...TextInput.propTypes, // this makes the Input component have proptypes of Textinput
};
Input.defaultProps = {
  touched: false,
  error: null,
};

export default Input;
