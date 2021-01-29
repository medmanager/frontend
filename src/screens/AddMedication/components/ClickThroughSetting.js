import { useNavigation } from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

const ClickThroughSetting = ({
  setting,
  navigateTo,
  label,
  icon,
  ...props
}) => {
  const navigator = useNavigation();

  const handleOnPress = () => {
    navigator.navigate(navigateTo);
  };

  return (
    <Container onPress={handleOnPress} activeOpacity={0.6} {...props}>
      <Box>
        <LeftIcon name={icon} size={18} />
        <Setting>{setting}</Setting>
      </Box>
      <Box>
        <Label>{label}</Label>
        <RightIcon name="chevron-right" size={24} />
      </Box>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 24px;
  padding-right: 24px;
  background-color: #f5f5f5;
  border-radius: 10px;
  margin-top: 8px;
`;

const LeftIcon = styled(Icon)`
  margin-right: 8px;
  color: #4f4f4f;
`;

const RightIcon = styled(Icon)`
  margin-left: 8px;
  color: #4f4f4f;
`;

const Box = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Setting = styled.Text`
  color: #4f4f4f;
  font-size: 16px;
`;

const Label = styled.Text`
  color: #4f4f4f;
  font-size: 12px;
`;

export default ClickThroughSetting;
