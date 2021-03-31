import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import styled from 'styled-components/native';
import { defaultNavigatorScreenOptions } from '../../utils';
import { useAuth } from '../../store/useAuth';
import { FlatList } from 'react-native-gesture-handler';
import MedicationTrackingTile from './components/MedicationTrackingTile';
import api_calls from '../../utils/api-calls';
import LoadingScreen from '../../screens/Loading/LoadingView';

let medications;

function TrackScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const token = useAuth((state) => state.userToken);
  useEffect(() => {
    (async () => {
      setIsLoading(true);

      medications = await api_calls.getTrackingInfo(token);

      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  console.log(medications);

  if (medications != undefined && medications.status === 'error') {
    return (
      <SafeArea>
        <Text>Something went wrong.</Text>
      </SafeArea>
    );
  }

  const renderTrackingTile = ({ item, index }) => (
    <MedicationTrackingTile
      medication={item}
      index={index}
      isLast={index === medications.length - 1}
      isFirst={index === 0}
    />
  );

  return (
    <Container>
      <HBox>
        <Title>Last 30 Days</Title>
      </HBox>
      <MedicationList
        data={medications}
        keyExtractor={(item) => item._id}
        renderItem={renderTrackingTile}
        onRefresh={() => setIsLoading(true)}
        refreshing={isLoading}
      />
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Text = styled.Text``;

const MedicationList = styled(FlatList)``;

const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

const HBox = styled.View`
  flex-direction: row;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  padding-left: 20px;
  padding-top: 20px;
`;

const TrackStack = createNativeStackNavigator();

export default () => (
  <TrackStack.Navigator screenOptions={defaultNavigatorScreenOptions}>
    <TrackStack.Screen name="Track" component={TrackScreen} />
  </TrackStack.Navigator>
);
