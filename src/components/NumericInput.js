import React from 'react';
import styled from 'styled-components/native';
import { Colors } from '../utils';

const NumericInput = (props) => {
  return (
    <Input
      underlineColorAndroid="transparent"
      keyboardType="numeric"
      {...props}
    />
  );
};
const Input = styled.TextInput`
  position: relative;
  font-size: 16px;
  color: black;
  margin-top: auto;
  margin-bottom: auto;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 8px;
  background-color: #fff;
  border-width: 0.5px;
  border-color: ${Colors.gray[300]};
`;

export default NumericInput;
