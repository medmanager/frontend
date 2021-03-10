import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import React, { Fragment, useRef, useState } from 'react';
import { FlatList, SectionList } from 'react-native';
import styled from 'styled-components/native';
import FloatingAddMedicationButton from '../../components/FloatingAddMedicationButton';
import { useAuth } from '../../store/useAuth';
import useOccurrences from '../../store/useOccurrences';
import { Colors } from '../../utils';
import DosageOccurrenceListItem, {
  DosageOccurrenceListItemPlaceholder,
} from './components/DosageListItem';

dayjs.extend(isBetween);

function HomeScreen() {
  const now = useRef(new Date());
  const [today, setToday] = useState(now.current.getDay());
  const token = useAuth((state) => state.userToken);
  const {
    data: occurrences,
    status,
    error,
    refetch,
    isFetching,
  } = useOccurrences(token);

  // show placeholder dosage items when the list is loading
  if (status === 'loading') {
    return (
      <SafeArea>
        <Container>
          <Header>{dayjs(now.current).format('dddd, MMMM D, YYYY')}</Header>
          <FlatList
            data={new Array(5)}
            keyExtractor={(_, index) => index.toString()}
            renderItem={() => <DosageOccurrenceListItemPlaceholder />}
          />
        </Container>
      </SafeArea>
    );
  }

  // TODO: improve error UI
  if (status === 'error') {
    return (
      <SafeArea>
        <Text>Error: {error.message}</Text>
        <FloatingAddMedicationButton />
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
  occurrences[today].forEach((dosageOccurrence) => {
    const scheduledTime = dayjs(dosageOccurrence.occurrence.scheduledDate);
    console.log(scheduledTime.format('h:mm A'));

    const morningInterval = {
      lower: dayjs().minute(0).hour(5).valueOf(),
      upper: dayjs().minute(0).hour(9).minute(59).valueOf(),
    };
    const afternoonInterval = {
      lower: dayjs().minute(0).hour(10).valueOf(),
      upper: dayjs().minute(0).hour(14).minute(59).valueOf(),
    };
    const eveningInterval = {
      lower: dayjs().minute(0).hour(15).valueOf(),
      upper: dayjs().minute(0).hour(19).minute(59).valueOf(),
    };

    if (scheduledTime.isBetween(morningInterval.lower, morningInterval.upper)) {
      sectionsData[0].data.push(dosageOccurrence);
    } else if (
      scheduledTime.isBetween(afternoonInterval.lower, afternoonInterval.upper)
    ) {
      sectionsData[1].data.push(dosageOccurrence);
    } else if (
      scheduledTime.isBetween(eveningInterval.lower, eveningInterval.upper)
    ) {
      sectionsData[2].data.push(dosageOccurrence);
    } else {
      sectionsData[3].data.push(dosageOccurrence);
    }
  });

  return (
    <SafeArea>
      <Container>
        <Header>{dayjs(now.current).format('dddd, MMMM D, YYYY')}</Header>
        <SectionList
          sections={sectionsData}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <DosageOccurrenceListItem {...item} />}
          renderSectionHeader={({ section: { title, data } }, idx) => {
            if (data.length) {
              return <SectionHeader idx={idx}>{title}</SectionHeader>;
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
  margin-top: ${(props) => (props.idx === 0 ? 0 : 16)}px;
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
