import React from 'react';
import styled from 'styled-components/native';
import Button from '../../components/Button';
import { useAddMedicationSettings } from '../../store/useAddMedicationSettings';
import { Colors, getStatusText, formatTime } from '../../utils';
import apiCalls from '../../utils/api-calls';

const AddMedicationConfirmationView = ({ route, navigation }) => {
  const { times, frequencies } = useAddMedicationSettings((state) => ({
    times: state.times,
    frequencies: state.frequencies,
  }));
  const {
    name,
    amount,
    amountUnit,
    dosage,
    dosageUnit,
    notes,
    selectedFrequency,
    selectedTimes,
  } = route.params;

  let medication;

  const postMedication = async () => {
    const result = await apiCalls.addMedication(medication);
    if (result.error) {
      //do something
    }
    console.log(result);
  }

  function wrapInformation() {
    const wrapTimes = [];
    let i;
    for (i = 0; i < selectedTimes.length; i++) {
      wrapTimes.push({
        medicationAmount: times[selectedTimes[i]].value.medicationAmount,
        sendReminder: times[selectedTimes[i]].value.sendReminder,
        reminderTime: times[selectedTimes[i]].value.reminderTime,
      });
    }
    const medication = {
      name: name,
      amount: amount,
      amountUnit: amountUnit,
      dosage: dosage,
      dosageUnit: dosageUnit,
      notes: notes,
      frequency: frequencies[selectedFrequency].value,
      times: wrapTimes,
    };
    return medication;
  }
  medication = wrapInformation();

  let reminderString = "";
  let reminders = [];
  let reminderVals = "";

  function formatReminderString() {
    let i;
    for (i = 0; i < medication.times.length; i++) {
      if (medication.times[i].sendReminder) {
        reminders.push(times[i]);
        reminderVals += formatTime(medication.times[i].reminderTime);
        if (i < medication.times.length - 1) reminderVals += ", "
      }
    }
    reminderString = " Reminder" + (reminders.length > 1 ? "s " : " ");
    reminderString += "at "
  }

  formatReminderString();
  console.log(medication.frequency);

  return (
    <Container>
      <InfoContainer>
        <Title>{medication.name}</Title>
        <HBox>
          <Label>Dosage:</Label>
          <InputLabel>{medication.dosage + " " + medication.dosageUnit}</InputLabel>
          <Label>Amount:</Label>
          <InputLabel>{medication.amount + " " + medication.amountUnit}</InputLabel>
        </HBox>
        <HBox>
          <Label>{"Take "}</Label>
          <InputLabel> {medication.times.length} </InputLabel>
          <Label>{medication.times.length > 1 ? " times" : " time"}</Label>
          {(medication.frequency.intervalUnits == "days") && 
            <InputLabel>
                {medication.frequency.interval > 1 ? "every " + medication.frequency.interval + " days": "everyday"}
            </InputLabel>
          }
        </HBox>
        {medication.frequency.intervalUnits == "weeks" && 
          <HBox>
            <InputLabel>{getStatusText(medication.frequency)}</InputLabel>
          </HBox>
        }
        {reminders.length > 0 && (
          <HBox>
            <Label>{reminderString}</Label>
            <InputLabel>{reminderVals}</InputLabel>
          </HBox>
        )}
        {medication.notes.length > 0 && (
          <HBox>
            <Label>Notes: </Label>
            <InputLabel>{medication.notes}</InputLabel>
          </HBox>
        )}
      </InfoContainer>
      <ButtonContainer>
        <Button onPress={() => {postMedication()}} text="Confirm" />
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

const InfoContainer = styled.View`
  align-items: center;
  margin-top: 15;
`;

const Title = styled.Text`
  font-size: 24px;
`;

const InputLabel = styled.Text`
  font-size: 18px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${Colors.gray[200]};
  margin-top: 7px;
`;

const Label = styled.Text`
  font-size: 18px;
  padding: 10px;
  border-radius: 10px;
  margin-top: 7px;
`;

const HBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 16px;
`;

export default AddMedicationConfirmationView;
