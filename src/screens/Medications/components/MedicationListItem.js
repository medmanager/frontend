import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components';
import { colors, medicationColors } from '../../../utils/colors';

const MedicationListItem = ({ medication, isLast, isFirst }) => {
  const navigation = useNavigation();

  const handleMedicationItemPress = () => {
    navigation.navigate('Medication', { medId: medication._id });
  };

  return (
    <MedicationItem
      isLast={isLast}
      isFirst={isFirst}
      activeOpacity={0.7}
      onPress={handleMedicationItemPress}>
      <HBox>
        <View
          style={[
            { backgroundColor: medicationColors[medication.color] },
            { width: 15 },
            { height: 50 },
            { borderRadius: 15 },
            { marginRight: 12 },
          ]}
        />
        <MedicationInfo>
          <MedicationName>{medication.name}</MedicationName>
          <MedicationStrength>
            {medication.strength} {medication.strengthUnit}
          </MedicationStrength>
        </MedicationInfo>
      </HBox>
      <Icon name="chevron-right" size={18} color={colors.gray[500]} />
    </MedicationItem>
  );
};

const MedicationItem = styled.TouchableOpacity`
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
  border-radius: 10px;
  margin-horizontal: 16px;
  margin-bottom: ${(props) => (props.isLast ? 16 : 4)}px;
  margin-top: ${(props) => (props.isFirst ? 16 : 4)}px;
`;

const MedicationName = styled.Text`
  font-size: 16px;
`;

const MedicationInfo = styled.View`
  flex-direction: column;
  justify-content: center;
`;

const MedicationStrength = styled.Text`
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

export default MedicationListItem;
