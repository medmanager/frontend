import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';
import * as yup from 'yup';
import AmountInput from '../../components/AmountInput';
import Button from '../../components/Button';
import Input from '../../components/Input';
import MedicationNameAutocompleteInput from '../../components/MedicationNameAutocompleteInput';
import StrengthInput from '../../components/StrengthInput';
import { useMedicationState } from '../../store/useMedicationState';
import { Colors } from '../../utils';

const textAreaInputStyle = {
  height: 150,
  justifyContent: 'flex-start',
};

const AddMedicationView = ({ navigation }) => {
  const initialValues = {
    name: '',
    strength: null,
    amount: null,
    condition: '',
  };
  const setMedicationInfo = useMedicationState(
    (state) => state.setMedicationInfo,
  );
  const resetMedicationState = useMedicationState((state) => state.reset);
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
      condition: yup.string(),
    }),
    onSubmit: (medicationInfo) => {
      setMedicationInfo(medicationInfo);
      navigation.navigate('AddMedicationSchedule');
    },
  });

  useEffect(() => {
    resetMedicationState();
  }, [resetMedicationState]);

  return (
    <SafeArea>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <Form>
          <MedicationNameAutocompleteInput
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
            touched={touched}
            error={errors.name}
            label="Name"
            onPress={(name) => setFieldValue('name', name)}
          />
          <BottomLayer>
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
              onChangeText={handleChange('condition')}
              onBlur={handleBlur('condition')}
              value={values.condition}
              touched={touched}
              error={errors.condition}
              inputStyle={textAreaInputStyle}
              multiline
              numberOfLines={10}
              label="Condition"
            />
          </BottomLayer>
        </Form>
      </KeyboardAwareScrollView>
      <ButtonContainer>
        <Button disabled={!isValid} onPress={handleSubmit} text="Next" />
      </ButtonContainer>
    </SafeArea>
  );
};

const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

const Form = styled.View`
  flex: 1;
  padding: 24px;
`;

const BottomLayer = styled.View`
  z-index: -1;
`;

const ButtonContainer = styled.View`
  border-top-width: 1px;
  border-top-color: ${Colors.gray[300]};
  width: 100%;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 8px;
  padding-bottom: 8px;
`;

export default AddMedicationView;
