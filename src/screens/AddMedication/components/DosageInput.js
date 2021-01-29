import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import styled from 'styled-components/native';

const Item = Picker.Item;

const DosageInput = () => {
  const [medicationDosageUnits, setMedicationDosageUnits] = useState('ml');

  const itemStyle = {
    height: 70,
  };

  return (
    <Container>
      <Label>Dosage</Label>
      <DosageInputContainer>
        <DosageNumericInput
          placeholder="200"
          underlineColorAndroid="transparent"
          keyboardType="numeric"
        />
        <DosageUnitsPicker
          selectedValue={medicationDosageUnits}
          mode="dropdown"
          itemStyle={itemStyle}
          onValueChange={(value) => setMedicationDosageUnits(value)}>
          <Item label="mL" value="ml" />
          <Item label="mg" value="mg" />
          <Item label="mcg" value="mcg" />
          <Item label="g" value="g" />
        </DosageUnitsPicker>
      </DosageInputContainer>
    </Container>
  );
};

const Container = styled.View`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
  margin-right: 16px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const DosageInputContainer = styled.View`
  display: flex;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: black;
`;

const DosageNumericInput = styled.TextInput`
  flex-grow: 1;
  font-size: 18px;
  font-weight: 700;
`;

const DosageUnitsPicker = styled(Picker)`
  width: 100px;
`;

const Label = styled.Text`
  font-size: 14px;
  color: #828282;
`;

export default DosageInput;
