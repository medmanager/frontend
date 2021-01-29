import { useNavigation } from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

const AddMedicationButton = () => {
  const navigator = useNavigation();

  const handleOnPress = () => {
    navigator.navigate('AddMedicationModal');
  };

  return (
    <Button onPress={handleOnPress} activeOpacity={0.8}>
      <Icon name="plus" size={30} color="blue" />
    </Button>
  );
};

const Button = styled.TouchableOpacity`
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.2);
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  margin-top: -16px;
  background-color: #fff;
  border-radius: 100px;
`;

export default AddMedicationButton;
