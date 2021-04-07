import React, { useMemo } from 'react';
import { ActivityIndicator, SectionList } from 'react-native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import styled from 'styled-components/native';
import FloatingAddMedicationButton from '../../components/FloatingAddMedicationButton';
import { useAuth } from '../../store/useAuth';
import useMedications from '../../store/useMedications';
import { Colors, defaultNavigatorScreenOptions } from '../../utils';
import MedicationListItem from './components/MedicationListItem';

function MedicationsScreen() {
  const token = useAuth((state) => state.userToken);
  const { data: medications, isFetching, status, refetch } = useMedications(
    token,
  );

  const sections = useMemo(() => {
    const sectionsData = [
      {
        title: 'Active Meds',
        data: [],
      },
      {
        title: 'Inactive Meds',
        data: [],
      },
    ];

    if (!medications) return [];

    for (const medication of medications) {
      if (medication.active) {
        sectionsData[0].data.push(medication);
      } else {
        sectionsData[1].data.push(medication);
      }
    }

    return sectionsData;
  }, [medications]);

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
        sections={sections}
        keyExtractor={(item) => item._id}
        renderItem={renderMedication}
        renderSectionHeader={({ section: { title, data } }) => {
          if (data.length) {
            return <SectionHeader>{title}</SectionHeader>;
          }
        }}
        onRefresh={() => refetch()}
        refreshing={isFetching}
      />
      <FloatingAddMedicationButton />
    </SafeArea>
  );
}

const SafeArea = styled.SafeAreaView`
  flex: 1;
  margin-top: 16px;
`;

const MedicationList = styled(SectionList)``;

const SectionHeader = styled.Text`
  font-size: 16px;
  color: ${Colors.gray[600]};
  padding-vertical: 10px;
  background-color: #f2f2f2;
  padding-horizontal: 16px;
`;

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
