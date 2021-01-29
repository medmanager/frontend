import React from 'react';
import styled from 'styled-components/native';

function SettingsScreen() {
  return (
    <Container>
      <Text>Profile Screen</Text>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Text = styled.Text`
  font-size: 18px;
  font-weight: 700;
`;

export default SettingsScreen;
