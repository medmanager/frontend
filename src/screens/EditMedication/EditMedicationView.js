import { useFormik } from 'formik';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import * as yup from 'yup';
import Autocomplete from '../../components/Autocomplete';
import { useAddMedication } from '../../store/useAddMedication';
import { useAuth } from '../../store/useAuth';
import useMedication from '../../store/useMedication';
import { Colors, MIN_SEARCH_QUERY_LENGTH } from '../../utils';
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
        const results = await api.searchAutoComplete(query);
        console.log(results);
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

  const handleUpdateMedication = useCallback(() => {
    console.log('update');
  }, []);

  useLayoutEffect(() => {
    if (medication) {
      navigation.setOptions({
        title: `Edit ${medication.name}`,
        headerRight: () => (
          <TouchableOpacity onPress={handleUpdateMedication}>
            <HeaderText>Update</HeaderText>
          </TouchableOpacity>
        ),
      });
    }
  }, [medication, navigation, handleUpdateMedication]);

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
      <ActionArea>
        <ActionItem activeOpacity={0.7} style={{ borderBottomWidth: 1 }}>
          <DeleteActionItemText>Delete</DeleteActionItemText>
        </ActionItem>
      </ActionArea>
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
  padding: 24px;
`;

const Text = styled.Text`
  font-size: 16px;
`;

const HeaderText = styled.Text`
  color: white;
  font-size: 16px;
`;

const ActionArea = styled.View`
  margin-top: 16px;
  z-index: -1;
`;

const ActionItem = styled.TouchableOpacity`
  background-color: white;
  padding-vertical: 12px;
  border-color: ${Colors.gray[300]};
  border-top-width: 1px;
`;

const DeleteActionItemText = styled.Text`
  font-size: 16px;
  text-align: center;
  color: red;
`;

export default EditMedicationView;
