import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import styled from 'styled-components/native';
import * as yup from 'yup';
import shallow from 'zustand/shallow';
import Input from '../../components/Input';
import useAccountSettings from '../../store/useAccountSettings';
import { useAuth } from '../../store/useAuth';
import useCurrentUser from '../../store/useCurrentUser';

const AccountSettingsScreen = ({ navigation }) => {
  const token = useAuth((state) => state.userToken);
  const { data: user, status } = useCurrentUser(token);
  const { setFirstName, setLastName, setEmail, commit } = useAccountSettings(
    (state) => ({
      setFirstName: state.setFirstName,
      setLastName: state.setLastName,
      setEmail: state.setEmail,
      commit: state.commit,
    }),
    shallow,
  );
  const queryClient = useQueryClient();

  const { values, touched, errors, handleChange, handleBlur } = useFormik({
    initialValues: {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
    },
    validationSchema: yup.object().shape({
      firstName: yup
        .string()
        .required('First name is a required field')
        .max(100, 'First name must not be more than 100 characters'),
      lastName: yup
        .string()
        .required('Last name is a required field')
        .max(100, 'Last name must not be more than 100 characters'),
      email: yup
        .string()
        .email('That is not a valid email')
        .required('Email is a required field'),
    }),
    onSubmit: () => {},
  });

  useEffect(() => {
    // add a listener so that when the user navigates away from this screen, commit the changes to the settings
    const unsubscribe = navigation.addListener('beforeRemove', async () => {
      setFirstName(values.firstName);
      setLastName(values.lastName);
      setEmail(values.email);
      await commit(token); // commit settings changes
      await queryClient.invalidateQueries('currentUser');
    });

    return unsubscribe;
  }, [
    navigation,
    commit,
    token,
    values,
    setFirstName,
    setLastName,
    setEmail,
    queryClient,
  ]);

  return (
    <SafeArea>
      <Container>
        <Input
          name="firstName"
          label="First Name"
          onChangeText={handleChange('firstName')}
          onBlur={handleBlur('firstName')}
          value={values.firstName}
          touched={touched}
          error={errors.firstName}
        />
        <Input
          name="lastName"
          label="Last Name"
          onChangeText={handleChange('lastName')}
          onBlur={handleBlur('lastName')}
          value={values.lastName}
          touched={touched}
          error={errors.lastName}
        />
        <Input
          name="email"
          label="Email"
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
          touched={touched}
          error={errors.email}
        />
      </Container>
    </SafeArea>
  );
};

const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

const Container = styled.View`
  padding: 24px;
`;

export default AccountSettingsScreen;
