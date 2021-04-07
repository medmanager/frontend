import React from 'react';
import styled from 'styled-components/native';
import { Colors } from '../utils';
import Error from './Error';
import Label from './Label';

const Input = ({ label, inputStyle = {}, touched, error, ...props }) => {
  return (
    <Container>
      <Label>{label}</Label>
      <TextInput
        style={inputStyle}
        placeholderTextColor={Colors.gray[400]}
        {...props}
      />
      {touched && error && <Error>{error}</Error>}
    </Container>
  );
};

const Container = styled.View`
  margin-bottom: 16px;
`;

const TextInput = styled.TextInput`
  font-size: 16px;
  color: black;
  background-color: white;
  border-width: 0.5px;
  border-color: ${Colors.gray[300]}
  min-height: 40px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 8px;
`;

export default Input;
