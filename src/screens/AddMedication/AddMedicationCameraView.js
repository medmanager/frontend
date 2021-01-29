import React from 'react';
import styled from 'styled-components/native';

const AddMedicationCamera = () => {
  return (
    <Container>
      <BlueText>Add medication camera</BlueText>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
`;

const BlueText = styled.Text`
  font-size: 18px;
  color: blue;
  font-weight: 700;
`;

export default AddMedicationCamera;
