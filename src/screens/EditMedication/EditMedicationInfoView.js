import { useFormik } from 'formik';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';
import * as yup from 'yup';
import AmountInput from '../../components/AmountInput';
import Input from '../../components/Input';
import StrengthInput from '../../components/StrengthInput';
import { useAddMedication } from '../../store/useAddMedication';

const EditMedicationInfoView = ({ navigation }) => {
  const initialValues = {
    name: '',
    strength: null,
    amount: null,
    notes: '',
  };
  const {
    values,
    touched,
    errors,
    isValid,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required('Name is a required field')
        .max(100, 'Name must not be more than 100 characters'),
      strength: yup
        .number()
        .nullable()
        .required('Strength is a required field'),
      amount: yup.number().nullable().required('Amount is a required field'),
      notes: yup.string(),
    }),
    onSubmit: (formValues) => {
      setFormValues(formValues);
    },
  });
  const setFormValues = useAddMedication((state) => state.setFormValues);

  const textAreaInputStyle = {
    height: 150,
    justifyContent: 'flex-start',
  };

  return (
    <SafeArea>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <Form>
          <StrengthInput
            onChangeText={handleChange('strength')}
            onBlur={handleBlur('strength')}
            value={values.strength}
            touched={touched}
            error={errors.strength}
          />
          <AmountInput
            onChangeText={handleChange('amount')}
            onBlur={handleBlur('amount')}
            value={values.amount}
            touched={touched}
            error={errors.amount}
          />
          <Input
            onChangeText={handleChange('notes')}
            onBlur={handleBlur('notes')}
            value={values.notes}
            touched={touched}
            error={errors.notes}
            inputStyle={textAreaInputStyle}
            multiline
            numberOfLines={10}
            label="Condition"
          />
        </Form>
      </KeyboardAwareScrollView>
    </SafeArea>
  );
};

const AutoCompleteSuggestion = styled.TouchableOpacity`
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

const Form = styled.View`
  flex: 1;
  padding: 24px;
`;

export default EditMedicationInfoView;
