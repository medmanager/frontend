import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { Switch, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components';
import shallow from 'zustand/shallow';
import { useAddMedication } from '../../../store/useAddMedication';
import { Colors, formatTime } from '../../../utils';

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

const DosageMultiSelect = () => {
  const {
    times,
    selectedTimes,
    toggleSelectTime,
    setDose,
    setReminderTime,
    toggleReminder,
    sendTimePicker,
  } = useAddMedication(
    (state) => ({
      times: state.times,
      selectedTimes: state.selectedTimes,
      toggleSelectTime: state.toggleSelectTime,
      setDose: state.setDose,
      setReminderTime: state.setReminderTime,
      toggleReminder: state.toggleReminder,
      sendTimePicker: state.sendTimePicker,
    }),
    shallow,
  );

  const handleIncreaseDose = (id, value) => {
    setDose(id, Number(value) + 1);
  };

  const handleDecreaseDose = (id, value) => {
    if (Number(value) > 1) setDose(id, Number(value) - 1);
  };

  const handleDoseChange = (id, value) => {
    if (value) setDose(id, value);
  };

  return (
    <Container>
      {times.map(({ value, label, id }) => {
        const selected = selectedTimes.includes(id);

        console.log(value.dose);

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
              <DosageSettingsContainer>
                <DosageInputContainer>
                  <DosageButton
                    activeOpacity={0.6}
                    onPress={() => handleDecreaseDose(id, value.dose)}>
                    <Icon name="minus" size={16} color={Colors.blue[500]} />
                  </DosageButton>
                  <DosageInput
                    underlineColorAndroid="transparent"
                    keyboardType="numeric"
                    value={value.dose.toString()}
                    onChangeText={(dose) => handleDoseChange(id, dose)}
                  />
                  <DosageButton
                    activeOpacity={0.6}
                    onPress={() => handleIncreaseDose(id, value.dose)}>
                    <Icon name="plus" size={16} color={Colors.blue[500]} />
                  </DosageButton>
                </DosageInputContainer>

                <ReminderInputContainer>
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
                  <Opacity
                    onPress={() => {
                      if (value.sendReminder === false) {
                        toggleReminder(id);
                        sendTimePicker(id);
                      } else {
                        sendTimePicker(id);
                      }
                    }}>
                    <Text>{formatTime(value.reminderTime)}</Text>
                  </Opacity>
                  {value.sendTimePicker && value.sendReminder && (
                    <TimePicker
                      testID="dateTimePicker"
                      value={value.reminderTime}
                      mode="time"
                      is24Hour={true}
                      display="default"
                      onChange={(_, selectedTime) => {
                        sendTimePicker(id);
                        setReminderTime(id, selectedTime || value.reminderTime);
                      }}
                    />
                  )}
                </ReminderInputContainer>
              </DosageSettingsContainer>
            )}
          </View>
        );
      })}
    </Container>
  );
};

const DosageButton = styled.TouchableOpacity`
  padding: 12px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${Colors.blue[500]}
  align-items: center;
  justify-content: center;
`;

const DosageInputContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: #fff;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 8px;
  border-width: 0.5px;
  border-color: ${Colors.gray[300]};
`;

const DosageInput = styled.TextInput`
  font-size: 16px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 8px;
  border-bottom-width: 0.5px;
  border-color: ${Colors.gray[300]};
  flex-shrink: 1;
`;

const SelectableItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const ReminderInputContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;

const Text = styled.Text`
  color: ${Colors.gray[900]};
  font-size: 16px;
`;

const DosageSettingsContainer = styled.View`
  padding: 16px;
`;

const Opacity = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 5px;
  background-color: ${Colors.gray[100]};
`;

const TimePicker = styled(DateTimePicker)`
  margin-top: 16px;
`;

const Container = styled.View``;

export default DosageMultiSelect;
