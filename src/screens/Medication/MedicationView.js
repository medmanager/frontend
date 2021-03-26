import React, { useCallback, useLayoutEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import Label from '../../components/Label';
import { useAuth } from '../../store/useAuth';
import useMedication from '../../store/useMedication';
import { Colors } from '../../utils';
import { medicationColors } from '../../utils/colors';
import {
  getDosageTimesString,
  getFrequencyStatusText,
} from '../../utils/medication';

function MedicationScreen({ route, navigation }) {
  const { medId } = route.params;
  const token = useAuth((state) => state.userToken);
  const { data: medication, status } = useMedication(medId, token);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: medication.name,
    });
  }, [navigation, medication, medId]);

  const handleEditPress = useCallback(() => {
    navigation.navigate('EditMedication', { medId });
  }, [navigation, medId]);

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
      <InfoContainer>
        <TitleContainer>
          <ColorBar color={medicationColors[medication.color]} />
          <Title>{medication.name}</Title>
        </TitleContainer>
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
            {medication.notes.length > 0 ? medication.notes : 'Empty'}
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
        <ActionItem activeOpacity={0.7} style={{ borderBottomWidth: 1 }}>
          <SuspendActionItemText>Suspend</SuspendActionItemText>
        </ActionItem>
      </ActionArea>
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
const SuspendActionItemText = styled.Text`
  font-size: 16px;
  text-align: center;
  color: red;
`;

export default MedicationScreen;
