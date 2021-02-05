import { Formik } from 'formik';
import React, { Fragment } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';
import * as yup from 'yup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAddMedication } from '../../store/useAddMedication';
import { Colors } from '../../utils';
import AmountInput from './components/AmountInput';
import StrengthInput from './components/StrengthInput';

const AddMedicationView = ({ navigation }) => {
  const initialValues = {
    name: '',
    strength: null,
    amount: null,
    notes: '',
  };
  const setFormValues = useAddMedication((state) => state.setFormValues);

  return (
    <View>
      <Formik
        initialValues={initialValues}
        validationSchema={yup.object().shape({
          name: yup
            .string()
            .required('Name is a required field')
            .max(100, 'Name must not be more than 100 characters'),
          strength: yup
            .number()
            .nullable()
            .required('Strength is a required field'),
          amount: yup
            .number()
            .nullable()
            .required('Amount is a required field'),
          notes: yup.string(),
        })}
        onSubmit={(values) => {
          setFormValues(values);
          navigation.navigate('AddMedicationSchedule');
        }}>
        {({
          values,
          touched,
          errors,
          isValid,
          handleSubmit,
          handleChange,
          handleBlur,
        }) => (
          <Fragment>
            <KeyboardAwareScrollView>
              <Form behavior="padding">
                <Input
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  touched={touched}
                  error={errors.name}
                  label="Name"
                />
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
                  inputStyle={{ height: 150, justifyContent: 'flex-start' }}
                  multiline
                  numberOfLines={10}
                  label="Notes"
                />
                {/* <FormField>
                  <Label>Frequency</Label>
                  <FrequencyRadioGroup />
                </FormField>
                <FormField>
                  <Label>Dosage Times</Label>
                  <DosageMultiSelect />
                </FormField> */}
              </Form>
            </KeyboardAwareScrollView>
            <ButtonContainer>
              <Button disabled={!isValid} onPress={handleSubmit} text="Next" />
            </ButtonContainer>
          </Fragment>
        )}
      </Formik>
    </View>
  );
};

const View = styled.SafeAreaView`
  flex: 1;
`;

const Form = styled.View`
  flex-direction: column;
  padding: 24px;
`;

const FormField = styled.View`
  margin-bottom: 24px;
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
