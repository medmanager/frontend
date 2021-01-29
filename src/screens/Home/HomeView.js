import React from 'react';
import styled from 'styled-components/native';

function HomeScreen() {
  return (
    <Container>
      <Text>Home Screen</Text>
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

export default HomeScreen;
