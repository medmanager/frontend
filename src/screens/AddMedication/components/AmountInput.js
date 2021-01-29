import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import styled from 'styled-components/native';

const Item = Picker.Item;

const DosageInput = () => {
  const [medicationAmountUnits, setMedicationAmountUnits] = useState('pills');

  const itemStyle = {
    height: 70,
  };

  return (
    <Container>
      <Label>Amount</Label>
      <AmountInputContainer>
        <AmountNumericInput
          placeholder="100"
          underlineColorAndroid="transparent"
          keyboardType="numeric"
        />
        <AmountUnitsPicker
          selectedValue={medicationAmountUnits}
          mode="dropdown"
          itemStyle={itemStyle}
          onValueChange={(value) => setMedicationAmountUnits(value)}>
          <Item label="pills" value="pills" />
          <Item label="tablets" value="tablets" />
          <Item label="mL" value="mL" />
          <Item label="g" value="g" />
        </AmountUnitsPicker>
      </AmountInputContainer>
    </Container>
  );
};

const Container = styled.View`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
  margin-left: 16px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const AmountInputContainer = styled.View`
  display: flex;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: black;
`;

const AmountNumericInput = styled.TextInput`
  flex-grow: 1;
  font-size: 18px;
  font-weight: 700;
`;

const AmountUnitsPicker = styled(Picker)`
  width: 100px;
`;

const Label = styled.Text`
  font-size: 14px;
  color: #828282;
`;

export default DosageInput;
