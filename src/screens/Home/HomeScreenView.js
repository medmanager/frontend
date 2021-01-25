import React from 'react';
import styled from 'styled-components/native';
import FloatingActionButton from '../../components/FloatingActionButton';

function HomeScreen() {
  return (
    <RootView>
      <BlueText>Home Screen</BlueText>
      <FloatingActionButton />
    </RootView>
  );
}

const RootView = styled.SafeAreaView`
  flex: 1;
`;

const BlueText = styled.Text`
  font-size: 18px;
  color: blue;
  font-weight: 700;
`;

export default HomeScreen;
