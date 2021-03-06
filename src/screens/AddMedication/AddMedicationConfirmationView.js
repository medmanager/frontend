import React, { Fragment, useCallback, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components/native';
import Button from '../../components/Button';
import { ColorSelect } from '../../components/ColorSelect';
import Label from '../../components/Label';
import Modal from '../../components/Modal';
import ModalActivityIndicator from '../../components/ModalActivityIndicator';
import { useAuth } from '../../store/useAuth';
import { useMedicationState } from '../../store/useMedicationState';
import { Colors } from '../../utils';
import apiCalls from '../../utils/api-calls';
import {
  getDosageTimesString,
  getFrequencyStatusText,
} from '../../utils/medication';

const AddMedicationConfirmationView = ({ navigation }) => {
  const {
    frequency,
    dosages,
    amount,
    amountUnit,
    name,
    strength,
    strengthUnit,
    condition,
    color,
    reset,
  } = useMedicationState((state) => ({
    dosages: state.selectedDosages.map(
      (id) => state.dosages.find((dosage) => dosage.id === id).value,
    ),
    frequency: state.frequencies.find(
      (frequency) => frequency.id === state.selectedFrequency,
    ).value,
    name: state.name,
    amount: state.amount,
    amountUnit: state.amountUnit,
    strength: state.strength,
    strengthUnit: state.strengthUnit,
    condition: state.condition,
    color: state.color,
    reset: state.reset,
  }));
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const queryClient = useQueryClient();

  const { token } = useAuth((state) => ({
    token: state.userToken,
  }));

  const addMedication = useMutation(
    (medication) => apiCalls.addMedication(medication, token),
    {
      retry: 3, // retry three times if the mutation fails
      onSuccess: async () => {
        // Invalidate all calendar occurrences due to new medication being added
        await queryClient.invalidateQueries('occurrences');
        await queryClient.invalidateQueries('medications');

        // Show success modal
        setShowSuccessModal(true);
      },
      onError: () => {
        // Show error modal
        setShowErrorModal(true);
      },
    },
  );

  const medication = {
    name,
    amount,
    amountUnit,
    strength,
    strengthUnit,
    condition,
    frequency,
    dosages,
    color,
  };

  const dosageTimesString = getDosageTimesString(medication);

  const handleAddAnotherMed = useCallback(() => {
    navigation.navigate('Home');
    navigation.navigate('AddMedicationModal');
    reset();
  }, [navigation, reset]);

  const handleTryAgain = useCallback(() => {
    navigation.navigate('Home');
    navigation.navigate('AddMedicationModal');
  }, [navigation]);

  const handleContinueHome = useCallback(() => {
    navigation.navigate('Home');
    reset();
  }, [navigation, reset]);

  return (
    <Fragment>
      <ModalActivityIndicator
        loadingMessage="Adding medication..."
        show={addMedication.isLoading}
      />
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
            <Label>Condition</Label>
            <Text>
              {medication.condition.length > 0 ? medication.condition : 'None'}
            </Text>
          </Field>
          <Field>
            <Label>Schedule</Label>
            <Text>
              Take {dosageTimesString}{' '}
              {getFrequencyStatusText(medication.frequency)}
            </Text>
          </Field>
          <Field>
            <Label>Color</Label>
            <ColorSelect />
          </Field>
        </InfoContainer>
        <ButtonContainer>
          <Button
            onPress={() => addMedication.mutate(medication)}
            text="Confirm"
          />
        </ButtonContainer>
      </Container>
      <Modal
        title={`${medication.name} added successfuly!`}
        showModal={showSuccessModal}
        showActionBar={false}
        backdropDismiss={false}>
        <IconContainer>
          <Icon name="check-circle" color="#10B981" size={48} />
        </IconContainer>
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
        <IconContainer>
          <Icon name="alert-circle" color="#EF4444" size={48} />
        </IconContainer>
        <ErrorText>
          We are sorry, but there was a problem adding {medication.name} to your
          medications. Please try again later.
        </ErrorText>
        <AddMedButton onPress={handleTryAgain}>
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

const IconContainer = styled.View`
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
