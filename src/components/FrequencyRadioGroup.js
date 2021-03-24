import React from 'react';
import shallow from 'zustand/shallow';
import { useAddMedication } from '../store/useAddMedication';
import RadioButtonGroup from './RadioButtonGroup';

const FrequencyRadioGroup = () => {
  const {
    frequencies,
    selectedFrequency,
    setSelectedFrequency,
  } = useAddMedication(
    (state) => ({
      frequencies: state.frequencies,
      selectedFrequency: state.selectedFrequency,
      setSelectedFrequency: state.setSelectedFrequency,
    }),
    shallow,
  );

  return (
    <RadioButtonGroup
      data={frequencies}
      selectedId={selectedFrequency}
      onChange={(id) => setSelectedFrequency(id)}
    />
  );
};

export default FrequencyRadioGroup;
