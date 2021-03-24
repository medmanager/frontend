import { useFormik } from 'formik';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';
import * as yup from 'yup';
import Autocomplete from '../../components/Autocomplete';
import { useAddMedication } from '../../store/useAddMedication';
import { useAuth } from '../../store/useAuth';
import useMedication from '../../store/useMedication';
import { MIN_SEARCH_QUERY_LENGTH } from '../../utils';
import api from '../../utils/api-calls';

const EditMedicationView = ({ navigation, route }) => {
  const { medId } = route.params;
  const token = useAuth((state) => state.userToken);
  const { data: medication } = useMedication(medId, token);
  const initialValues = {
    name: medication ? medication.name : '',
    strength: medication ? medication.strength : null,
    amount: medication ? medication.amount : null,
    condition: medication ? medication.condition : null,
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
      try {
        const results = api.searchAutoComplete(query);
        return results;
      } catch (e) {
        return [];
      }
    }
    return [];
  };

  const clearAutocompleteSuggestions = () => {
    setMedicationNameSuggestions([]);
  };

  useLayoutEffect(() => {
    if (medication) {
      navigation.setOptions({
        title: `Edit ${medication.name}`,
      });
    }
  }, [medication, navigation]);

  useEffect(() => {
    if (clearAutocomplete.current) {
      clearAutocompleteSuggestions();
    } else {
      (async () => {
        try {
          const suggestions = await filterMedications(values.name);
          setMedicationNameSuggestions(suggestions);
        } catch (e) {}
      })();
    }
    clearAutocomplete.current = false;
  }, [values.name, clearAutocomplete]);

  const handleMedNameBlur = () => {
    clearAutocompleteSuggestions();
    handleBlur('name');
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

export default EditMedicationView;
