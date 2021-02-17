import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import * as yup from 'yup';
import Input from '../../components/Input';
import ModalActivityIndicator from '../../components/ModalActivityIndicator';
import PasswordInput from '../../components/PasswordInput';
import { useAuth } from '../../store/useAuth';
import { Colors } from '../../utils';

function SignInScreen({ navigation }) {
  const { signIn, error } = useAuth((state) => ({
    signIn: state.signIn,
    error: state.error,
  }));
  const handleSignUpPress = () => {
    navigation.navigate('SignUp');
  };
  const initialValues = {
    email: '',
    password: '',
  };
  const {
    values,
    touched,
    errors,
    status,
    isSubmitting,
    handleSubmit,
    setStatus,
    handleChange,
  } = useFormik({
    initialValues,
    validationSchema: yup.object().shape({
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
      await signIn(...Object.values(formValues));
      setSubmitting(false);
    },
  });

  useEffect(() => {
    setStatus(error);
  }, [setStatus, error]);

  return (
    <SafeArea>
      <ModalActivityIndicator
        loadingMessage="Logging you in..."
        show={isSubmitting}
      />
      <Container>
        <TopText>Welcome back!</TopText>
        <SubText>Let's get you signed in.</SubText>
        <Form>
          {status && (
            <Status>
              <Icon name="alert-circle" size={24} color="#DC2626" />
              <StatusText>{status}</StatusText>
            </Status>
          )}
          <Input
            touched={touched}
            error={errors.email}
            value={values.email}
            onChangeText={handleChange('email')}
            autoCapitalize="none"
            label="Email"
            placeholder="Email"
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
      </Container>
      <ButtonContainer>
        <AlternateButton onPress={handleSignUpPress}>
          <AlternateText>
            Don't have an account?
            <AlternateText style={{ color: Colors.orange[500] }}>
              {' '}
              Sign up
            </AlternateText>
          </AlternateText>
        </AlternateButton>
        <ContinueButton onPress={handleSubmit}>
          <ContinueButtonText>Sign In</ContinueButtonText>
        </ContinueButton>
      </ButtonContainer>
    </SafeArea>
  );
}

const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  padding: 24px;
`;

const Form = styled.View`
  margin-top: 48px;
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

const Status = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background-color: #fee2e2;
  border-radius: 8px;
  margin-bottom: 24px;
`;

const StatusText = styled.Text`
  color: #dc2626;
  margin-left: 8px;
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
  position: absolute;
  bottom: 30px;
`;

export default SignInScreen;
