import React, { Fragment } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import styled from 'styled-components/native';
import FloatingAddMedicationButton from '../../components/FloatingAddMedicationButton';
import { useAuth } from '../../store/useAuth';
import useMedications from '../../store/useMedications';
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
      </SafeArea>
    );
  }

  const renderMedication = ({ item, index }) => (
    <MedicationListItem medication={item} index={index} />
  );

  console.log({ medications });

  return (
    <SafeArea>
      <MedicationList
        data={medications}
        keyExtractor={(item) => item._id}
        renderItem={renderMedication}
        onRefresh={() => refetch()}
        refreshing={isFetching}
      />
    </SafeArea>
  );
}

const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

const MedicationList = styled(FlatList)`
  padding: 16px;
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

export default () => (
  <Fragment>
    <MedicationsScreen />
    <FloatingAddMedicationButton />
  </Fragment>
);
