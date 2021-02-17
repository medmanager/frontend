import React from 'react';
import { ActivityIndicator, Modal, Text, View } from 'react-native';
import { Colors } from '../utils';

const ModalActivityIndicator = (props) => {
  const {
    show = false,
    color = Colors.blue[500],
    backgroundColor = 'white',
    dimLights = 0.6,
    loadingMessage = 'Loading ...',
  } = props;
  return (
    <Modal transparent={true} animationType="none" visible={show}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: `rgba(0,0,0,${dimLights})`,
        }}>
        <View
          style={{
            paddingVertical: 24,
            paddingHorizontal: 72,
            backgroundColor: `${backgroundColor}`,
            borderRadius: 13,
          }}>
          <ActivityIndicator animating={show} color={color} size="large" />
          <Text style={{ color: `${Colors.gray[900]}`, marginTop: 16 }}>
            {loadingMessage}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default ModalActivityIndicator;
