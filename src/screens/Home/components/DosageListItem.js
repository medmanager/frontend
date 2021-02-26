import dayjs from 'dayjs';
import React from 'react';
import { Fade, Placeholder, PlaceholderLine } from 'rn-placeholder';
import styled from 'styled-components/native';
import { useAuth } from '../../../store/useAuth';
import useMedication from '../../../store/useMedication';
import { Colors } from '../../../utils';

export const DosageListItemPlaceholder = () => (
  <Container>
    <Placeholder Animation={Fade}>
      <PlaceholderLine width={50} />
      <PlaceholderLine width={30} noMargin />
    </Placeholder>
  </Container>
);

const DosageListItem = ({ date, dosageId, medicationId }) => {
  const token = useAuth((state) => state.userToken);
  const { data: medication, isLoading } = useMedication(medicationId, token);

  if (isLoading) {
    return <DosageListItemPlaceholder />;
  }

  const dosage = medication.dosages.filter(
    (dosage) => dosage._id === dosageId,
  )[0];

  return (
    <Container>
      <Text>
        {dosage.dose}x {medication.name} ({medication.strength}{' '}
        {medication.strengthUnit})
      </Text>
      <DosageTimeText>{dayjs(date).format('h:mm A')}</DosageTimeText>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
  padding-vertical: 24px;
  padding-horizontal: 16px;
  border-color: ${Colors.gray[400]};
  border-width: 1px;
  border-radius: 8px;
  background-color: ${Colors.gray[100]};
`;

const Text = styled.Text`
  font-size: 16px;
  color: ${Colors.gray[900]};
`;

const DosageTimeText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${Colors.gray[900]};
`;

export default DosageListItem;
