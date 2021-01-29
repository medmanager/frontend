import { useNavigation } from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

function BackButton() {
  const navigation = useNavigation();

  return (
    <Button
      onPress={() => {
        navigation.goBack();
      }}>
      <Icon name="arrow-left" size={24} />
    </Button>
  );
}

const Button = styled.TouchableOpacity`
  margin-left: 16px;
`;

export default BackButton;
