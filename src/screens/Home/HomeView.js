import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import React, { useRef, useState } from 'react';
import { FlatList, SectionList } from 'react-native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import styled from 'styled-components/native';
import FloatingAddMedicationButton from '../../components/FloatingAddMedicationButton';
import { useAuth } from '../../store/useAuth';
import useOccurrences from '../../store/useOccurrences';
import { Colors, defaultNavigatorScreenOptions } from '../../utils';
import DosageOccurrenceListItem, {
  DosageOccurrenceListItemPlaceholder,
} from './components/DosageOccurrenceListItem';

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
  for (const dosageOccurrence of occurrences[today]) {
    const scheduledTime = dayjs(dosageOccurrence.occurrence.scheduledDate);

    const morningInterval = {
      lower: dayjs(now.current).hour(5).minute(0).valueOf(),
      upper: dayjs(now.current).hour(10).minute(0).valueOf(),
    };
    const afternoonInterval = {
      lower: dayjs(now.current).hour(10).minute(0).valueOf(),
      upper: dayjs(now.current).hour(15).minute(0).valueOf(),
    };
    const eveningInterval = {
      lower: dayjs(now.current).hour(15).minute(0).valueOf(),
      upper: dayjs(now.current).hour(20).minute(0).valueOf(),
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
  }

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
      <FloatingAddMedicationButton />
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

const HomeStack = createNativeStackNavigator();

export default () => (
  <HomeStack.Navigator screenOptions={defaultNavigatorScreenOptions}>
    <HomeStack.Screen name="Home" component={HomeScreen} />
  </HomeStack.Navigator>
);
