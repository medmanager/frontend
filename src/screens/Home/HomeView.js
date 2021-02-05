import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import { Colors } from '../../utils';
import apiCalls from '../../utils/api-calls';

function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [medications, setMedications] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const results = await apiCalls.getMedications();
        setMedications(results);
      } catch (e) {}
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

  if (!medications || medications === undefined || medications.length === 0) {
    return (
      <Container>
        <Text>No Medications Found.</Text>
      </Container>
    );
  }

  return (
    <Container>
      {medications.map((medication) => (
        <MedicationItem key={medication._id}>
          <View>
            <MedicationName>{medication.name}</MedicationName>
            <Strength>
              {medication.strength} {medication.strengthUnit}
            </Strength>
          </View>
          <Icon name="chevron-right" size={18} color={Colors.gray[500]} />
        </MedicationItem>
      ))}
    </Container>
  );
}

const MedicationItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 14px;
  padding-bottom: 14px;
  background-color: #fff;
  border-width: 0.5px;
  border-color: ${Colors.gray[300]};
`;

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Centered = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  font-size: 16px;
`;

const MedicationName = styled.Text`
  font-size: 16px;
`;

const Strength = styled.Text`
  font-size: 14px;
  margin-top: 4px;
  color: ${Colors.gray[500]};
`;

export default HomeScreen;
