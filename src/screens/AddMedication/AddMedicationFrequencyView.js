import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import RadioButtonGroup from '../../components/RadioButtonGroup';

const AddMedicationFrequencyView = () => {
  const [selected, setSelected] = useState('daily');
  const data = [
    {
      label: 'Daily',
      value: 'daily',
    },
    {
      label: 'Every weekday (Mon-Fri)',
      value: 'weekday',
    },
    {
      label: 'Weekly (Thursday)',
      value: 'weekly',
    },
    {
      label: 'Monthly (the 28th day)',
      value: 'monthlyCurrent',
    },
    {
      label: 'Monthly (the 4th Thursday)',
      value: 'monthlyInterval',
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
  border-color: #000;
  background-color: #000;
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
  color: #000;
`;

export default AddMedicationFrequencyView;
