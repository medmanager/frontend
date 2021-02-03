import { Picker } from '@react-native-picker/picker';
import React from 'react';
import styled from 'styled-components/native';
import Label from '../../../components/Label';
import { useAddMedicationSettings } from '../../../store/useAddMedicationSettings';
import { Colors } from '../../../utils';

const Item = Picker.Item;

const AmountInput = ({ touched, error, ...props }) => {
  const { amountUnit, setAmountUnit } = useAddMedicationSettings((state) => ({
    amountUnit: state.amountUnit,
    setAmountUnit: state.setAmountUnit,
  }));

  const itemStyle = {
    height: 50,
    color: Colors.blue[500],
  };

  return (
    <Container>
      <Label>Amount</Label>
      <AmountInputContainer>
        <AmountNumericInput
          underlineColorAndroid="transparent"
          keyboardType="numeric"
          {...props}
        />
        <AmountUnitsPicker
          selectedValue={amountUnit}
          itemStyle={itemStyle}
          onValueChange={(value) => setAmountUnit(value)}>
          <Item label="tablets" value="tablets" />
          <Item label="capsules" value="capsules" />
          <Item label="mL" value="mL" />
          <Item label="g" value="g" />
        </AmountUnitsPicker>
      </AmountInputContainer>
      {touched && error && <Error>{error}</Error>}
    </Container>
  );
};

const Container = styled.View`
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
  margin-left: 4px;
  margin-bottom: 20px;
`;

const AmountInputContainer = styled.View`
  flex-direction: row;
`;

const AmountNumericInput = styled.TextInput`
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

const AmountUnitsPicker = styled(Picker)`
  flex-grow: 1;
  min-width: 100px;
`;

const Error = styled.Text`
  color: red;
  font-size: 12px;
  margin-top: 8px;
`;

export default AmountInput;
