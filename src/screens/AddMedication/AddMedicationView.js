import { Formik } from 'formik';
import React, { Fragment } from 'react';
import styled from 'styled-components/native';
import * as yup from 'yup';
import shallow from 'zustand/shallow';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Label from '../../components/Label';
import { useAddMedicationSettings } from '../../store/useAddMedicationSettings';
import { Colors } from '../../utils';
import AmountInput from './components/AmountInput';
import DosageInput from './components/DosageInput';
import FrequencyRadioGroup from './components/FrequencyRadioGroup';
import TimeMultiSelect from './components/TimeMultiSelect';

const AddMedicationView = ({ navigation }) => {
  const initialValues = {
    name: '',
    dosage: null,
    amount: null,
    notes: '',
  };
  const settings = useAddMedicationSettings(
    (state) => ({
      selectedFrequency: state.selectedFrequency,
      selectedTimes: state.selectedTimes,
      amountUnit: state.amountUnit,
      dosageUnit: state.dosageUnit,
    }),
    shallow,
  );

  return (
    <View>
      <Formik
        initialValues={initialValues}
        validationSchema={yup.object().shape({
          name: yup
            .string()
            .required('Name is a required field')
            .max(100, 'Name must not be more than 100 characters'),
          dosage: yup
            .number()
            .nullable()
            .required('Dosage is a required field'),
          amount: yup
            .number()
            .nullable()
            .required('Amount is a required field'),
          notes: yup.string(),
        })}
        onSubmit={(values) => {
          navigation.navigate('AddMedicationConfirmation', {
            ...values,
            ...settings,
          });
        }}>
        {({
          values,
          touched,
          errors,
          handleSubmit,
          handleChange,
          handleBlur,
        }) => (
          <Fragment>
            <Scrollable keyboardShouldPersistTaps="always">
              <Form behavior="padding">
                <Input
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  touched={touched}
                  error={errors.name}
                  label="Name"
                />
                <Row>
                  <DosageInput
                    onChangeText={handleChange('dosage')}
                    onBlur={handleBlur('dosage')}
                    value={values.dosage}
                    touched={touched}
                    error={errors.dosage}
                  />
                  <AmountInput
                    onChangeText={handleChange('amount')}
                    onBlur={handleBlur('amount')}
                    value={values.amount}
                    touched={touched}
                    error={errors.amount}
                  />
                </Row>
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
                <FormField>
                  <Label>Frequency</Label>
                  <FrequencyRadioGroup />
                </FormField>
                <FormField>
                  <Label>Dosage Times</Label>
                  <TimeMultiSelect />
                </FormField>
              </Form>
            </Scrollable>
            <ButtonContainer>
              <Button onPress={handleSubmit} text="Save" />
            </ButtonContainer>
          </Fragment>
        )}
      </Formik>
    </View>
  );
};

const View = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

const Scrollable = styled.ScrollView``;

const Form = styled.KeyboardAvoidingView`
  flex: 1;
  flex-direction: column;
  padding: 24px;
`;

const FormField = styled.View`
  margin-bottom: 24px;
`;

const Row = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

const ButtonContainer = styled.View`
  border-top-width: 1px;
  border-top-color: ${Colors.gray[100]}
  width: 100%;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 8px;
  padding-bottom: 8px;
`;

export default AddMedicationView;
