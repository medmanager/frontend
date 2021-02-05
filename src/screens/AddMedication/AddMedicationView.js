import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';
import * as yup from 'yup';
import Autocomplete from '../../components/Autocomplete';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAddMedication } from '../../store/useAddMedication';
import { Colors } from '../../utils';
import api from '../../utils/api-calls';
import AmountInput from './components/AmountInput';
import StrengthInput from './components/StrengthInput';

const MIN_SEARCH_QUERY_LENGTH = 2;

const AddMedicationView = ({ navigation }) => {
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
      clearAutocompleteSuggestions();
      navigation.navigate('AddMedicationSchedule');
    },
  });
  const setFormValues = useAddMedication((state) => state.setFormValues);
  const clearAutocomplete = useRef(false);
  const [medicationNameSuggestions, setMedicationNameSuggestions] = useState(
    [],
  );

  const filterMedications = async (query) => {
    if (query === '') {
      return [];
    }
    if (query.length >= MIN_SEARCH_QUERY_LENGTH) {
      return api.searchAutoComplete(query);
    }
    setMedicationNameSuggestions([]);
  };

  const clearAutocompleteSuggestions = () => {
    setMedicationNameSuggestions([]);
  };

  useEffect(() => {
    if (clearAutocomplete.current) {
      clearAutocompleteSuggestions();
    } else {
      (async () => {
        const suggestions = await filterMedications(values.name);
        setMedicationNameSuggestions(suggestions);
      })();
    }
    clearAutocomplete.current = false;
  }, [values.name, clearAutocomplete]);

  const handleMedNameBlur = () => {
    clearAutocompleteSuggestions();
    handleBlur('name');
  };

  const textAreaInputStyle = {
    height: 150,
    justifyContent: 'flex-start',
  };

  return (
    <SafeArea>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <Form>
          <Autocomplete
            data={medicationNameSuggestions}
            onChangeText={handleChange('name')}
            onBlur={handleMedNameBlur}
            value={values.name}
            touched={touched}
            error={errors.name}
            label="Name"
            keyExtractor={(item) => item.toString()}
            renderItem={(item) => (
              <AutoCompleteSuggestion
                onPress={() => {
                  if (values.name === item) {
                    clearAutocompleteSuggestions();
                  } else {
                    setFieldValue('name', item);
                    clearAutocomplete.current = true;
                  }
                }}>
                <Text>{item}</Text>
              </AutoCompleteSuggestion>
            )}
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
            inputStyle={textAreaInputStyle}
            multiline
            numberOfLines={10}
            label="Notes"
          />
        </Form>
      </KeyboardAwareScrollView>
      <ButtonContainer>
        <Button disabled={!isValid} onPress={handleSubmit} text="Next" />
      </ButtonContainer>
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
