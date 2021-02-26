import dayjs from 'dayjs';
import React, { Fragment, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import shallow from 'zustand/shallow';
import FloatingAddMedicationButton from '../../components/FloatingAddMedicationButton';
import { useAuth } from '../../store/useAuth';
import useOccurrences from '../../store/useOccurrences';
import DosageListItem, {
  DosageListItemPlaceholder,
} from './components/DosageListItem';

function HomeScreen() {
  const now = useRef(new Date());
  const [today, setToday] = useState(now.current.getDay() + 1);
  const token = useAuth((state) => state.userToken, shallow);
  const {
    data: occurrences,
    isError,
    error,
    isLoading,
    refetch,
    isFetching,
  } = useOccurrences(token);

  if (occurrences && occurrences.length === 0)
    return (
      <SafeArea>
        <Container>
          <Header>{dayjs(now.current).format('dddd, MMMM D, YYYY')}</Header>
          <Text>No dosages for today.</Text>
        </Container>
      </SafeArea>
    );

  // show placeholder dosage items when the list is loading
  if (isLoading) {
    return (
      <SafeArea>
        <Container>
          <Header>{dayjs(now.current).format('dddd, MMMM D, YYYY')}</Header>
          <DosageList
            data={new Array(5)}
            keyExtractor={(_, index) => index.toString()}
            renderItem={() => <DosageListItemPlaceholder />}
          />
        </Container>
      </SafeArea>
    );
  }

  if (isError) {
    return (
      <SafeArea>
        <Text>Error: {error}</Text>
        <FloatingAddMedicationButton />
      </SafeArea>
    );
  }

  return (
    <SafeArea>
      <Container>
        <Header>{dayjs(now.current).format('dddd, MMMM D, YYYY')}</Header>
        <DosageList
          data={occurrences[today]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <DosageListItem {...item} />}
          onRefresh={() => refetch()}
          refreshing={isFetching}
        />
      </Container>
    </SafeArea>
  );
}

const Header = styled.Text`
  font-size: 24px;
  font-weight: 700;
`;

const Container = styled.View`
  flex: 1;
  padding: 24px;
`;

const DosageList = styled(FlatList)`
  margin-top: 16px;
`;

const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

const Text = styled.Text``;

export default () => (
  <Fragment>
    <HomeScreen />
    <FloatingAddMedicationButton />
  </Fragment>
);
