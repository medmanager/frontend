import React from 'react';
import RadioButtonGroup from '../../../components/RadioButtonGroup';
import { useAddMedicationSettings } from '../../../store/useAddMedicationSettings';

const FrequencyRadioGroup = () => {
  const {
    frequencies,
    selectedFrequency,
    setSelectedFrequency,
  } = useAddMedicationSettings((state) => ({
    frequencies: state.frequencies,
    selectedFrequency: state.selectedFrequency,
    setSelectedFrequency: state.setSelectedFrequency,
  }));

  return (
    <RadioButtonGroup
      data={frequencies}
      selectedId={selectedFrequency}
      onChange={(value) => setSelectedFrequency(value.id)}
    />
  );
};

export default FrequencyRadioGroup;
