import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

function LoadingScreen() {
  return (
    <Container>
      <ActivityIndicator />
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default LoadingScreen;
