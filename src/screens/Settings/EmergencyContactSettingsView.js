import { useFormik } from 'formik';
import React, { useCallback, useEffect } from 'react';
import { Switch } from 'react-native';
import { useQueryClient } from 'react-query';
import styled from 'styled-components/native';
import * as yup from 'yup';
import shallow from 'zustand/shallow';
import Input from '../../components/Input';
import { useAuth } from '../../store/useAuth';
import useSettings from '../../store/useSettings';
import { Colors } from '../../utils';

const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const EmergencyContactSettingsScreen = ({ navigation }) => {
  const token = useAuth((state) => state.userToken);
  const {
    emergencyContactName,
    emergencyContactPhoneNumber,
    enableEmergencyContact,
    toggleEmergencyContact,
    setEmergencyContactName,
    setEmergencyContactPhoneNumber,
    commit,
  } = useSettings(
    (state) => ({
      emergencyContactName: state.emergencyContact.name,
      emergencyContactPhoneNumber: state.emergencyContact.phoneNumber,
      enableEmergencyContact: state.hasEmergencyContact,
      toggleEmergencyContact: state.toggleEmergencyContact,
      setEmergencyContactName: state.setEmergencyContactName,
      setEmergencyContactPhoneNumber: state.setEmergencyContactPhoneNumber,
      commit: state.commit,
    }),
    shallow,
  );
  const queryClient = useQueryClient();
  const { values, touched, errors, handleChange, handleBlur } = useFormik({
    initialValues: {
      name: emergencyContactName,
      phoneNumber: emergencyContactPhoneNumber,
    },
    validationSchema: yup.object().shape({
      name: yup.string().max(100, 'Name must not be more than 100 characters'),
      phoneNumber: yup
        .string()
        .matches(phoneRegExp, 'Phone number is not valid'),
    }),
    onSubmit: () => {},
  });

  const handleToggleEmergencyContact = useCallback(() => {
    toggleEmergencyContact();
  }, [toggleEmergencyContact]);

  useEffect(() => {
    // add a listener so that when the user navigates away from this screen, commit the changes to the settings
    const unsubscribe = navigation.addListener('beforeRemove', async () => {
      setEmergencyContactName(values.name);
      setEmergencyContactPhoneNumber(values.phoneNumber);
      await commit(token); // commit settings changes
      queryClient.invalidateQueries('currentUser');
    });

    return unsubscribe;
  }, [
    navigation,
    commit,
    token,
    values,
    setEmergencyContactName,
    setEmergencyContactPhoneNumber,
    queryClient,
  ]);

  return (
    <SafeArea>
      <SettingsContainer>
        <SettingListItem style={{ borderBottomWidth: 1 }}>
          <SettingInfoContainer>
            <SettingItemText>Emergency Contact</SettingItemText>
            <SettingItemDescriptionText>
              Enable the ability to alert an emergency contact.
            </SettingItemDescriptionText>
          </SettingInfoContainer>
          <Switch
            onValueChange={handleToggleEmergencyContact}
            value={enableEmergencyContact}
            trackColor={{
              false: Colors.gray[300],
              true: Colors.blue[500],
            }}
            thumbColor="#fff"
          />
        </SettingListItem>
      </SettingsContainer>
      {enableEmergencyContact && (
        <InputContainer>
          <Input
            name="name"
            label="Emergency Contact Name"
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
            touched={touched}
            error={errors.name}
          />
          <Input
            name="phoneNumber"
            label="Phone Number"
            onChangeText={handleChange('phoneNumber')}
            onBlur={handleBlur('phoneNumber')}
            value={values.phoneNumber}
            touched={touched}
            error={errors.phoneNumber}
          />
        </InputContainer>
      )}
    </SafeArea>
  );
};

const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

const InputContainer = styled.View`
  padding: 24px;
`;

const SettingsContainer = styled.View`
  margin-top: 24px;
`;

const SettingListItem = styled.View`
  padding-horizontal: 18px;
  padding-vertical: 12px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top-width: 1px;
  border-color: ${Colors.gray[400]};
  background-color: #fff;
`;

const SettingInfoContainer = styled.View`
  flex-direction: column;
  margin-right: 16px;
  flex-shrink: 1;
`;

const SettingItemText = styled.Text`
  color: ${Colors.gray[800]};
  font-size: 17px;
`;

const SettingItemDescriptionText = styled.Text`
  color: ${Colors.gray[500]};
  font-size: 15px;
  margin-top: 4px;
`;

export default EmergencyContactSettingsScreen;
