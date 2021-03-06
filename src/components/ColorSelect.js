import React from 'react';
import styled from 'styled-components/native';
import shallow from 'zustand/shallow';
import { useMedicationState } from '../store/useMedicationState';
import { medicationColors, medicationGreyedColors } from '../utils/colors';

export const ColorSelect = () => {
  const { color, selectColor } = useMedicationState(
    (state) => ({
      color: state.color,
      selectColor: state.selectColor,
    }),
    shallow,
  );

  return (
    <ColorContainer>
      {medicationColors.map((mappedColor, index) => (
        <CircleColor
          onPress={() => selectColor(index)}
          key={index}
          backColor={
            index == color ? mappedColor : medicationGreyedColors[index]
          }
          border={index == color}
        />
      ))}
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
  margin-right: 12px;
  background-color: ${({ backColor }) => backColor};
  border: ${({ border }) => (border ? '2px' : '0')};
`;
