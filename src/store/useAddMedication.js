import produce from 'immer';
import { create, immer } from '.';
import { capitalize, days, getStatusText, nthDay } from '../utils';

const now = new Date();
const frequencyRadioInputChoices = [
  {
    id: 0,
    type: 'RadioButton',
    label: 'Daily',
    value: {
      interval: 1,
      intervalUnits: 'days',
      weeksdays: null,
    },
  },
  {
    id: 1,
    type: 'RadioButton',
    label: `Weekly (${capitalize(days[now.getDay()])})`,
    value: {
      interval: 1,
      intervalUnits: 'weeks',
      weekdays: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
        [days[now.getDay()]]: true,
      },
    },
  },
  {
    id: 2,
    type: 'RadioButton',
    label: `Bi-Weekly (${capitalize(days[now.getDay()])})`,
    value: {
      interval: 2,
      intervalUnits: 'weeks',
      weekdays: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
        [days[now.getDay()]]: true,
      },
    },
  },
  {
    id: 3,
    type: 'RadioButton',
    label: `Monthly (the ${nthDay(now)})`,
    value: {
      interval: 4,
      intervalUnits: 'weeks',
      weekdays: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
        [days[now.getDay()]]: true,
      },
    },
  },
  {
    id: 4,
    type: 'RadioButtonClickThrough',
    label: (value, selected) =>
      `Custom ${selected ? `(${capitalize(getStatusText(value))})` : ''}`,
    route: 'AddMedicationCustomFrequency',
    value: {
      interval: 1,
      intervalUnits: 'days',
      weekdays: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
        [days[now.getDay()]]: true, // enable current day by default
      },
    },
  },
];

now.setMinutes(0);

const dosageMultiSelectChoices = [
  {
    id: 0,
    label: 'Morning',
    value: {
      dose: 1,
      sendReminder: true,
      reminderTime: new Date(now.setHours(8)),
      sendTimePicker: false,
    },
  },
  {
    id: 1,
    label: 'Afternoon',
    value: {
      dose: 1,
      sendReminder: true,
      reminderTime: new Date(now.setHours(12)),
      sendTimePicker: false,
    },
  },
  {
    id: 2,
    label: 'Evening',
    value: {
      dose: 1,
      sendReminder: true,
      reminderTime: new Date(now.setHours(16)),
      sendTimePicker: false,
    },
  },
  {
    id: 3,
    label: 'Night',
    value: {
      dose: 1,
      sendReminder: true,
      reminderTime: new Date(now.setHours(20)),
      sendTimePicker: false,
    },
  },
];

const defaultState = {
  strengthUnit: 'mg',
  amountUnit: 'tablets',
  frequencies: frequencyRadioInputChoices,
  selectedFrequency: frequencyRadioInputChoices[0].id,
  dosages: dosageMultiSelectChoices,
  selectedDosages: [
    dosageMultiSelectChoices[0].id,
    dosageMultiSelectChoices[3].id,
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
    setCustomFrequencyIntervalUnits: (id, intervalUnits) =>
      set((state) => {
        const frequency = state.frequencies.find(
          (frequency) => frequency.id === id,
        );
        frequency.value.intervalUnits = intervalUnits;
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
