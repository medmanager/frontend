import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import React, { Fragment, useRef, useState } from 'react';
import { FlatList, SectionList } from 'react-native';
import styled from 'styled-components/native';
import shallow from 'zustand/shallow';
import FloatingAddMedicationButton from '../../components/FloatingAddMedicationButton';
import { useAuth } from '../../store/useAuth';
import useOccurrences from '../../store/useOccurrences';
import { Colors } from '../../utils';
import DosageListItem, {
  DosageListItemPlaceholder,
} from './components/DosageListItem';

dayjs.extend(isBetween);

function HomeScreen() {
  const now = useRef(new Date());
  const [today, setToday] = useState(now.current.getDay());
  const token = useAuth((state) => state.userToken, shallow);
  const {
    data: occurrences,
    isError,
    error,
    isLoading,
    refetch,
    isFetching,
  } = useOccurrences(token);

  // show placeholder dosage items when the list is loading
  if (isLoading) {
    return (
      <SafeArea>
        <Container>
          <Header>{dayjs(now.current).format('dddd, MMMM D, YYYY')}</Header>
          <FlatList
            data={new Array(5)}
            keyExtractor={(_, index) => index.toString()}
            renderItem={() => <DosageListItemPlaceholder />}
          />
        </Container>
      </SafeArea>
    );
  }

  if (occurrences && occurrences[today] && occurrences[today].length === 0) {
    return (
      <SafeArea>
        <Container>
          <Header>{dayjs(now.current).format('dddd, MMMM D, YYYY')}</Header>
          <Text>No dosages for today.</Text>
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

  const sectionsData = [
    {
      title: 'Morning Meds',
      data: [],
    },
    {
      title: 'Afternoon Meds',
      data: [],
    },
    {
      title: 'Evening Meds',
      data: [],
    },
    {
      title: 'Nightime Meds',
      data: [],
    },
  ];
  occurrences[today].forEach((occurrence) => {
    const scheduledTime = dayjs(occurrence.date);
    if (scheduledTime.isBetween('5:00 AM', '9:59 AM')) {
      sectionsData[0].data.push(occurrence);
    } else if (scheduledTime.isBetween('10:00 AM', '2:59 PM')) {
      sectionsData[1].data.push(occurrence);
    } else if (scheduledTime.isBetween('3:00 PM', '7:59 PM')) {
      sectionsData[2].data.push(occurrence);
    } else {
      sectionsData[3].data.push(occurrence);
    }
  });

  console.log(sectionsData);

  return (
    <SafeArea>
      <Container>
        <Header>{dayjs(now.current).format('dddd, MMMM D, YYYY')}</Header>
        <SectionList
          sections={sectionsData}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <DosageListItem {...item} />}
          renderSectionHeader={({ section: { title, data } }) => {
            if (data.length) {
              return <SectionHeader>{title}</SectionHeader>;
            }
          }}
          onRefresh={() => refetch()}
          refreshing={isFetching}
        />
      </Container>
    </SafeArea>
  );
}

const Header = styled.Text`
  font-size: 24px;
  margin-bottom: 24px;
  text-align: center;
  color: ${Colors.blue[500]};
`;

const Container = styled.View`
  flex: 1;
  padding: 24px;
`;

const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

const SectionHeader = styled.Text`
  font-size: 16px;
  color: ${Colors.gray[600]};
`;

const Text = styled.Text`
  font-size: 16px;
`;

export default () => (
  <Fragment>
    <HomeScreen />
    <FloatingAddMedicationButton />
  </Fragment>
);
