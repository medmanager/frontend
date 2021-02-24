import { useNavigation } from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';
import { Colors } from '../utils';
import PillAddIcon from './icons/pill-add';

const FloatingAddMedicationButton = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('AddMedicationModal');
  };
  return (
    <Touchable activeOpacity={0.8} onPress={handlePress}>
      <PillAddIcon color="white" />
    </Touchable>
  );
};

const Touchable = styled.TouchableOpacity`
  position: absolute;
  bottom: 16px;
  right: 16px;
  border-radius: 9999px;
  background-color: ${Colors.blue[500]};
  padding: 16px;
`;

export default FloatingAddMedicationButton;
