import React from 'react';
import RNModal from 'react-native-modal';
import styled from 'styled-components/native';
import { Colors } from '../utils';

const Modal = ({ toggleModal, showModal, title, children }) => {
  const zoomIn = {
    0: {
      opacity: 0,
      scale: 0.8,
    },
    0.5: {
      opacity: 0.75,
      scale: 0.85,
    },
    1: {
      opacity: 1,
      scale: 1,
    },
  };

  const zoomOut = {
    0: {
      opacity: 1,
      scale: 1,
    },
    0.5: {
      opacity: 0.75,
      scale: 0.85,
    },
    1: {
      opacity: 0,
      scale: 0.8,
    },
  };

  return (
    <RNModal
      animationIn={zoomIn}
      animationOut={zoomOut}
      animationInTiming={150}
      animationOutTiming={150}
      backdropOpacity={0.6}
      onBackdropPress={toggleModal}
      isVisible={showModal}>
      <ModalContainer>
        <Centered>
          <Title>{title}</Title>
        </Centered>
        <ModalContent>
          {children}
          <ActionBar>
            <ActionBarItem onPress={toggleModal}>
              <ActionBarItemText>Done</ActionBarItemText>
            </ActionBarItem>
          </ActionBar>
        </ModalContent>
      </ModalContainer>
    </RNModal>
  );
};

const ActionBar = styled.View`
  flex-direction: row;
  flex-grow: 1;
  justify-content: space-around;
  margin-top: 16px;
`;

const ActionBarItem = styled.TouchableOpacity`
  background-color: transparent;
  padding-top: 4px;
  padding-bottom: 4px;
  align-items: center;
`;

const ActionBarItemText = styled.Text`
  color: ${Colors.blue[500]};
`;

const ModalContainer = styled.View`
  background-color: white;
  border-radius: 8px;
  border-color: rgba(0, 0, 0, 0.1);
`;

const ModalContent = styled.View`
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 24px;
  padding-right: 24px;
`;

const Centered = styled.View`
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-weight: 600;
  font-size: 18px;
  margin-top: 16px;
  color: ${Colors.blue[500]};
`;

export default Modal;
