import React from 'react';
import styled from 'styled-components/native';

const AddMedicationCamera = () => {
  return (
    <Container>
      <Text>Add medication camera</Text>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Text = styled.Text`
  font-size: 18px;
  font-weight: 700;
`;

export default AddMedicationCamera;
