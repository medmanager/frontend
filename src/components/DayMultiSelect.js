import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components';
import { Colors } from '../utils';

const Checkbox = ({ selected }) => {
  return (
    <OuterCircle selected={selected}>
      {selected ? <CheckMark name="check" size={14} /> : null}
    </OuterCircle>
  );
};

const OuterCircle = styled.View`
  height: 20px;
  width: 20px;
  border-radius: 12px;
  border-width: 2px;
  border-color: ${Colors.blue[500]};
  background-color: ${(props) => (props.selected ? Colors.blue[500] : '#fff')}
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`;

const CheckMark = styled(Icon)`
  color: #fff;
`;

const DayMultiSelect = ({ data, selectedItems, onToggle }) => {
  return (
    <Container>
      {data.map(({ value, label }) => {
        const selected = selectedItems.includes(value);

        return (
          <View key={value}>
            <SelectableItem
              onPress={() => {
                if (selected && selectedItems.length === 1) {
                  // prevent selecting nothing from the list
                  return;
                }
                onToggle(value);
              }}
              activeOpacity={0.6}>
              <Checkbox selected={selected} />
              <Text>{label}</Text>
            </SelectableItem>
          </View>
        );
      })}
    </Container>
  );
};

const SelectableItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const Text = styled.Text`
  color: ${Colors.gray[900]};
  font-size: 16px;
`;

const Container = styled.View``;

export default DayMultiSelect;
