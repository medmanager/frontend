import React, { Fragment } from 'react';
import styled from 'styled-components/native';
import FloatingAddMedicationButton from '../../components/FloatingAddMedicationButton';

function TrackScreen() {
  return (
    <Container>
      <Text>Track Screen</Text>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Text = styled.Text``;

export default () => (
  <Fragment>
    <TrackScreen />
    <FloatingAddMedicationButton />
  </Fragment>
);
