import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Feather';
import { colors, medicationColors} from '../../../utils/colors';

export const MedicationTile = ({ medication, index }) => {
  return (
    <MedicationItem index={index}>
      <HBox>
        <View style={[{backgroundColor: medicationColors[medication.color]}, 
          {width: 15}, {height: 50}, {borderRadius: 15}, {marginRight: 12}]}/>
        <View>
          <MedicationName>{medication.name}</MedicationName>
          <Strength>
            {medication.strength} {medication.strengthUnit}
          </Strength>
        </View>
      </HBox>
      <Icon name="chevron-right" size={18} color={colors.gray[500]} />
    </MedicationItem>
  );
};

const MedicationItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 14px;
  padding-bottom: 14px;
  background-color: #fff;
  border-width: 0.5px;
  border-color: ${colors.gray[300]};
  margin-bottom: 10px;
  margin-horizontal: 10px;
  border-radius: 10px;
  margin-top: ${({index})=> index == 0 ? '10px' : '0px'};
`;

const MedicationName = styled.Text`
  font-size: 16px;
`;

const Strength = styled.Text`
  font-size: 14px;
  margin-top: 4px;
  color: ${colors.gray[500]};
`;

// const Rectangle = styled.View`
//   width: 15px;
//   height: 50px;
//   border-radius: 10px;
//   margin-right: 12px;
//   background-color: red;
// `;

const HBox = styled.View`
  flex-direction: row;
`;