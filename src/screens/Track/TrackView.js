import { useIsFocused } from '@react-navigation/core';
import React from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import styled from 'styled-components/native';
import { useAuth } from '../../store/useAuth';
import useTracking from '../../store/useTracking';
import { defaultNavigatorScreenOptions } from '../../utils';
import MedicationTrackingListItem from './components/MedicationTrackingListItem';
import { useState } from 'react';

function TrackScreen() {
  const token = useAuth((state) => state.userToken);
  const { data: medications, status, refetch, isFetching } = useTracking(token);
  const [refetchData, setRefetchData] = useState(false);
  useIsFocused(); // will cause the screen to re-render when the user navigates to it

  if (status === 'loading') {
    return (
      <SafeArea>
        <Centered>
          <ActivityIndicator />
        </Centered>
      </SafeArea>
    );
  }

  if (status === 'error') {
    return (
      <SafeArea>
        <Text>Something went wrong.</Text>
      </SafeArea>
    );
  }

  const renderTrackingTile = ({ item, index }) => {
    return (
      <MedicationTrackingListItem
        medication={item}
        index={index}
        isLast={index === medications.length - 1}
        isFirst={index === 0}
        refetchData={refetchData}
      />
    );
  };

  if (medications && medications.length === 0) {
    return (
      <SafeArea>
        <Box>
          <Title>Last 30 Days</Title>
          <Text>No tracking data</Text>
        </Box>
      </SafeArea>
    );
  }

  return (
    <SafeArea>
      <Box>
        <Title>Last 30 Days</Title>
      </Box>
      <MedicationTrackingList
        data={medications}
        keyExtractor={(item) => item._id}
        renderItem={renderTrackingTile}
        onRefresh={() => {
          console.log(refetchData);
          refetch();
          setRefetchData(!refetchData);
        }}
        refreshing={isFetching}
        extraData={refetchData}
      />
    </SafeArea>
  );
}

const Centered = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  font-size: 16px;
  margin-top: 8px;
`;

const MedicationTrackingList = styled(FlatList)``;

const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

const Box = styled.View`
  margin-horizontal: 24px;
  margin-vertical: 16px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

const TrackStack = createNativeStackNavigator();

export default () => (
  <TrackStack.Navigator screenOptions={defaultNavigatorScreenOptions}>
    <TrackStack.Screen name="Track" component={TrackScreen} />
  </TrackStack.Navigator>
);
