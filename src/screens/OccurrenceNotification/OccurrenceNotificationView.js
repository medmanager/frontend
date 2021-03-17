import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components/native';
import PillIcon from '../../components/icons/pill';
import { useAuth } from '../../store/useAuth';
import useOccurrence from '../../store/useOccurrence';
import { Colors } from '../../utils';
import apiCalls from '../../utils/api-calls';

dayjs.extend(calendar);

const OccurrenceNotificationView = ({ navigation, route }) => {
  const { occurrenceId, dosageId, medicationId } = route.params;
  const token = useAuth((state) => state.userToken);
  const results = useOccurrence(occurrenceId, medicationId, token);
  const isLoading = results.some((r) => r.isLoading);
  const isError = results.some((r) => r.isError);
  const occurrence = results[0].data;
  const medication = results[1].data;
  const [isTaken, setIsTaken] = useState(occurrence?.isTaken || false);
  const [timeTaken, setTimeTaken] = useState(occurrence?.timeTaken || null);
  const queryClient = useQueryClient();
  const takeDose = useMutation(
    (dosageOccurrence) =>
      apiCalls.postCalendarOccurrence(dosageOccurrence, token),
    {
      retry: 3, // retry three times if the mutation fails
      onSuccess: () => {
        // Invalidate all calendar occurrences due to update
        queryClient.invalidateQueries('calendarOccurrences');
      },
    },
  );

  if (isLoading) {
    return (
      <SafeArea>
        <ActivityIndicator />
      </SafeArea>
    );
  }

  const handleTakePressed = () => {
    const now = new Date();
    setIsTaken(true);
    setTimeTaken(now);
    const newOccurrence = {
      ...occurrence,
      isTaken: true,
      timeTaken: now,
    };
    takeDose.mutate(newOccurrence);
  };

  const handleInfoPressed = () => {
    navigation.navigate('Home', {
      screen: 'Medications',
      params: { screen: 'Medication', params: { medId: medication._id } },
    });
  };

  const dosage = medication.dosages.filter(
    (dosage) => dosage._id === dosageId,
  )[0];

  return (
    <SafeArea>
      <Container>
        <Text>It's time to dose!</Text>
        <DoseContainer activeOpacity={0.7}>
          <DoseInfoContainer>
            <MedInfo>
              <MedName>{medication.name}</MedName>
              <DosageInfo>
                {medication.strength} {medication.strengthUnit} (Take{' '}
                {dosage.dose} {medication.amountUnit})
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
              <ActionItemText disabled={takeDose.isLoading}>
                Take
              </ActionItemText>
            </ActionItem>
          </ActionArea>
        </DoseContainer>
      </Container>
    </SafeArea>
  );
};

const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  padding: 24px;
`;

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

const Text = styled.Text`
  font-size: 18px;
  text-align: center;
  margin-top: 8px;
  margin-bottom: 8px;
  color: ${Colors.gray[900]};
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

export default OccurrenceNotificationView;
