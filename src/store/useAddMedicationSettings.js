import { create, immer } from '.';
import { days, nthDay, uuidv4 } from '../utils';

const now = new Date();
const frequencyChoices = [
  {
    label: 'Daily',
    value: {
      id: uuidv4(),
      interval: 1,
      intervalUnits: 'days',
      weeksdays: null,
    },
  },
  {
    label: `Weekly (${days[now.getDay()]})`,
    value: {
      id: uuidv4(),
      interval: 1,
      intervalUnits: 'weeks',
      weekdays: {
        [days[now.getDay()]]: true,
      },
    },
  },
  {
    label: `Bi-Weekly (${days[now.getDay()]})`,
    value: {
      id: uuidv4(),
      interval: 2,
      intervalUnits: 'weeks',
      weekdays: {
        [days[now.getDay()]]: true,
      },
    },
  },
  {
    label: `Monthly (the ${nthDay(now)})`,
    value: {
      id: uuidv4(),
      interval: 4,
      intervalUnits: 'weeks',
      weekdays: {
        [days[now.getDay()]]: true,
      },
    },
  },
];

now.setMinutes(0);

const timeChoices = [
  {
    label: 'Morning',
    value: {
      id: uuidv4(),
      name: 'morning',
      medicationAmount: 1,
      sendReminder: true,
      reminderTime: new Date(now.setHours(8)),
    },
  },
  {
    label: 'Midday',
    value: {
      id: uuidv4(),
      name: 'midday',
      medicationAmount: 1,
      sendReminder: true,
      reminderTime: new Date(now.setHours(14)),
    },
  },
  {
    label: 'Evening',
    value: {
      id: uuidv4(),
      name: 'evening',
      medicationAmount: 1,
      sendReminder: true,
      reminderTime: new Date(now.setHours(20)),
    },
  },
];

const useAddMedicationSettings = create(
  immer((set) => ({
    dosageUnit: 'mg',
    amountUnit: 'tablets',
    frequencies: frequencyChoices,
    selectedFrequency: frequencyChoices[0].value.id,
    times: timeChoices,
    selectedTimes: [timeChoices[0].value.id, timeChoices[2].value.id],
    setDosageUnit: (unit) =>
      set((state) => {
        state.dosageUnit = unit;
      }),
    setAmountUnit: (unit) =>
      set((state) => {
        state.amountUnit = unit;
      }),
    setSelectedFrequency: (id) =>
      set((state) => {
        state.selectedFrequency = id;
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
    setMedicationAmount: (id, medicationAmount) =>
      set((state) => {
        const time = state.times.find((time) => time.value.id === id);
        time.value.medicationAmount = medicationAmount;
      }),
    setReminderTime: (id, reminderTime) =>
      set((state) => {
        const time = state.times.find((time) => time.value.id === id);
        time.value.reminderTime = reminderTime;
      }),
    toggleReminder: (id) =>
      set((state) => {
        const time = state.times.find((time) => time.value.id === id);
        time.value.sendReminder = !time.value.sendReminder;
      }),
  })),
);

export { useAddMedicationSettings };
