import dayjs from 'dayjs';
import produce from 'immer';
import { create, immer } from '.';
import {
  afternoonInterval,
  deepEqual,
  eveningInterval,
  morningInterval,
} from '../utils';
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
  name: '',
  strength: null,
  amount: null,
  condition: '',
  color: 0,
};

const useMedicationState = create(
  immer((set) => ({
    ...defaultState,

    // state actions
    setMedicationInfo: (medicationInfo) => set(() => medicationInfo),
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
    toggleDisplayTimePicker: (id) =>
      set((state) => {
        const time = state.dosages.find((dosage) => dosage.id === id);
        time.displayTimePicker = !time.displayTimePicker;
      }),
    selectColor: (index) =>
      set((state) => {
        state.color = index;
      }),
    setStateValuesFromMedicationObject: (medication) =>
      set((state) => {
        state.name = medication.name;
        state.strength = String(medication.strength);
        state.strengthUnit = medication.strengthUnit;
        state.amount = medication.amount;
        state.amountUnit = medication.amountUnit;
        state.color = medication.color;
        state.condition = medication.condition;

        state.selectedFrequency = null;
        for (const frequency of state.frequencies) {
          // check deep equality on the two frequency objects
          if (deepEqual(medication.frequency, frequency.value)) {
            state.selectedFrequency = frequency.id;
            break;
          } else {
            // if the two frequency objects are not equal then assume it is a custom frequency
            state.selectedFrequency = 4; // custom frequency
            state.frequencies[4].value.interval = medication.frequency.interval;
            state.frequencies[4].value.intervalUnit =
              medication.frequency.intervalUnit;
            state.frequencies[4].value.weekdays = medication.frequency.weekdays;
          }
        }
        // set edit custom frequency route
        // this is a click through item
        state.frequencies[4].route = 'EditMedicationCustomFrequency';

        state.selectedDosages = [];
        for (const dosage of medication.dosages) {
          const reminderTime = dayjs(dosage.reminderTime);

          const firstInterval = morningInterval();
          const secondInterval = afternoonInterval();
          const thirdInterval = eveningInterval();

          // set the dosages based on the hour of the reminder time
          // state.dosages will have four values for morning, afternoon, evening, and nightime
          if (
            reminderTime.hour() >= firstInterval.lower.hour() &&
            reminderTime.hour() <= firstInterval.upper.hour()
          ) {
            state.dosages[0].value.reminderTime = reminderTime.toDate();
            state.dosages[0].value.dose = dosage.dose;
            state.dosages[0].value.sendReminder = dosage.sendReminder;
            state.dosages[0].value._id = dosage._id;
            state.selectedDosages.push(0);
          } else if (
            reminderTime.hour() >= secondInterval.lower.hour() &&
            reminderTime.hour() <= secondInterval.upper.hour()
          ) {
            state.dosages[1].value.reminderTime = reminderTime.toDate();
            state.dosages[1].value.dose = dosage.dose;
            state.dosages[1].value.sendReminder = dosage.sendReminder;
            state.dosages[1].value._id = dosage._id;
            state.selectedDosages.push(1);
          } else if (
            reminderTime.hour() >= thirdInterval.lower.hour() &&
            reminderTime.hour() <= thirdInterval.upper.hour()
          ) {
            state.dosages[2].value.reminderTime = reminderTime.toDate();
            state.dosages[2].value.dose = dosage.dose;
            state.dosages[2].value.sendReminder = dosage.sendReminder;
            state.dosages[2].value._id = dosage._id;
            state.selectedDosages.push(2);
          } else {
            state.dosages[3].value.reminderTime = reminderTime.toDate();
            state.dosages[3].value.dose = dosage.dose;
            state.dosages[3].value.sendReminder = dosage.sendReminder;
            state.dosages[3].value._id = dosage._id;
            state.selectedDosages.push(3);
          }
        }
      }),
    reset: () => set((state) => ({ ...state, ...defaultState })),
    setState: (fn) => set(produce(fn)),
  })),
);

export { useMedicationState };
