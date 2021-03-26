import React from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import styled from 'styled-components/native';
import FloatingAddMedicationButton from '../../components/FloatingAddMedicationButton';
import { useAuth } from '../../store/useAuth';
import useMedications from '../../store/useMedications';
import { defaultNavigatorScreenOptions } from '../../utils';
import MedicationListItem from './components/MedicationListItem';

function MedicationsScreen() {
  const token = useAuth((state) => state.userToken);
  const { data: medications, isFetching, status, refetch } = useMedications(
    token,
  );

  if (status === 'loading') {
    return (
      <SafeArea>
        <Centered>
          <ActivityIndicator />
        </Centered>
      </SafeArea>
    );
  }

  if (medications && medications.length === 0) {
    return (
      <SafeArea>
        <Container>
          <Text>No Medications Found.</Text>
        </Container>
        <FloatingAddMedicationButton />
      </SafeArea>
    );
  }

  const renderMedication = ({ item, index }) => (
    <MedicationListItem
      medication={item}
      index={index}
      isLast={index === medications.length - 1}
      isFirst={index === 0}
    />
  );

  return (
    <SafeArea>
      <MedicationList
        data={medications}
        keyExtractor={(item) => item._id}
        renderItem={renderMedication}
        onRefresh={() => refetch()}
        refreshing={isFetching}
      />
      <FloatingAddMedicationButton />
    </SafeArea>
  );
}

const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

const MedicationList = styled(FlatList)``;

const Container = styled.View`
  padding: 16px;
`;

const Centered = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  font-size: 16px;
`;

const MedicationsStack = createNativeStackNavigator();

export default () => (
  <MedicationsStack.Navigator
    screenOptions={defaultNavigatorScreenOptions}
    initialRouteName="Medications">
    <MedicationsStack.Screen name="Medications" component={MedicationsScreen} />
  </MedicationsStack.Navigator>
);
