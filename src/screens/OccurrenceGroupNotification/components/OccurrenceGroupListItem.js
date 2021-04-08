import { useNavigation } from '@react-navigation/core';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import PillIcon from '../../../components/icons/pill';
import { useAuth } from '../../../store/useAuth';
import { Colors } from '../../../utils';
import apiCalls from '../../../utils/api-calls';

dayjs.extend(calendar);

const OccurrenceListItem = ({ occurrence, onTakeDose }) => {
  const dosage = occurrence.dosage;
  const medication = dosage.medication;
  const navigation = useNavigation();
  const token = useAuth((state) => state.userToken);
  const queryClient = useQueryClient();
  const takeDose = useMutation(
    () => apiCalls.takeCalendarOccurrence(occurrence._id, token),
    {
      onSuccess: async () => {
        // take dose callback from the view
        onTakeDose(occurrence._id);

        // Invalidate all calendar occurrences due to update
        await queryClient.invalidateQueries('occurrences');
      },
    },
  );

  const handleTakePressed = useCallback(() => {
    takeDose.mutate();
  }, [takeDose]);

  const handleInfoPressed = () => {
    navigation.navigate('Medication', { medId: medication._id });
  };

  return (
    <DoseContainer>
      <DoseInfoContainer>
        <MedInfo>
          <MedName>{medication.name}</MedName>
          <DosageInfo>
            {medication.strength} {medication.strengthUnit} (Take {dosage.dose}{' '}
            {medication.amountUnit})
          </DosageInfo>
        </MedInfo>
        <DosageTimeText>
          {dayjs(occurrence.scheduledDate).format('h:mm A')}
        </DosageTimeText>
      </DoseInfoContainer>
      <ActionArea>
        <ActionItem onPress={handleInfoPressed} activeOpacity={0.7}>
          <PillIcon color={Colors.blue[500]} />
          <ActionItemText>Info</ActionItemText>
        </ActionItem>
        <ActionItem
          disabled={takeDose.isLoading}
          onPress={handleTakePressed}
          activeOpacity={0.7}>
          <Icon name="check" size={24} color={Colors.blue[500]} />
          <ActionItemText disabled={takeDose.isLoading}>Take</ActionItemText>
        </ActionItem>
      </ActionArea>
    </DoseContainer>
  );
};

const DoseContainer = styled.View`
  margin-top: 8px;
  padding: 24px;
  border-color: ${Colors.gray[200]};
  border-width: 1px;
  border-radius: 8px;
  background-color: ${(props) => (props.isTaken ? Colors.gray[300] : 'white')};
`;

const DoseInfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MedInfo = styled.View`
  flex-direction: column;
`;

const MedName = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${Colors.gray[900]};
`;

const DosageInfo = styled.Text`
  margin-top: 4px;
  font-size: 16px;
  color: ${Colors.gray[500]};
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

const ActionItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: rgba(47, 128, 237, 0.2);
  border-radius: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 10px;
  padding-right: 10px;
`;

const ActionItemText = styled.Text`
  text-align: center;
  color: ${Colors.blue[500]};
  margin-left: 8px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

export default OccurrenceListItem;
