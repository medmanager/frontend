import { useNavigation } from '@react-navigation/core';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Animated } from 'react-native';
import { useState } from 'react';
import { colors, trackingColors } from '../../../utils/colors';

const MedicationTrackingListItem = ({
  medication,
  isLast,
  isFirst,
  refetchData,
}) => {
  const navigation = useNavigation();
  const [animationValue] = useState(new Animated.Value(0));

  useEffect(() => {
    animationValue.setValue(0);
    Animated.timing(animationValue, {
      toValue: medication.compliance * 379,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, [refetchData]);

  const handleMedicationItemPress = () => {
    navigation.navigate('Medication', { medId: medication.medicationId });
  };

  let complianceColor;
  if (medication.compliance >= 0.8) {
    complianceColor = trackingColors[0];
  } else if (medication.compliance >= 0.5) {
    complianceColor = trackingColors[1];
  } else {
    complianceColor = trackingColors[2];
  }

  const animatedStyle = {
    width: animationValue,
  };

  return (
    <MedicationItem
      isLast={isLast}
      isFirst={isFirst}
      activeOpacity={0.7}
      onPress={handleMedicationItemPress}>
      <Animated.View
        style={[
          { backgroundColor: complianceColor },
          { width: medication.compliance * 100 },
          { height: '100%' },
          { borderRadius: 10 },
          { paddingLeft: 10 },
          { position: 'absolute' },
          animatedStyle,
        ]}
      />
      <HBox>
        <MedicationInfo>
          <MedicationName>{medication.name}</MedicationName>
        </MedicationInfo>
      </HBox>
      <ComplianceValue>{medication.compliance * 100}%</ComplianceValue>
    </MedicationItem>
  );
};

const MedicationItem = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
  padding-top: 14px;
  padding-bottom: 14px;
  padding-left: 16px;
`;

const MedicationInfo = styled.View`
  flex-direction: column;
  justify-content: center;
`;

const HBox = styled.View`
  flex-direction: row;
`;

const ComplianceValue = styled.Text`
  font-size: 16px;
  padding-right: 16px;
`;

export default MedicationTrackingListItem;
