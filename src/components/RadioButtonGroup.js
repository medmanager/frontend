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
  height: 20px;
  width: 20px;
  border-radius: 12px;
  border-width: 2px;
  border-color: ${Colors.blue[500]};
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`;

const SelectedCircle = styled.View`
  height: 12px;
  width: 12px;
  border-radius: 6px;
  background-color: ${Colors.blue[500]};
`;

const RadioButtonGroup = ({ data, selectedId, onChange }) => {
  const handleChange = (value) => {
    onChange(value);
  };

  return (
    <Container>
      {data.map(({ value, label }) => {
        const id = value.id;
        return (
          <RadioButtonItem
            key={id}
            onPress={() => handleChange(value)}
            activeOpacity={0.6}>
            <RadioButton selected={selectedId === id} />
            <Label>{label}</Label>
          </RadioButtonItem>
        );
      })}
    </Container>
  );
};

const Container = styled.View``;

const RadioButtonItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const Label = styled.Text`
  font-size: 16px;
  color: ${Colors.gray[900]};
`;

export default RadioButtonGroup;
