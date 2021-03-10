import { useNavigation } from '@react-navigation/core';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import React, { Fragment, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { Fade, Placeholder, PlaceholderLine } from 'rn-placeholder';
import styled from 'styled-components/native';
import PillIcon from '../../../components/icons/pill';
import Modal from '../../../components/Modal';
import { useAuth } from '../../../store/useAuth';
import useMedication from '../../../store/useMedication';
import { Colors } from '../../../utils';

dayjs.extend(calendar);
export const DosageOccurrenceListItemPlaceholder = () => (
  <Container>
    <Placeholder Animation={Fade}>
      <PlaceholderLine width={50} />
      <PlaceholderLine width={30} noMargin />
    </Placeholder>
  </Container>
);

const DosageOccurrenceListItem = ({ occurrence, dosageId, medicationId }) => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const token = useAuth((state) => state.userToken);
  const { data: medication, status } = useMedication(medicationId, token);

  if (status === 'loading') {
    return <DosageOccurrenceListItemPlaceholder />;
  }

  if (status === 'error') {
    return null;
  }

  if (!medication || !medication.dosages) {
    return null;
  }

  const handleDosageItemPressed = () => {
    setShowModal(true);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleTakePressed = () => {};

  const handleInfoPressed = () => {
    navigation.navigate('Medication', { medId: medication._id });
    toggleModal();
  };

  const dosage = medication.dosages.filter(
    (dosage) => dosage._id === dosageId,
  )[0];

  return (
    <Fragment>
      <Container onPress={handleDosageItemPressed} activeOpacity={0.7}>
        <Text>
          {dosage.dose} {medication.amountUnit} of {medication.name} (
          {medication.strength} {medication.strengthUnit})
        </Text>
        <DosageTimeText>
          {dayjs(occurrence.scheduledDate).format('h:mm A')}
        </DosageTimeText>
      </Container>
      <Modal
        title={`${medication.name} `}
        showModal={showModal}
        toggleModal={toggleModal}
        showActionBar={false}>
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
          <ActionItem onPress={handleTakePressed} activeOpacity={0.7}>
            <CircularIcon>
              <Icon name="check" size={24} color={Colors.blue[500]} />
            </CircularIcon>
            <ActionItemText>Take</ActionItemText>
          </ActionItem>
        </ActionArea>
      </Modal>
    </Fragment>
  );
};

const Container = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
  padding-vertical: 24px;
  padding-horizontal: 16px;
  border-color: ${Colors.gray[200]};
  border-width: 1px;
  border-radius: 8px;
  background-color: white;
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
`;

const CircularIcon = styled.View`
  border-radius: 99999px;
  background-color: ${Colors.gray[100]};
  padding: 10px;
`;

export default DosageOccurrenceListItem;
