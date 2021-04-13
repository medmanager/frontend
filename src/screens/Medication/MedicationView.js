import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components/native';
import Label from '../../components/Label';
import Modal from '../../components/Modal';
import ModalActivityIndicator from '../../components/ModalActivityIndicator';
import { useAuth } from '../../store/useAuth';
import useMedication from '../../store/useMedication';
import { Colors } from '../../utils';
import apiCalls from '../../utils/api-calls';
import { medicationColors } from '../../utils/colors';
import {
  getDosageTimesString,
  getFrequencyStatusText,
} from '../../utils/medication';

function MedicationScreen({ route, navigation }) {
  const { medId } = route.params;
  const token = useAuth((state) => state.userToken);
  const { data: medication, status } = useMedication(medId, token);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const queryClient = useQueryClient();

  const stopTaking = useMutation(
    () => apiCalls.deactivateMedication(medId, token),
    {
      retry: 3, // retry three times if the mutation fails
      onSuccess: async () => {
        // Invalidate all calendar occurrences due to new medication being added
        await queryClient.invalidateQueries('occurrences');
        await queryClient.invalidateQueries('medications');
        navigation.navigate('Home');
      },
      onError: () => {
        // Show error modal
        setShowErrorModal(true);
      },
    },
  );

  const resumeTaking = useMutation(
    () => apiCalls.activateMedication(medId, token),
    {
      retry: 3, // retry three times if the mutation fails
      onSuccess: async () => {
        // Invalidate all calendar occurrences due to new medication being added
        await queryClient.invalidateQueries('occurrences');
        await queryClient.invalidateQueries('medications');
        navigation.navigate('Home');
      },
      onError: () => {
        // Show error modal
        setShowErrorModal(true);
      },
    },
  );

  const handleEditPress = useCallback(() => {
    navigation.navigate('EditMedication', { medication, medId });
  }, [navigation, medication, medId]);

  const handleStopTakingPress = useCallback(() => {
    Alert.alert(
      'Stop Taking Your Medication',
      'Are you sure you want to stop taking this medication? Doing so will stop all future medication reminders.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          style: 'destructive',
          onPress: async () => {
            await stopTaking.mutateAsync();
          },
        },
      ],
    );
  }, [stopTaking]);

  const handleResumeTakingPress = useCallback(async () => {
    await resumeTaking.mutateAsync();
  }, [resumeTaking]);

  if (status === 'loading') {
    return (
      <SafeArea>
        <Centered>
          <ActivityIndicator />
        </Centered>
      </SafeArea>
    );
  }

  if (status === 'error') {
    return (
      <SafeArea>
        <Text>Something went wrong.</Text>
      </SafeArea>
    );
  }

  const dosageTimesString = getDosageTimesString(medication);

  return (
    <SafeArea>
      <ModalActivityIndicator
        loadingMessage="Stopping medication..."
        show={stopTaking.isLoading}
      />
      <ModalActivityIndicator
        loadingMessage="Resuming medication..."
        show={resumeTaking.isLoading}
      />
      <InfoContainer>
        <TitleContainer>
          <ColorBar color={medicationColors[medication.color]} />
          <Title>{medication.name}</Title>
        </TitleContainer>
        <Field>
          <Label>Active</Label>
          <Text>{medication.active ? 'Yes' : 'No'}</Text>
        </Field>
        <Field>
          <Label>Strength</Label>
          <Text>{medication.strength + ' ' + medication.strengthUnit}</Text>
        </Field>
        <Field>
          <Label>Amount</Label>
          <Text>
            {medication.amount + ' ' + medication.amountUnit} remaining
          </Text>
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
      </InfoContainer>
      <ActionArea>
        <ActionItem onPress={handleEditPress} activeOpacity={0.7}>
          <ActionItemText>Edit</ActionItemText>
        </ActionItem>
        <ActionItem
          onPress={
            medication.active ? handleStopTakingPress : handleResumeTakingPress
          }
          activeOpacity={0.7}
          style={{ borderBottomWidth: 1 }}>
          <ActionItemText>
            {medication.active ? 'Stop Taking' : 'Resume Taking'}
          </ActionItemText>
        </ActionItem>
      </ActionArea>
      <Modal
        title="Something went wrong"
        showModal={showErrorModal}
        showActionBar={false}
        toggleModal={() => setShowErrorModal(!showErrorModal)}>
        <IconContainer>
          <Icon name="alert-circle" color="#EF4444" size={48} />
        </IconContainer>
        <ErrorText>
          We are sorry, but there was a problem with our systems. Please try
          again later.
        </ErrorText>
      </Modal>
    </SafeArea>
  );
}

const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

const Text = styled.Text`
  font-size: 16px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: 700;
`;

const ColorBar = styled.View`
  height: 40px;
  width: 12px;
  border-radius: 9999px;
  margin-right: 8px;
  background-color: ${(props) => props.color};
`;

const InfoContainer = styled.View`
  padding: 24px;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Field = styled.View`
  margin-top: 16px;
`;

const Centered = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ActionArea = styled.View`
  margin-top: 16px;
`;

const ActionItem = styled.TouchableOpacity`
  background-color: white;
  padding-vertical: 12px;
  border-color: ${Colors.gray[300]};
  border-top-width: 1px;
`;

const ActionItemText = styled.Text`
  font-size: 16px;
  text-align: center;
  color: ${Colors.blue[500]};
`;

const IconContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

const ErrorText = styled.Text`
  font-size: 16px;
  color: ${Colors.gray[700]};
  margin-bottom: 16px;
  padding-left: 8px;
  padding-right: 8px;
`;

export default MedicationScreen;
