import React from 'react';
import styled from 'styled-components/native';
import Button from '../../components/Button';
import { useAddMedication } from '../../store/useAddMedication';
import { Colors } from '../../utils';

const AddMedicationConfirmationView = ({ route, navigation }) => {
  const { times, frequencies } = useAddMedication((state) => ({
    times: state.times,
    frequencies: state.frequencies,
  }));
  const {
    amount,
    amountUnit,
    dosage,
    dosageUnit,
    notes,
    selectedFrequency,
    selectedTimes,
  } = route.params;

  return (
    <Container>
      <Text>Confirm Medication</Text>
      <ButtonContainer>
        <Button onPress={() => {}} text="Confirm" />
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

const ButtonContainer = styled.View`
  border-top-width: 1px;
  border-top-color: ${Colors.gray[100]}
  width: 100%;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 8px;
  padding-bottom: 8px;
`;

const Text = styled.Text``;

export default AddMedicationConfirmationView;
