import { Picker } from '@react-native-picker/picker';
import React, { Fragment, useMemo } from 'react';
import styled from 'styled-components/native';
import shallow from 'zustand/shallow';
import DayMultiSelect from '../../components/DayMultiSelect';
import Label from '../../components/Label';
import { useAddMedication } from '../../store/useAddMedication';
import { capitalize, Colors, dayChoices, range } from '../../utils';
import {
  getFrequencyStatusText,
  getSelectedDays,
} from '../../utils/medication';

const Item = Picker.Item;

const AddMedicationCustomFrequencyView = ({ route }) => {
  const { id } = route.params;
  const itemStyle = {
    height: 120,
    color: Colors.blue[500],
    borderTopRightRadius: 0,
  };
  const dayIntervalItems = range(31);
  const weekIntervalItems = range(4);

  const {
    customFrequency,
    setCustomFrequencyInterval,
    setCustomFrequencyIntervalUnit,
    toggleCustomFrequencyWeekday,
  } = useAddMedication(
    (state) => ({
      customFrequency: state.frequencies.find(
        (frequency) => frequency.id === id,
      ),
      setCustomFrequencyInterval: state.setCustomFrequencyInterval,
      setCustomFrequencyIntervalUnit: state.setCustomFrequencyintervalUnit,
      toggleCustomFrequencyWeekday: state.toggleCustomFrequencyWeekday,
    }),
    shallow,
  );

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
            {customFrequency.value.intervalUnit === 'days'
              ? dayIntervalItems.map((number) => (
                  <Item key={number} label={number.toString()} value={number} />
                ))
              : weekIntervalItems.map((number) => (
                  <Item key={number} label={number.toString()} value={number} />
                ))}
          </IntervalPicker>
          <IntervalUnitPicker
            selectedValue={customFrequency.value.intervalUnit}
            onValueChange={(value) => setCustomFrequencyIntervalUnit(id, value)}
            itemStyle={itemStyle}>
            <Item
              label={customFrequency.value.interval === 1 ? 'day' : 'days'}
              value="days"
            />
            <Item
              label={customFrequency.value.interval === 1 ? 'week' : 'weeks'}
              value="weeks"
            />
          </IntervalUnitPicker>
        </PickerContainer>
        {customFrequency.value.intervalUnit === 'weeks' && (
          <Fragment>
            <Label>Days</Label>
            <DayMultiSelect
              selectedItems={selectedDays}
              data={dayChoices}
              onToggle={(day) => {
                toggleCustomFrequencyWeekday(id, day);
              }}
            />
          </Fragment>
        )}
        <StatusText>
          {capitalize(getFrequencyStatusText(customFrequency.value))}
        </StatusText>
      </Container>
    </SafeArea>
  );
};

const IntervalPicker = styled(Picker)`
  flex-grow: 1;
`;

const IntervalUnitPicker = styled(Picker)`
  flex-grow: 1;
`;

const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

const Container = styled.View`
  padding: 24px;
`;

const PickerContainer = styled.View`
  flex-direction: row;
  margin-top: 8px;
  margin-bottom: 16px;
`;

const StatusText = styled.Text`
  font-size: 16px;
  color: ${Colors.blue[500]};
  margin-top: 16px;
`;

export default AddMedicationCustomFrequencyView;
