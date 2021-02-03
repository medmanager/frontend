import React from 'react';
import styled from 'styled-components/native';
import { Colors } from '../utils';
import Label from './Label';

const Input = ({ label, inputStyle, touched, error, ...props }) => {
  return (
    <Container>
      <Label>{label}</Label>
      <TextInput style={inputStyle} {...props} />
      {touched && error && <Error>{error}</Error>}
    </Container>
  );
};

const Container = styled.View`
  margin-bottom: 24px;
`;

const TextInput = styled.TextInput`
  font-size: 16px;
  color: black;
  background-color: ${Colors.gray[100]}
  min-height: 40px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 8px;
`;

const Error = styled.Text`
  color: red;
  font-size: 12px;
  margin-top: 8px;
`;

export default Input;
