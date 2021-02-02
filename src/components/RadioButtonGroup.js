import React from 'react';
import styled from 'styled-components/native';
import { Colors } from '../utils';

const RadioButton = (props) => {
  return (
    <OuterCircle style={[props.style]}>
      {props.selected ? <SelectedCircle /> : null}
    </OuterCircle>
  );
};

const OuterCircle = styled.View`
  height: 24px;
  width: 24px;
  border-radius: 12px;
  border-width: 2px;
  border-color: ${Colors.blue[500]};
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`;

const SelectedCircle = styled.View`
  height: 14px;
  width: 14px;
  border-radius: 6px;
  background-color: ${Colors.blue[500]};
`;

const RadioButtonGroup = ({ data, selectedValue, onChange }) => {
  const handleChange = (value) => {
    const event = {
      nativeEvent: {
        value,
      },
    };

    onChange(event);
  };

  return (
    <Container>
      {data.map(({ value, label }) => (
        <RadioButtonItem
          key={value}
          onPress={() => handleChange(value)}
          activeOpacity={0.6}>
          <RadioButton selected={value === selectedValue} />
          <Label>{label}</Label>
        </RadioButtonItem>
      ))}
    </Container>
  );
};

const Container = styled.View``;

const RadioButtonItem = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 32px;
  padding-right: 32px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const Label = styled.Text`
  font-size: 18px;
  color: ${Colors.gray[900]};
`;

export default RadioButtonGroup;
