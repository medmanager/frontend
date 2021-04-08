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

const phoneRegExp = /^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

const CaregiverContactSettingsScreen = ({ navigation }) => {
  const token = useAuth((state) => state.userToken);
  const {
    caregiverContactName,
    caregiverContactPhoneNumber,
    enableCaregiverContact,
    toggleCaregiverContact,
    setCaregiverContactName,
    setCaregiverContactPhoneNumber,
    commit,
  } = useSettings(
    (state) => ({
      caregiverContactName: state.caregiverContact.name,
      caregiverContactPhoneNumber: state.caregiverContact.phoneNumber,
      enableCaregiverContact: state.hasCaregiverContact,
      toggleCaregiverContact: state.toggleCaregiverContact,
      setCaregiverContactName: state.setCaregiverContactName,
      setCaregiverContactPhoneNumber: state.setCaregiverContactPhoneNumber,
      commit: state.commit,
    }),
    shallow,
  );
  const queryClient = useQueryClient();
  const { values, touched, errors, handleChange, handleBlur } = useFormik({
    initialValues: {
      name: caregiverContactName,
      phoneNumber: caregiverContactPhoneNumber,
    },
    validationSchema: yup.object().shape({
      name: yup.string().max(100, 'Name must not be more than 100 characters'),
      phoneNumber: yup
        .string()
        .matches(phoneRegExp, 'Phone number is not valid'),
    }),
    onSubmit: () => {},
  });

  const handleToggleCaregiverContact = useCallback(() => {
    toggleCaregiverContact();
  }, [toggleCaregiverContact]);

  useEffect(() => {
    // add a listener so that when the user navigates away from this screen, commit the changes to the settings
    const unsubscribe = navigation.addListener('beforeRemove', async () => {
      setCaregiverContactName(values.name);
      setCaregiverContactPhoneNumber(values.phoneNumber);
      await commit(token); // commit settings changes
      await queryClient.invalidateQueries('currentUser');
    });

    return unsubscribe;
  }, [
    navigation,
    commit,
    token,
    values,
    setCaregiverContactName,
    setCaregiverContactPhoneNumber,
    queryClient,
  ]);

  return (
    <SafeArea>
      <SettingsContainer>
        <SettingListItem style={{ borderBottomWidth: 1 }}>
          <SettingInfoContainer>
            <SettingItemText>Caregiver Contact</SettingItemText>
            <SettingItemDescriptionText>
              Enable the ability to alert a caregiver contact when a medication
              has not been taken.
            </SettingItemDescriptionText>
          </SettingInfoContainer>
          <Switch
            onValueChange={handleToggleCaregiverContact}
            value={enableCaregiverContact}
            trackColor={{
              false: Colors.gray[300],
              true: Colors.blue[500],
            }}
            thumbColor="#fff"
          />
        </SettingListItem>
      </SettingsContainer>
      {enableCaregiverContact && (
        <InputContainer>
          <Input
            name="name"
            label="Caregiver Contact Name"
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
            touched={touched}
            error={errors.name}
          />
          <Input
            name="phoneNumber"
            label="Caregiver Contact Phone Number"
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

export default CaregiverContactSettingsScreen;
