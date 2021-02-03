import { Picker } from '@react-native-picker/picker';
import React, { useMemo } from 'react';
import styled from 'styled-components/native';
import shallow from 'zustand/shallow';
import Label from '../../components/Label';
import { useAddMedicationSettings } from '../../store/useAddMedicationSettings';
import { Colors, getSelectedDays, getStatusText, range } from '../../utils';
import DayMultiSelect from './components/DayMultiSelect';

const Item = Picker.Item;

const AddMedicationCustomFrequencyView = ({ route }) => {
  const { id } = route.params;
  const itemStyle = {
    height: 50,
    color: Colors.blue[500],
    borderTopRightRadius: 0,
  };
  const dayIntervalItems = range(31);
  const weekIntervalItems = range(4);

  const {
    customFrequency,
    setCustomFrequencyInterval,
    setCustomFrequencyIntervalUnits,
    toggleCustomFrequencyWeekday,
  } = useAddMedicationSettings(
    (state) => ({
      customFrequency: state.frequencies.find(
        (frequency) => frequency.id === id,
      ),
      setCustomFrequencyInterval: state.setCustomFrequencyInterval,
      setCustomFrequencyIntervalUnits: state.setCustomFrequencyIntervalUnits,
      toggleCustomFrequencyWeekday: state.toggleCustomFrequencyWeekday,
    }),
    shallow,
  );

  const dayChoices = [
    {
      value: 'monday',
      label: 'Monday',
    },
    {
      value: 'tuesday',
      label: 'Tuesday',
    },
    {
      value: 'wednesday',
      label: 'Wednesday',
    },
    {
      value: 'thursday',
      label: 'Thursday',
    },
    {
      value: 'friday',
      label: 'Friday',
    },
    {
      value: 'saturday',
      label: 'Saturday',
    },
    {
      value: 'sunday',
      label: 'Sunday',
    },
  ];

  const selectedDays = useMemo(() => getSelectedDays(customFrequency.value), [
    customFrequency.value,
  ]);

  return (
    <SafeArea>
      <Container>
        <Label>Frequency</Label>
        <PickerContainer>
          <IntervalPicker
            selectedValue={customFrequency.value.interval}
            onValueChange={(value) => setCustomFrequencyInterval(id, value)}
            itemStyle={itemStyle}>
            {customFrequency.value.intervalUnits === 'days'
              ? dayIntervalItems.map((number) => (
                  <Item key={number} label={number.toString()} value={number} />
                ))
              : weekIntervalItems.map((number) => (
                  <Item key={number} label={number.toString()} value={number} />
                ))}
          </IntervalPicker>
          <IntervalUnitsPicker
            selectedValue={customFrequency.value.intervalUnits}
            onValueChange={(value) =>
              setCustomFrequencyIntervalUnits(id, value)
            }
            itemStyle={itemStyle}>
            <Item
              label={customFrequency.value.interval === 1 ? 'day' : 'days'}
              value="days"
            />
            <Item
              label={customFrequency.value.interval === 1 ? 'week' : 'weeks'}
              value="weeks"
            />
          </IntervalUnitsPicker>
        </PickerContainer>
        {customFrequency.value.intervalUnits === 'weeks' && (
          <DayMultiSelect
            selectedItems={selectedDays}
            data={dayChoices}
            onToggle={(day) => {
              toggleCustomFrequencyWeekday(id, day);
            }}
          />
        )}
        <StatusText>{getStatusText(customFrequency.value)}</StatusText>
      </Container>
    </SafeArea>
  );
};

const IntervalPicker = styled(Picker)`
  flex-grow: 1;
`;

const IntervalUnitsPicker = styled(Picker)`
  flex-grow: 1;
`;

const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

const Container = styled.View`
  padding: 16px;
`;

const PickerContainer = styled.View`
  flex-direction: row;
  margin-top: 8px;
`;

const StatusText = styled.Text`
  font-size: 16px;
  color: ${Colors.blue[500]};
  margin-top: 16px;
`;

export default AddMedicationCustomFrequencyView;
