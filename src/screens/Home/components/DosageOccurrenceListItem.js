import { useNavigation } from '@react-navigation/core';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import React, { Fragment, useCallback, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useMutation, useQueryClient } from 'react-query';
import { Fade, Placeholder, PlaceholderLine } from 'rn-placeholder';
import styled from 'styled-components/native';
import PillIcon from '../../../components/icons/pill';
import Modal from '../../../components/Modal';
import { useAuth } from '../../../store/useAuth';
import useMedication from '../../../store/useMedication';
import { Colors } from '../../../utils';
import apiCalls from '../../../utils/api-calls';

dayjs.extend(calendar);
export const DosageOccurrenceListItemPlaceholder = () => (
  <OccurrenceContainer>
    <Placeholder Animation={Fade}>
      <PlaceholderLine width={50} />
      <PlaceholderLine width={30} noMargin />
    </Placeholder>
  </OccurrenceContainer>
);

const DosageOccurrenceListItem = ({ occurrence, dosageId, medicationId }) => {
  const navigation = useNavigation();
  const occurrenceId = occurrence._id;
  const [showModal, setShowModal] = useState(false);
  const [isTaken, setIsTaken] = useState(occurrence.isTaken);
  const [timeTaken, setTimeTaken] = useState(occurrence.timeTaken);
  const token = useAuth((state) => state.userToken);
  const { data: medication, status } = useMedication(medicationId, token);
  const queryClient = useQueryClient();
  const takeDose = useMutation(
    () => apiCalls.postCalendarOccurrence(occurrenceId, token),
    {
      retry: 3, // retry three times if the mutation fails
      onSuccess: () => {
        // Invalidate all calendar occurrences due to update
        queryClient.invalidateQueries('occurrences');
      },
    },
  );

  const handleDosageItemPressed = useCallback(() => {
    setShowModal(true);
  }, [setShowModal]);

  const toggleModal = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal, setShowModal]);

  const handleTakePressed = useCallback(async () => {
    const now = new Date();
    setIsTaken(true);
    setTimeTaken(now);
    await takeDose.mutateAsync();
  }, [takeDose]);

  const handleInfoPressed = useCallback(() => {
    navigation.navigate('Medication', { medId: medication._id });
    toggleModal();
  }, [medication, navigation, toggleModal]);

  if (status === 'loading') {
    return <DosageOccurrenceListItemPlaceholder />;
  }

  if (status === 'error') {
    return null;
  }

  if (!medication || !medication.dosages) {
    return null;
  }

  const dosage = medication.dosages.filter(
    (dosage) => dosage._id === dosageId,
  )[0];

  return (
    <Fragment>
      <OccurrenceContainer
        isTaken={isTaken}
        onPress={handleDosageItemPressed}
        activeOpacity={0.7}>
        <Text>
          {dosage.dose} {medication.amountUnit} of {medication.name} (
          {medication.strength} {medication.strengthUnit})
        </Text>
        <DosageTimeText>
          {dayjs(occurrence.scheduledDate).format('h:mm A')}
        </DosageTimeText>
      </OccurrenceContainer>
      <Modal
        title={`${medication.name} `}
        showModal={showModal}
        toggleModal={toggleModal}
        showActionBar={false}>
        {isTaken && (
          <TakenStatusText>Taken {dayjs(timeTaken).calendar()}</TakenStatusText>
        )}
        <Row>
          <Icon name="calendar" size={16} color={Colors.gray[500]} />
          <ScheduleText>
            Scheduled for {dayjs(occurrence.scheduledDate).calendar()}
          </ScheduleText>
        </Row>
        <Row>
          <Icon name="info" size={16} color={Colors.gray[500]} />
          <ScheduleText>
            {medication.strength}
            {medication.strengthUnit}, take {dosage.dose}{' '}
            {medication.amountUnit}
          </ScheduleText>
        </Row>
        <ActionArea>
          <ActionItem onPress={handleInfoPressed} activeOpacity={0.7}>
            <CircularIcon>
              <PillIcon color={Colors.blue[500]} />
            </CircularIcon>
            <ActionItemText>Info</ActionItemText>
          </ActionItem>
          <ActionItem
            disabled={takeDose.isLoading || isTaken}
            onPress={handleTakePressed}
            activeOpacity={0.7}>
            <CircularIcon disabled={takeDose.isLoading || isTaken}>
              <Icon name="check" size={24} color={Colors.blue[500]} />
            </CircularIcon>
            <ActionItemText disabled={takeDose.isLoading || isTaken}>
              Take
            </ActionItemText>
          </ActionItem>
        </ActionArea>
      </Modal>
    </Fragment>
  );
};

const OccurrenceContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
  padding-vertical: 24px;
  padding-horizontal: 16px;
  border-color: ${(props) =>
    props.isTaken ? Colors.gray[400] : Colors.gray[200]};
  border-width: 1px;
  border-radius: 8px;
  background-color: ${(props) => (props.isTaken ? Colors.gray[300] : 'white')};
`;

const Text = styled.Text`
  font-size: 16px;
  color: ${Colors.gray[900]};
`;

const ScheduleText = styled.Text`
  font-size: 14px;
  color: ${Colors.gray[500]};
  margin-left: 8px;
`;

const TakenStatusText = styled.Text`
  font-size: 16px;
  color: #10b981;
  text-align: center;
  margin-bottom: 8px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

const DosageTimeText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${Colors.gray[900]};
`;

const ActionArea = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 24px;
`;

const ActionItem = styled.TouchableOpacity``;

const ActionItemText = styled.Text`
  text-align: center;
  margin-top: 8px;
  color: ${Colors.blue[500]};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const CircularIcon = styled.View`
  border-radius: 99999px;
  background-color: ${Colors.gray[100]};
  padding: 10px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

export default DosageOccurrenceListItem;
