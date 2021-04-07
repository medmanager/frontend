import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';
import apiCalls from '../utils/api-calls';
import AutocompleteInput from './AutocompleteInput';

const MIN_SEARCH_QUERY_LENGTH = 2;

const MedicationNameAutocompleteInput = ({
  onPress,
  onBlur,
  value,
  ...props
}) => {
  const clearSuggestions = useRef(true);
  const [medicationNameSuggestions, setMedicationNameSuggestions] = useState(
    [],
  );

  const clearAutocompleteSuggestions = () => {
    setMedicationNameSuggestions([]);
  };

  const filterMedications = async (query) => {
    if (query === '') {
      return [];
    }
    if (query.length >= MIN_SEARCH_QUERY_LENGTH) {
      try {
        const results = await apiCalls.searchAutoComplete(query);
        return results;
      } catch (e) {
        return [];
      }
    }
    return [];
  };

  useEffect(() => {
    (async () => {
      try {
        if (clearSuggestions.current) {
          clearAutocompleteSuggestions();
        } else {
          const suggestions = await filterMedications(value);
          setMedicationNameSuggestions(suggestions);
        }
      } catch (e) {}
    })();
    clearSuggestions.current = false;
  }, [value, clearSuggestions]);

  const handleOnBlur = useCallback(
    (e) => {
      onBlur(e);
      clearAutocompleteSuggestions();
      clearSuggestions.current = true;
    },
    [onBlur],
  );

  return (
    <AutocompleteInput
      {...props}
      onBlur={handleOnBlur}
      value={value}
      data={medicationNameSuggestions}
      keyExtractor={({ item }) => item}
      renderItem={({ item, index }) => (
        <AutoCompleteSuggestion
          key={index}
          onPress={() => {
            onPress(item);
            clearAutocompleteSuggestions();
            clearSuggestions.current = true;
          }}>
          <Text>{item}</Text>
        </AutoCompleteSuggestion>
      )}
    />
  );
};

const AutoCompleteSuggestion = styled.TouchableOpacity`
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const Text = styled.Text`
  font-size: 16px;
`;

export default MedicationNameAutocompleteInput;
