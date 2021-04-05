import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import { Platform, Switch, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components';
import shallow from 'zustand/shallow';
import { useMedicationState } from '../store/useMedicationState';
import { Colors, formatTime } from '../utils';

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
  background-color: ${(props) =>
    props.selected ? Colors.blue[500] : 'transparent'}
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`;

const CheckMark = styled(Icon)`
  color: #fff;
`;

const AndroidTimePicker = ({
  value,
  displayTimePicker,
  id,
  toggleDisplayTimePicker,
  setReminderTime,
}) => (
  <AndroidTimePickerContainer>
    <TimePickerButton
      activeOpacity={0.7}
      onPress={() => {
        toggleDisplayTimePicker(id);
      }}>
      <TimePickerButtonText>
        {formatTime(value.reminderTime)}
      </TimePickerButtonText>
    </TimePickerButton>
    {displayTimePicker && (
      <DateTimePicker
        value={value.reminderTime}
        mode="time"
        display="default"
        onChange={(_, selectedTime) => {
          toggleDisplayTimePicker(id);
          setReminderTime(id, selectedTime || value.reminderTime);
        }}
      />
    )}
  </AndroidTimePickerContainer>
);

const iOSTimePicker = ({ value, id, setReminderTime }) => (
  <DateTimePicker
    value={value.reminderTime}
    mode="time"
    is24Hour={true}
    display="default"
    onChange={(_, selectedTime) => {
      setReminderTime(id, selectedTime || value.reminderTime);
    }}
  />
);

const TimePicker = Platform.select({
  android: AndroidTimePicker,
  ios: iOSTimePicker,
});

const DosageMultiSelect = () => {
  const {
    dosages,
    selectedDosages,
    toggleSelectTime,
    setDose,
    setReminderTime,
    toggleReminder,
    toggleDisplayTimePicker,
  } = useMedicationState(
    (state) => ({
      dosages: state.dosages,
      selectedDosages: state.selectedDosages,
      toggleSelectTime: state.toggleSelectTime,
      setDose: state.setDose,
      setReminderTime: state.setReminderTime,
      toggleReminder: state.toggleReminder,
      toggleDisplayTimePicker: state.toggleDisplayTimePicker,
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
      {dosages.map(({ value, label, id, displayTimePicker }) => {
        const selected = selectedDosages.includes(id);

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
                </ReminderInputContainer>
                <TimePickerContainer>
                  {value.sendReminder && (
                    <TimePicker
                      id={id}
                      value={value}
                      setReminderTime={setReminderTime}
                      displayTimePicker={displayTimePicker}
                      toggleDisplayTimePicker={toggleDisplayTimePicker}
                    />
                  )}
                </TimePickerContainer>
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

const TimePickerButtonText = styled.Text`
  color: ${Colors.blue[500]};
  font-size: 16px;
`;

const DosageSettingsContainer = styled.View`
  padding: 16px;
`;

const TimePickerButton = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 5px;
  background-color: ${Colors.gray[200]};
`;

const TimePickerContainer = styled.View`
  margin-top: 16px;
`;

const AndroidTimePickerContainer = styled.View`
  flex-direction: row;
`;

const Container = styled.View``;

export default DosageMultiSelect;
