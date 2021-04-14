import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';
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

const RadioGroupIdSelector = ({ data, selectedId, onChange }) => {
  const navigator = useNavigation();
  const handleChange = useCallback(
    (id, value) => {
      onChange(id, value);
    },
    [onChange],
  );

  return (
    <Container>
      {data.map(({ value, label, type, route, id }) => {
        const selected = selectedId === id;

        if (type === 'RadioButtonClickThrough') {
          return (
            <RadioButtonItem
              key={id}
              onPress={() => {
                navigator.navigate(route, { id });
                handleChange(id, value);
              }}>
              <RadioButton selected={selected} />
              <Label numberOfLines={1}>
                {typeof label === 'function' ? label(value, selected) : label}
              </Label>
              <Spacer />
              <ClickThroughIcon name="chevron-right" size={18} />
            </RadioButtonItem>
          );
        }

        return (
          <RadioButtonItem
            key={id}
            onPress={() => handleChange(id, value)}
            activeOpacity={0.6}>
            <RadioButton selected={selectedId === id} />
            <Label>{label}</Label>
          </RadioButtonItem>
        );
      })}
    </Container>
  );
};

const RadioGroupValueSelector = ({ data, selectedValue, onChange }) => {
  const handleChange = useCallback(
    (value) => {
      onChange(value);
    },
    [onChange],
  );

  return (
    <Container>
      {data.map(({ value, label }, index) => {
        const selected = value === selectedValue;

        return (
          <RadioButtonItem
            key={index.toString()}
            onPress={() => handleChange(value)}
            activeOpacity={0.6}>
            <RadioButton selected={selected} />
            <Label>{label}</Label>
          </RadioButtonItem>
        );
      })}
    </Container>
  );
};

const Container = styled.View``;

const Spacer = styled.View`
  flex-grow: 1;
`;

const ClickThroughIcon = styled(Icon)`
  color: ${Colors.gray[400]};
  align-self: flex-end;
`;

const RadioButtonItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const Label = styled.Text`
  font-size: 16px;
  color: ${Colors.gray[900]};
  flex-shrink: 1;
`;

export default RadioGroupIdSelector;
export { RadioGroupValueSelector };
