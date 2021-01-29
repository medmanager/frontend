import DateTimePicker from '@react-native-community/datetimepicker';
import SegmentedControl from '@react-native-community/segmented-control';
import React, { useState } from 'react';
import styled from 'styled-components/native';

const AddMedicationTimeView = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [time, setTime] = useState(new Date());

  const onChange = (event, selectedTime) => {
    const newTime = selectedTime || time;
    setTime(newTime);
  };

  return (
    <SafeArea>
      <Container>
        <Label>Frequency per Day</Label>
        <Control
          values={['Once', 'Twice', 'Custom']}
          selectedIndex={selectedIndex}
          onChange={(event) => {
            setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
          }}
        />
        <Label>Time</Label>
        <DateTimePicker
          testID="dateTimePicker"
          value={time}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      </Container>
    </SafeArea>
  );
};

const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

const Container = styled.View`
  padding: 16px;
`;

const Control = styled(SegmentedControl)`
  margin-top: 10px;
  margin-bottom: 10px;
  height: 50px;
`;

const Label = styled.Text`
  font-size: 14px;
  color: #828282;
`;

export default AddMedicationTimeView;
