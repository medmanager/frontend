import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import React, { Fragment } from 'react';
import { Switch, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components';
import { useAddMedicationSettings } from '../../../store/useAddMedicationSettings';
import { Colors, range } from '../../../utils';

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

const Item = Picker.Item;

const TimeMultiSelect = () => {
  const {
    times,
    selectedTimes,
    amountUnit,
    toggleSelectTime,
    setMedicationAmount,
    setReminderTime,
    toggleReminder,
  } = useAddMedicationSettings((state) => ({
    times: state.times,
    selectedTimes: state.selectedTimes,
    amountUnit: state.amountUnit,
    toggleSelectTime: state.toggleSelectTime,
    setMedicationAmount: state.setMedicationAmount,
    setReminderTime: state.setReminderTime,
    toggleReminder: state.toggleReminder,
  }));

  const itemStyle = {
    height: 45,
    color: Colors.blue[500],
    borderTopRightRadius: 0,
  };

  return (
    <Container>
      {times.map(({ value, label }) => {
        const selected = selectedTimes.includes(value.id);
        const id = value.id;

        return (
          <View key={id}>
            <SelectableItem
              onPress={() => {
                toggleSelectTime(id);
              }}
              activeOpacity={0.6}>
              <Checkbox selected={selected} />
              <Text>{label}</Text>
            </SelectableItem>
            {selected && (
              <Fragment>
                <HBox>
                  <AmountPicker
                    selectedValue={value.medicationAmount}
                    onValueChange={(value) => setMedicationAmount(id, value)}
                    itemStyle={itemStyle}>
                    {range(10).map((number) => (
                      <Item
                        key={number}
                        label={number.toString()}
                        value={number.toString()}
                      />
                    ))}
                  </AmountPicker>
                  <AmountPicker itemStyle={itemStyle}>
                    <Item label={amountUnit} value={0} />
                  </AmountPicker>
                </HBox>

                <TimeSettings>
                  <HBox>
                    <Text>Send me a reminder</Text>
                    <Switch
                      trackColor={{
                        false: Colors.gray[300],
                        true: Colors.blue[500],
                      }}
                      thumbColor="#fff"
                      onValueChange={() => {
                        toggleReminder(id);
                      }}
                      value={value.sendReminder}
                    />
                  </HBox>
                  {value.sendReminder && (
                    <TimePicker
                      testID="dateTimePicker"
                      value={value.reminderTime}
                      mode="time"
                      is24Hour={true}
                      display="default"
                      onChange={(_, selectedTime) =>
                        setReminderTime(id, selectedTime || value.reminderTime)
                      }
                    />
                  )}
                </TimeSettings>
              </Fragment>
            )}
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

const HBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 16px;
`;

const Text = styled.Text`
  color: ${Colors.gray[900]};
  font-size: 16px;
`;

const AmountPicker = styled(Picker)`
  flex-grow: 1;
`;

const TimeSettings = styled.View`
  padding: 10px;
`;

const TimePicker = styled(DateTimePicker)`
  margin-top: 16px;
`;

const Container = styled.View``;

export default TimeMultiSelect;
