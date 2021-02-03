import { Picker } from '@react-native-picker/picker';
import React from 'react';
import styled from 'styled-components/native';
import Error from '../../../components/Error';
import Label from '../../../components/Label';
import { useAddMedicationSettings } from '../../../store/useAddMedicationSettings';
import { Colors } from '../../../utils';

const Item = Picker.Item;

const DosageInput = ({ touched, error, ...props }) => {
  const { dosageUnit, setDosageUnit } = useAddMedicationSettings((state) => ({
    dosageUnit: state.dosageUnit,
    setDosageUnit: state.setDosageUnit,
  }));

  const itemStyle = {
    height: 50,
    color: Colors.blue[500],
  };

  return (
    <Container>
      <Label>Dosage</Label>
      <DosageInputContainer>
        <DosageNumericInput
          underlineColorAndroid="transparent"
          keyboardType="numeric"
          {...props}
        />
        <DosageUnitsPicker
          selectedValue={dosageUnit}
          itemStyle={itemStyle}
          onValueChange={(value) => setDosageUnit(value)}>
          <Item label="mg" value="mg" />
          <Item label="grams" value="grams" />
          <Item label="mcg" value="mcg" />
          <Item label="mL" value="ml" />
        </DosageUnitsPicker>
      </DosageInputContainer>
      {touched && error && <Error>{error}</Error>}
    </Container>
  );
};

const Container = styled.View`
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
  margin-right: 4px;
  margin-bottom: 20px;
`;

const DosageInputContainer = styled.View`
  flex-direction: row;
`;

const DosageNumericInput = styled.TextInput`
  width: 48%;
  font-size: 16px;
  color: black;
  margin-top: auto;
  margin-bottom: auto;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 8px;
  background-color: ${Colors.gray[100]};
`;

const DosageUnitsPicker = styled(Picker)`
  flex-grow: 1;
  min-width: 50px;
`;

export default DosageInput;
