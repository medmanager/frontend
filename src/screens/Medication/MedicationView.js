import React, { useLayoutEffect } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import EditIcon from '../../components/icons/edit';
import Label from '../../components/Label';
import { useAuth } from '../../store/useAuth';
import useMedication from '../../store/useMedication';
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
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('EditMedication', { medId })}>
          <EditIcon />
        </TouchableOpacity>
      ),
    });
  }, [navigation, medication, medId]);

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
  flex: 1;
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

export default MedicationScreen;
