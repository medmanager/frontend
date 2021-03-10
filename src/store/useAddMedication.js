import produce from 'immer';
import { create, immer } from '.';
import {
  dosageMultiSelectChoices,
  frequencyRadioInputChoices,
} from '../utils/medication';

const defaultState = {
  strengthUnit: 'mg',
  amountUnit: 'tablets',
  frequencies: frequencyRadioInputChoices(),
  selectedFrequency: frequencyRadioInputChoices()[0].id,
  dosages: dosageMultiSelectChoices(),
  selectedDosages: [
    dosageMultiSelectChoices()[0].id,
    dosageMultiSelectChoices()[3].id,
  ],
  formValues: {
    name: '',
    strength: null,
    amount: null,
    notes: '',
  },
  color: 0,
};

const useAddMedication = create(
  immer((set) => ({
    ...defaultState,

    // state actions
    setFormValues: (formValues) =>
      set((state) => {
        state.formValues = formValues;
      }),
    setStrengthUnit: (unit) =>
      set((state) => {
        state.strengthUnit = unit;
      }),
    setAmountUnit: (unit) =>
      set((state) => {
        state.amountUnit = unit;
      }),
    setSelectedFrequency: (id) =>
      set((state) => {
        state.selectedFrequency = id;
      }),
    setCustomFrequencyInterval: (id, interval) =>
      set((state) => {
        const frequency = state.frequencies.find(
          (frequency) => frequency.id === id,
        );
        frequency.value.interval = interval;
      }),
    setCustomFrequencyintervalUnit: (id, intervalUnit) =>
      set((state) => {
        const frequency = state.frequencies.find(
          (frequency) => frequency.id === id,
        );
        frequency.value.intervalUnit = intervalUnit;
      }),
    toggleCustomFrequencyWeekday: (id, weekday) =>
      set((state) => {
        const frequency = state.frequencies.find(
          (frequency) => frequency.id === id,
        );
        const currentValue = frequency.value.weekdays[weekday] || false;
        frequency.value.weekdays[weekday] = !currentValue;
      }),
    toggleSelectTime: (id) =>
      set((state) => {
        if (state.selectedDosages.includes(id)) {
          state.selectedDosages = state.selectedDosages.filter(
            (dosageId) => dosageId !== id,
          );
        } else {
          state.selectedDosages.push(id);
        }
      }),
    setDose: (id, dose) =>
      set((state) => {
        const time = state.dosages.find((dosage) => dosage.id === id);
        time.value.dose = dose;
      }),
    setReminderTime: (id, reminderTime) =>
      set((state) => {
        const time = state.dosages.find((dosage) => dosage.id === id);
        time.value.reminderTime = reminderTime;
      }),
    toggleReminder: (id) =>
      set((state) => {
        const time = state.dosages.find((dosage) => dosage.id === id);
        time.value.sendReminder = !time.value.sendReminder;
      }),
    sendTimePicker: (id) =>
      set((state) => {
        const time = state.dosages.find((dosage) => dosage.id === id);
        time.value.sendTimePicker = !time.value.sendTimePicker;
      }),
    selectColor: (index) =>
      set((state) => {
        state.color = index;
      }),
    reset: () => set((state) => ({ ...state, ...defaultState })),
    setState: (fn) => set(produce(fn)),
  })),
);

export { useAddMedication };
