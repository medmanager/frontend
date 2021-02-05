import produce from 'immer';
import { create, immer } from '.';
import { capitalize, days, getStatusText, nthDay } from '../utils';

const now = new Date();
const frequencyRadioInputChoices = [
  {
    id: 1,
    type: 'RadioButton',
    label: 'Daily',
    value: {
      interval: 1,
      intervalUnits: 'days',
      weeksdays: null,
    },
  },
  {
    id: 2,
    type: 'RadioButton',
    label: `Weekly (${capitalize(days[now.getDay()])})`,
    value: {
      interval: 1,
      intervalUnits: 'weeks',
      weekdays: {
        [days[now.getDay()]]: true,
      },
    },
  },
  {
    id: 3,
    type: 'RadioButton',
    label: `Bi-Weekly (${capitalize(days[now.getDay()])})`,
    value: {
      interval: 2,
      intervalUnits: 'weeks',
      weekdays: {
        [days[now.getDay()]]: true,
      },
    },
  },
  {
    id: 4,
    type: 'RadioButton',
    label: `Monthly (the ${nthDay(now)})`,
    value: {
      interval: 4,
      intervalUnits: 'weeks',
      weekdays: {
        [days[now.getDay()]]: true,
      },
    },
  },
  {
    id: 5,
    type: 'RadioButtonClickThrough',
    label: (value, selected) =>
      `Custom ${selected ? `(${getStatusText(value)})` : ''}`,
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

const timeMultiSelectChoices = [
  {
    id: 0,
    label: 'Morning',
    value: {
      dose: 1,
      sendReminder: true,
      reminderTime: new Date(now.setHours(8)),
    },
  },
  {
    id: 1,
    label: 'Afternoon',
    value: {
      dose: 1,
      sendReminder: true,
      reminderTime: new Date(now.setHours(12)),
    },
  },
  {
    id: 2,
    label: 'Evening',
    value: {
      name: 'evening',
      dose: 1,
      sendReminder: true,
      reminderTime: new Date(now.setHours(16)),
    },
  },
  {
    id: 3,
    label: 'Night',
    value: {
      dose: 1,
      sendReminder: true,
      reminderTime: new Date(now.setHours(20)),
    },
  },
];

const useAddMedication = create(
  immer((set) => ({
    // default state
    strengthUnit: 'mg',
    amountUnit: 'tablets',
    frequencies: frequencyRadioInputChoices,
    selectedFrequency: frequencyRadioInputChoices[0].id,
    times: timeMultiSelectChoices,
    selectedTimes: [timeMultiSelectChoices[0].id, timeMultiSelectChoices[3].id],
    formValues: null,

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
        if (state.selectedTimes.includes(id)) {
          state.selectedTimes = state.selectedTimes.filter(
            (timeId) => timeId !== id,
          );
        } else {
          state.selectedTimes.push(id);
        }
      }),
    setDose: (id, dose) =>
      set((state) => {
        const time = state.times.find((time) => time.id === id);
        time.value.dose = dose;
      }),
    setReminderTime: (id, reminderTime) =>
      set((state) => {
        const time = state.times.find((time) => time.id === id);
        time.value.reminderTime = reminderTime;
      }),
    toggleReminder: (id) =>
      set((state) => {
        const time = state.times.find((time) => time.id === id);
        time.value.sendReminder = !time.value.sendReminder;
      }),
    setState: (fn) => set(produce(fn)),
  })),
);

export { useAddMedication };
