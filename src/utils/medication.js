import dayjs from 'dayjs';
import { capitalize, days } from '.';

export const frequencyRadioInputChoices = () => {
  const now = new Date();
  return [
    {
      id: 0,
      type: 'RadioButton',
      label: 'Daily',
      value: {
        interval: 1,
        intervalUnit: 'days',
        weekdays: {
          sunday: false,
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
        },
      },
    },
    {
      id: 1,
      type: 'RadioButton',
      label: `Weekly (${capitalize(days[now.getDay()])})`,
      value: {
        interval: 1,
        intervalUnit: 'weeks',
        weekdays: {
          sunday: false,
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
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
        intervalUnit: 'weeks',
        weekdays: {
          sunday: false,
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
          [days[now.getDay()]]: true,
        },
      },
    },
    {
      id: 3,
      type: 'RadioButton',
      label: 'Monthly',
      value: {
        interval: 4,
        intervalUnit: 'weeks',
        weekdays: {
          sunday: false,
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
          [days[now.getDay()]]: true,
        },
      },
    },
    {
      id: 4,
      type: 'RadioButtonClickThrough',
      label: (value, selected) =>
        `Custom ${
          selected ? `(${capitalize(getFrequencyStatusText(value))})` : ''
        }`,
      route: 'AddMedicationCustomFrequency',
      value: {
        interval: 1,
        intervalUnit: 'days',
        weekdays: {
          sunday: false,
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
          [days[now.getDay()]]: true, // enable current day by default
        },
      },
    },
  ];
};

export const dosageMultiSelectChoices = () => {
  const now = new Date();
  now.setMinutes(0);
  return [
    {
      id: 0,
      label: 'Morning',
      displayTimePicker: false,
      value: {
        dose: 1,
        sendReminder: true,
        reminderTime: new Date(now.setHours(8)),
      },
    },
    {
      id: 1,
      label: 'Afternoon',
      displayTimePicker: false,
      value: {
        dose: 1,
        sendReminder: true,
        reminderTime: new Date(now.setHours(12)),
      },
    },
    {
      id: 2,
      label: 'Evening',
      displayTimePicker: false,
      value: {
        dose: 1,
        sendReminder: true,
        reminderTime: new Date(now.setHours(16)),
      },
    },
    {
      id: 3,
      label: 'Night',
      displayTimePicker: false,
      value: {
        dose: 1,
        sendReminder: true,
        reminderTime: new Date(now.setHours(20)),
      },
    },
  ];
};

/**
 * Gets an array of the selected days (as strings) from a frequency object
 * @param {*} frequency Frequency object
 */
export const getSelectedDays = (frequency) =>
  Object.entries(frequency.weekdays || {})
    .filter(([key, value]) => days.includes(key) && !!value) // only get days which are marked as true
    .map(([key, value]) => key);

/**
 * Gets a human-readable status string from a frequency object
 * @param {*} frequency Medication frequency
 */
export const getFrequencyStatusText = (frequency) => {
  if (frequency.intervalUnit === 'days') {
    if (frequency.interval === 1) {
      return 'every day';
    } else {
      return `every ${frequency.interval} days`;
    }
  } else {
    const selectedDays = getSelectedDays(frequency);
    const selectedDaysShort = selectedDays.map((day) =>
      capitalize(day).substring(0, 3),
    );

    if (frequency.interval === 1) {
      return `weekly on ${selectedDaysShort.join(', ')}`;
    } else {
      return `every ${frequency.interval} weeks on ${selectedDaysShort.join(
        ', ',
      )}`;
    }
  }
};

export const getDosageTimesString = (medication) =>
  medication.dosages
    .sort((a, b) => a.reminderTime - b.reminderTime)
    .map(
      (dosage) =>
        `${dosage.dose} ${medication.amountUnit} at ${dayjs(
          dosage.reminderTime,
        ).format('h:mm A')}`,
    )
    .join(', ');
