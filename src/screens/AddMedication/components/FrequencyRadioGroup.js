import React from 'react';
import shallow from 'zustand/shallow';
import RadioButtonGroup from '../../../components/RadioButtonGroup';
import { useAddMedication } from '../../../store/useAddMedication';

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
