import { useFormik } from 'formik';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';
import * as yup from 'yup';
import Input from '../../components/Input';
import ModalActivityIndicator from '../../components/ModalActivityIndicator';
import PasswordInput from '../../components/PasswordInput';
import { useAuth } from '../../store/useAuth';
import { Colors } from '../../utils';

function SignUpScreen({ navigation }) {
  const signUp = useAuth((state) => state.signUp);
  const handleSignInPress = () => {
    navigation.navigate('SignIn');
  };
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };
  const {
    values,
    touched,
    errors,
    handleSubmit,
    isSubmitting,
    handleChange,
  } = useFormik({
    initialValues,
    validationSchema: yup.object().shape({
      firstName: yup
        .string()
        .required('First Name is a required field')
        .max(100, 'First Name must not be more than 100 characters'),
      lastName: yup
        .string()
        .required('Last Name is a required field')
        .max(100, 'Last Name must not be more than 100 characters'),
      email: yup
        .string()
        .email('That is not a valid email')
        .required('Email is a required field'),
      password: yup
        .string()
        .min(3, 'Your password must be at least 3 characters')
        .max(100, 'Your password must not exceed 100 characters')
        .required('Password is a required field'),
    }),
    onSubmit: async (formValues, { setSubmitting }) => {
      setSubmitting(true);
      await signUp(...Object.values(formValues));
      setSubmitting(false);
    },
  });

  return (
    <SafeArea>
      <KeyboardAwareScrollView>
        <ModalActivityIndicator
          loadingMessage="Registering a new user..."
          show={isSubmitting}
        />
        <TopText>New here?</TopText>
        <SubText>Let's get you started.</SubText>
        <Form>
          <Input
            autoCorrect={false}
            touched={touched}
            error={errors.firstName}
            value={values.firstName}
            onChangeText={handleChange('firstName')}
            label="First Name"
            placeholder="First Name"
          />
          <Input
            autoCorrect={false}
            touched={touched}
            error={errors.lastName}
            value={values.lastName}
            onChangeText={handleChange('lastName')}
            label="Last Name"
            placeholder="Last Name"
          />
          <Input
            touched={touched}
            error={errors.email}
            value={values.email}
            onChangeText={handleChange('email')}
            autoCapitalize="none"
            label="Email"
            placeholder="Email"
            autoCompleteType="email"
            keyboardType="email-address"
          />
          <PasswordInput
            touched={touched}
            error={errors.password}
            value={values.password}
            onChangeText={handleChange('password')}
            label="Password"
            placeholder="Password"
          />
        </Form>
        <ButtonContainer>
          <AlternateButton activeOpacity={0.7} onPress={handleSignInPress}>
            <AlternateText>
              Already have an account?
              <AlternateText style={{ color: Colors.orange[500] }}>
                {' '}
                Sign in
              </AlternateText>
            </AlternateText>
          </AlternateButton>
          <ContinueButton onPress={handleSubmit}>
            <ContinueButtonText>Sign Up</ContinueButtonText>
          </ContinueButton>
        </ButtonContainer>
      </KeyboardAwareScrollView>
    </SafeArea>
  );
}

const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

const Form = styled.View`
  flex: 1;
  padding: 24px;
  margin-top: 24px;
`;

const TopText = styled.Text`
  text-align: center;
  color: ${Colors.blue[500]};
  font-size: 30px;
  margin-top: 60px;
`;

const SubText = styled.Text`
  text-align: center;
  color: ${Colors.gray[600]};
  font-size: 24px;
  margin-top: 16px;
  margin-bottom: 16px;
`;

//Button at the bottom for either signing in or signing up
const ContinueButton = styled.TouchableOpacity`
  background-color: ${Colors.blue[500]};
  margin-left: 16px;
  margin-right: 16px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 16px;
  padding-right: 16px;
  align-items: center;
  border-radius: 8px;
`;

const ContinueButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

//button for transitioning to the opposite screen (sign in vs sign up)
const AlternateButton = styled.TouchableOpacity`
  margin-top: 12px;
  background-color: transparent;
  margin-left: 16px;
  margin-right: 16px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 16px;
  padding-right: 16px;
  align-items: center;
`;

const AlternateText = styled.Text`
  color: ${Colors.gray[600]};
  font-size: 16px;
`;

//for positioning the buttons at the bottom of the screen
const ButtonContainer = styled.View`
  border-top-width: 1px;
  border-top-color: transparent;
  width: 100%;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 8px;
  padding-bottom: 8px;
`;

export default SignUpScreen;
