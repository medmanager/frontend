import React, { Fragment, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import Button from '../../components/Button';
import Label from '../../components/Label';
import Modal from '../../components/Modal';
import { queryClient } from '../../store';
import { useAddMedication } from '../../store/useAddMedication';
import { useAuth } from '../../store/useAuth';
import { Colors, formatTime, getStatusText } from '../../utils';
import apiCalls from '../../utils/api-calls';
import { ColorSelect } from './components/ColorSelect';

const AddMedicationConfirmationView = ({ navigation }) => {
  const {
    frequency,
    dosages,
    amount,
    amountUnit,
    name,
    strength,
    strengthUnit,
    notes,
    color,
    reset,
  } = useAddMedication((state) => ({
    dosages: state.selectedDosages.map(
      (id) => state.dosages.find((dosage) => dosage.id === id).value,
    ),
    frequency: state.frequencies.find(
      (frequency) => frequency.id === state.selectedFrequency,
    ).value,
    name: state.formValues.name,
    amount: state.formValues.amount,
    amountUnit: state.amountUnit,
    strength: state.formValues.strength,
    strengthUnit: state.strengthUnit,
    notes: state.formValues.notes,
    color: state.color,
    reset: state.reset,
  }));
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const { token } = useAuth((state) => ({
    token: state.userToken,
  }));

  const addMedication = async (medication, token) => {
    try {
      const response = await apiCalls.addMedication(medication, token);
      if (response.error) {
        setShowErrorModal(true);
      } else {
        setShowSuccessModal(true);
        queryClient.invalidateQueries('medications');
        queryClient.invalidateQueries('calendarOccurrences');
      }
    } catch (e) {
      setShowErrorModal(true);
    }
  };

  const medication = {
    name,
    amount,
    amountUnit,
    strength,
    strengthUnit,
    notes,
    frequency,
    dosages,
    color,
  };

  const dosageTimesString = medication.dosages
    .sort((a, b) => a.reminderTime - b.reminderTime)
    .map(
      (dosage) =>
        `${dosage.dose} ${amountUnit} at ${formatTime(dosage.reminderTime)}`,
    )
    .join(', ');

  const handleAddAnotherMed = () => {
    navigation.navigate('Home');
    navigation.navigate('AddMedicationModal');
    reset();
  };

  const handleContinueHome = () => {
    navigation.navigate('Home');
    reset();
  };

  return (
    <Fragment>
      <Container>
        <InfoContainer>
          <Title>{medication.name}</Title>
          <Field>
            <Label>Strength</Label>
            <Text>{medication.strength + ' ' + medication.strengthUnit}</Text>
          </Field>
          <Field>
            <Label>Amount</Label>
            <Text>{medication.amount + ' ' + medication.amountUnit}</Text>
          </Field>
          <Field>
            <Label>Notes</Label>
            <Text>
              {medication.notes.length > 0 ? medication.notes : 'Empty'}
            </Text>
          </Field>
          <Field>
            <Label>Schedule</Label>
            <Text>
              Take {dosageTimesString} {getStatusText(medication.frequency)}
            </Text>
          </Field>
          <ColorSelect />
        </InfoContainer>
        <ButtonContainer>
          <Button
            onPress={() => addMedication(medication, token)}
            text="Confirm"
          />
        </ButtonContainer>
      </Container>
      <Modal
        title={`${medication.name} added successfuly!`}
        showModal={showSuccessModal}
        showActionBar={false}
        backdropDismiss={false}>
        <SuccessIconContainer>
          <Icon name="check-circle" color="#10B981" size={48} />
        </SuccessIconContainer>
        <AddMedButton onPress={handleAddAnotherMed}>
          <AddMedButtonText>Add Another Med</AddMedButtonText>
        </AddMedButton>
        <ContinueButton onPress={handleContinueHome}>
          <ContinueButtonText>Continue to Home Screen</ContinueButtonText>
        </ContinueButton>
      </Modal>
      <Modal
        title={`${medication.name} could not be added`}
        showModal={showErrorModal}
        showActionBar={false}
        backdropDismiss={false}>
        <SuccessIconContainer>
          <Icon name="alert-circle" color="#EF4444" size={48} />
        </SuccessIconContainer>
        <ErrorText>
          We are sorry, but there was a problem adding {medication.name} to your
          medications. Please try again later.
        </ErrorText>
        <AddMedButton onPress={handleAddAnotherMed}>
          <AddMedButtonText>Try again</AddMedButtonText>
        </AddMedButton>
        <ContinueButton onPress={handleContinueHome}>
          <ContinueButtonText>Continue to Home Screen</ContinueButtonText>
        </ContinueButton>
      </Modal>
    </Fragment>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
`;

const ErrorText = styled.Text`
  font-size: 16px;
  color: ${Colors.gray[700]};
  margin-bottom: 16px;
  padding-left: 8px;
  padding-right: 8px;
`;

const AddMedButton = styled.TouchableOpacity`
  background-color: ${Colors.blue[500]};
  margin-left: 16px;
  margin-right: 16px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 16px;
  padding-right: 16px;
  align-items: center;
  border-radius: 8px;
`;

const AddMedButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

const ContinueButton = styled.TouchableOpacity`
  margin-top: 8px;
  background-color: transparent;
  margin-left: 16px;
  margin-right: 16px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 16px;
  padding-right: 16px;
  align-items: center;
`;

const ContinueButtonText = styled.Text`
  color: ${Colors.blue[500]};
  font-size: 16px;
`;

const SuccessIconContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

const Text = styled.Text`
  font-size: 16px;
`;

const Field = styled.View`
  margin-top: 16px;
`;

const ButtonContainer = styled.View`
  border-top-width: 1px;
  border-top-color: ${Colors.gray[300]};
  width: 100%;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 8px;
  padding-bottom: 8px;
`;

const InfoContainer = styled.View`
  flex: 1;
  padding: 24px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: 700;
`;

export default AddMedicationConfirmationView;
