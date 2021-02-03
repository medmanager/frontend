import React from 'react';
import styled from 'styled-components/native';
import Button from '../../components/Button';
import { useAddMedicationSettings } from '../../store/useAddMedicationSettings';
import { Colors } from '../../utils';

const AddMedicationConfirmationView = ({ route, navigation }) => {
  const { times, frequencies } = useAddMedicationSettings((state) => ({
    times: state.times,
    frequencies: state.frequencies,
  }));
  const {
    amount,
    amountUnit,
    dosage,
    dosageUnit,
    notes,
    name,
    selectedFrequency,
    selectedTimes,
  } = route.params;

  const freqObject = frequencies.find(frequency => frequency.value.id === selectedFrequency);
  
  //different attempts at trying to get the selectedTimes to work properly
  // const timeObject = times.find(time => time.value.id === selectedTimes[0]);
  // const timeObject = selectedTimes.map(id => times.find(item => item.id === id));
  // const timeFilter = times.filter(time => selectedTimes.includes(time.value.id));
  // ids.map(id => array.find(item => item.id === id))
  // console.log(selectedTimes);

  return (
    <Container>
      <Text>Name: {name}</Text>
      <Text>Dosage: {dosage} {dosageUnit} </Text>
      <Text>Amount: {amount} {amountUnit}</Text>
      <Text>Notes: {notes}</Text>
      <Text>Frequency: {freqObject.label}</Text>
      <Text>Times: </Text>
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

const Text = styled.Text`
  font-size: 18px;
  color: ${Colors.lightGray[600]};
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
`;

export default AddMedicationConfirmationView;
