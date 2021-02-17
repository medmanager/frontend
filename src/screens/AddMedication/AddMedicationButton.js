import { useNavigation } from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import { Colors } from '../../utils';

const AddMedicationButton = () => {
  const navigator = useNavigation();

  const handleOnPress = () => {
    navigator.navigate('AddMedicationModal');
  };

  return (
    <Button onPress={handleOnPress} activeOpacity={0.8}>
      <Icon name="plus" size={30} color={Colors.gray[50]} />
    </Button>
  );
};

const Button = styled.TouchableOpacity`
  background-color: ${Colors.blue[500]}
  align-items: center;
  justify-content: center;
  width: 62px;
  height: 62px;
  margin-top: -16px;
  border-radius: 100px;
`;

export default AddMedicationButton;
