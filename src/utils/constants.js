import dayjs from 'dayjs';

export const MIN_SEARCH_QUERY_LENGTH = 2;

export const days = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

export const months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

export const strengthUnitChoices = [
  { value: 'mg', label: 'mg' },
  { value: 'g', label: 'grams' },
  { value: 'IU', label: 'IU' },
  { value: 'mcg', label: 'mcg' },
  { value: 'mcg/hr', label: 'mcg/hr' },
  { value: 'mcg/ml', label: 'mcg/ml' },
  { value: 'mEq', label: 'mEq' },
  { value: 'mg/g', label: 'mg/g' },
  { value: 'mg/ml', label: 'mg/ml' },
  { value: 'mL', label: 'mL' },
  { value: '%', label: '%' },
];

export const amountUnitChoices = [
  {
    value: 'tablets',
    label: 'Tablets',
  },
  {
    value: 'capsules',
    label: 'Capsules',
  },
  {
    value: 'sprays',
    label: 'Sprays',
  },
  {
    value: 'gummies',
    label: 'Gummies',
  },
  {
    value: 'tbsp',
    label: 'Tablespoons',
  },
  {
    value: 'injections',
    label: 'Injections',
  },
];

export const dayChoices = [
  {
    value: 'monday',
    label: 'Monday',
  },
  {
    value: 'tuesday',
    label: 'Tuesday',
  },
  {
    value: 'wednesday',
    label: 'Wednesday',
  },
  {
    value: 'thursday',
    label: 'Thursday',
  },
  {
    value: 'friday',
    label: 'Friday',
  },
  {
    value: 'saturday',
    label: 'Saturday',
  },
  {
    value: 'sunday',
    label: 'Sunday',
  },
];

export const morningInterval = (now = new Date()) => ({
  lower: dayjs(now).hour(0).minute(0),
  upper: dayjs(now).hour(9).minute(59),
});
export const afternoonInterval = (now = new Date()) => ({
  lower: dayjs(now).hour(10).minute(0),
  upper: dayjs(now).hour(14).minute(59),
});
export const eveningInterval = (now = new Date()) => ({
  lower: dayjs(now).hour(15).minute(0),
  upper: dayjs(now).hour(19).minute(59),
});

/**
 * Used for storing the auth token
 */
export const TOKEN_KEY = 'token';

/**
 * Used for storing the device token for notifications
 */
export const DEVICE_TOKEN_KEY = 'deviceToken';

/**
 * Both these are used for storing sensitive info on the device
 */
export const SHARED_PERFS = 'MedManagerSharedPerfs';
export const KEYCHAIN_SERVICE = 'MedManagerAppKeychain';
