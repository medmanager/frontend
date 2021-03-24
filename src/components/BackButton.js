import React from 'react';
import { TouchableOpacity } from 'react-native';
import BackIcon from './icons/back';

const BackButton = ({ onPress, ...props }) => {
  return (
    <TouchableOpacity onPress={onPress} {...props}>
      <BackIcon />
    </TouchableOpacity>
  );
};

export default BackButton;
