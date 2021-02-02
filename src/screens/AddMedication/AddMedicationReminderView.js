import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import RadioButtonGroup from '../../components/RadioButtonGroup';
import { Colors } from '../../utils';

const AddMedicationReminderView = () => {
  const [selected, setSelected] = useState('onTime');
  const data = [
    {
      label: 'None',
      value: 'none',
    },
    {
      label: 'On time',
      value: 'onTime',
    },
    {
      label: '5 minutes early',
      value: 'fiveMinutesEarly',
    },
    {
      label: '30 minutes early',
      value: 'thirtyMinutesEarly',
    },
    {
      label: '1 hour early',
      value: 'oneHourEarly',
    },
    {
      label: '1 day early',
      value: 'oneDayEarly',
    },
  ];
  return (
    <Container>
      <RadioButtonGroup
        data={data}
        selectedValue={selected}
        onChange={(event) => setSelected(event.nativeEvent.value)}
      />
      <CustomFrequencyButton>
        <OuterCircle>
          <PlusIcon name="plus" size={16} />
        </OuterCircle>
        <Label>Custom</Label>
      </CustomFrequencyButton>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

const OuterCircle = styled.View`
  height: 24px;
  width: 24px;
  border-radius: 12px;
  border-width: 2px;
  border-color: ${Colors.blue[500]};
  background-color: ${Colors.blue[500]};
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`;

const PlusIcon = styled(Icon)`
  color: #fff;
`;

const CustomFrequencyButton = styled.TouchableOpacity`
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
  color: ${Colors.blue[500]};
`;

export default AddMedicationReminderView;
