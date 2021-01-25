import React from 'react';
import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

const FloatingActionButton = () => {
  return (
    <ActionButton>
      <FeatherIcon name="plus" size={30} color="blue" />
    </ActionButton>
  );
};

const ActionButton = styled.TouchableOpacity`
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.2);
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: #fff;
  border-radius: 100px;
`;

export default FloatingActionButton;
