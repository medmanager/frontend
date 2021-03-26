import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import React, { useMemo, useRef, useState } from 'react';
import { FlatList, SectionList } from 'react-native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import styled from 'styled-components/native';
import FloatingAddMedicationButton from '../../components/FloatingAddMedicationButton';
import ProgressBar from '../../components/ProgressBar';
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
  const totalNumMedsToTake = useRef(0);
  const totalNumMedsTaken = useRef(0);
  const sections = useMemo(() => {
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
    totalNumMedsTaken.current = 0;
    totalNumMedsToTake.current = 0;

    for (const dosageOccurrence of occurrences[today]) {
      totalNumMedsToTake.current++;

      if (dosageOccurrence.occurrence.isTaken) {
        totalNumMedsTaken.current++;
      }
      const scheduledTime = dayjs(dosageOccurrence.occurrence.scheduledDate);

      const morningInterval = {
        lower: dayjs(now.current).hour(4).minute(0).valueOf(),
        upper: dayjs(now.current).hour(9).minute(59).valueOf(),
      };
      const afternoonInterval = {
        lower: dayjs(now.current).hour(10).minute(0).valueOf(),
        upper: dayjs(now.current).hour(14).minute(59).valueOf(),
      };
      const eveningInterval = {
        lower: dayjs(now.current).hour(15).minute(0).valueOf(),
        upper: dayjs(now.current).hour(19).minute(59).valueOf(),
      };

      if (
        scheduledTime.isBetween(morningInterval.lower, morningInterval.upper)
      ) {
        sectionsData[0].data.push(dosageOccurrence);
      } else if (
        scheduledTime.isBetween(
          afternoonInterval.lower,
          afternoonInterval.upper,
        )
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

    return sectionsData;
  }, [today, occurrences]);

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
          <Text style={{ marginHorizontal: 16, fontSize: 16 }}>
            No dosages for today.
          </Text>
        </Container>
        <FloatingAddMedicationButton />
      </SafeArea>
    );
  }

  return (
    <SafeArea>
      <Container>
        <Header>{dayjs(now.current).format('dddd, MMMM D, YYYY')}</Header>
        <DailyMedsInfoContainer>
          <DailyMedsInfoHeader>
            <Text>Daily Meds Taken</Text>
            <DailyMedsInfoCounter>
              {totalNumMedsTaken.current} / {totalNumMedsToTake.current}
            </DailyMedsInfoCounter>
          </DailyMedsInfoHeader>
          <ProgressBar
            containerStyle={{ marginTop: 16 }}
            percent={totalNumMedsTaken.current / totalNumMedsToTake.current}
          />
        </DailyMedsInfoContainer>
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, index, section }) => {
            return (
              <DosageOccurrenceListItem
                {...item}
                isLast={
                  section.title === 'Nightime Meds' &&
                  index === sections[3].data.length - 1
                }
              />
            );
          }}
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

const DailyMedsInfoContainer = styled.View`
  margin-horizontal: 16px;
  margin-bottom: 16px;
`;

const DailyMedsInfoCounter = styled.Text`
  font-size: 18px;
  font-weight: 500;
`;

const DailyMedsInfoHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Header = styled.Text`
  font-size: 24px;
  margin-vertical: 24px;
  text-align: center;
  color: ${Colors.blue[500]};
`;

const Container = styled.View`
  flex: 1;
`;

const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

const SectionHeader = styled.Text`
  font-size: 16px;
  color: ${Colors.gray[600]};
  padding-vertical: 8px;
  background-color: #f2f2f2;
  padding-horizontal: 16px;
`;

const Text = styled.Text`
  font-size: 14px;
  color: ${Colors.gray[600]};
`;

const HomeStack = createNativeStackNavigator();

export default () => (
  <HomeStack.Navigator screenOptions={defaultNavigatorScreenOptions}>
    <HomeStack.Screen name="Home" component={HomeScreen} />
  </HomeStack.Navigator>
);
