import React, { Fragment, useState } from 'react';
import styled from 'styled-components/native';
import {medicationColors, medicationGreyedColors} from '../../../utils/colors';
import { useAddMedication } from '../../../store/useAddMedication';
import shallow from 'zustand/shallow';

export const ColorSelect = () => {
  const {
    color,
    selectColor,
  } = useAddMedication(
    (state) => ({
      color: state.color,
      selectColor: state.selectColor,
    }),
    shallow,
  );
  
  return (
    <ColorContainer>
      {medicationColors.map((mappedColor, index) => 
        <CircleColor 
          onPress={() => selectColor(index)} 
          key={index} 
          backColor={index == color ? mappedColor : medicationGreyedColors[index]}
          border={index == color}
        />
      )}
    </ColorContainer>
  );
};

const ColorContainer = styled.View`
  flex-direction: row;
`;

const CircleColor = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  border-radius: 30px;
  margin-top: 15px;
  margin-right: 12px;
  background-color: ${({backColor}) => backColor};
  border: ${({border}) => border ? '2px' : '0'};
`;