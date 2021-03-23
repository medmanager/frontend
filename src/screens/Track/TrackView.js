import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import styled from 'styled-components/native';
import { defaultNavigatorScreenOptions } from '../../utils';

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

const TrackStack = createNativeStackNavigator();

export default () => (
  <TrackStack.Navigator screenOptions={defaultNavigatorScreenOptions}>
    <TrackStack.Screen name="Track" component={TrackScreen} />
  </TrackStack.Navigator>
);
