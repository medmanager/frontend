import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

function SettingsScreen() {
  return (
    <SafeAreaView>
      <BlueText>Settings Screen</BlueText>
    </SafeAreaView>
  );
}

const BlueText = styled.Text`
  font-size: 18px;
  color: blue;
  font-weight: 700;
`;

export default SettingsScreen;
