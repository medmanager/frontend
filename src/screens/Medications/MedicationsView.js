import React from 'react';
import styled from 'styled-components/native';
import FloatingAddMedicationButton from '../../components/FloatingAddMedicationButton';

function MedicationsScreen() {
  return (
    <Container>
      <Text>Medications Screen</Text>
      <FloatingAddMedicationButton />
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Text = styled.Text``;

export default MedicationsScreen;
