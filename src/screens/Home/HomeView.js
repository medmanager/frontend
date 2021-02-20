import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { Colors } from '../../utils';
import apiCalls from '../../utils/api-calls';
import {MedicationTile} from './components/MedicationTile'
import {useAuth} from '../../store/useAuth';

function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [medications, setMedications] = useState([]);
  const isFocused = useIsFocused();

  const {token, userId} = useAuth((state) => ({
    token: state.userToken,
    userId: state.userId,
  }));

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await apiCalls.getMedications(token, userId);
        setMedications(response);
      } catch (e) {
        setMedications([]);
      }
      setLoading(false);
    })();
  }, [isFocused]);

  if (loading) {
    return (
      <Container>
        <Centered>
          <ActivityIndicator />
        </Centered>
      </Container>
    );
  }

  if (!medications || medications.length === 0) {
    return (
      <Container>
        <Text>No Medications Found.</Text>
      </Container>
    );
  }

  const renderMedication = ({item, index}) => (
    <MedicationTile key={item._id} medication={item} index={index}></MedicationTile>
  );

  return (
    <Container>
      <FlatList data={medications} keyExtractor={item => item._id} renderItem={renderMedication}/>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.gray[200]};
`;

const Centered = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  font-size: 16px;
`;

export default HomeScreen;
