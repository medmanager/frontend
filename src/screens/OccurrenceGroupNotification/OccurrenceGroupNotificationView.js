import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import React, { Fragment, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { useAuth } from '../../store/useAuth';
import useOccurrenceGroup from '../../store/useOccurrenceGroup';
import { Colors } from '../../utils';
import OccurrenceGroupListItem from './components/OccurrenceGroupListItem';

dayjs.extend(calendar);

const OccurrenceGroupNotificationView = ({ route, params }) => {
  const { occurrenceGroupId } = route.params;
  const token = useAuth((state) => state.userToken);
  const { data: occurrenceGroup, status } = useOccurrenceGroup(
    occurrenceGroupId,
    token,
  );
  const [occurrences, updateOccurrences] = useState(() => {
    if (occurrenceGroup) {
      return occurrenceGroup.occurrences;
    }
    return [];
  });

  const handleTakeDose = (occurrenceId) => {
    console.log('updating occurrences...');
    updateOccurrences(
      occurrences.filter((occurrence) => occurrence._id !== occurrenceId),
    );
  };

  const renderOccurrence = ({ item, index }) => (
    <OccurrenceGroupListItem occurrence={item} onTakeDose={handleTakeDose} />
  );

  useEffect(() => {
    if (occurrenceGroup) {
      updateOccurrences(occurrenceGroup.occurrences);
    }
  }, [occurrenceGroup]);

  if (status === 'loading') {
    return (
      <SafeArea>
        <ActivityIndicator />
      </SafeArea>
    );
  }

  if (status === 'error') {
    return (
      <SafeArea>
        <Text>Error</Text>
      </SafeArea>
    );
  }

  return (
    <SafeArea>
      <Container>
        {occurrences.length === 0 ? (
          <Text>You have taken all of your meds!</Text>
        ) : (
          <Fragment>
            <Text>It's time to dose!</Text>
            <OccurrencesList
              data={occurrences}
              keyExtractor={(item) => item._id}
              renderItem={renderOccurrence}
            />
          </Fragment>
        )}
      </Container>
    </SafeArea>
  );
};

const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  padding: 24px;
`;

const Text = styled.Text`
  font-size: 18px;
  text-align: center;
  margin-top: 8px;
  margin-bottom: 8px;
  color: ${Colors.gray[900]};
`;

const OccurrencesList = styled(FlatList)``;

export default OccurrenceGroupNotificationView;
