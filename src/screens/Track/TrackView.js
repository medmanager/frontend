import React from 'react';
import styled from 'styled-components/native';
import FloatingAddMedicationButton from '../../components/FloatingAddMedicationButton';

function TrackScreen() {
  return (
    <Container>
      <Text>Track Screen</Text>
      <FloatingAddMedicationButton />
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Text = styled.Text``;

export default TrackScreen;
