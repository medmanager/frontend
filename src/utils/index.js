import SensitiveInfo from 'react-native-sensitive-info';
import { colors as Colors } from './colors';
import {
  days,
  DEVICE_TOKEN_KEY,
  KEYCHAIN_SERVICE,
  SHARED_PERFS,
  TOKEN_KEY,
} from './constants';

export { colors as Colors } from './colors';
export * from './constants';

/**
 * Gets the string which should come after a day of the month
 * @param {Number} day Day of the month
 */
export const nth = (day) => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

/**
 * Gets the nth day of the month
 * @param {Date} date Date to compute the nth day from
 */
export const nthDay = (date) => {
  const num = Math.max(Math.floor(date.getDate() / 7), 1);
  return num + nth(num) + ' ' + capitalize(days[date.getDay()]);
};

/**
 * Gets an array of sequential numbers from [1-num]
 * @param {Number} num Max number in the array
 */
export const range = (num) =>
  Array(num)
    .fill(1)
    .map((x, y) => x + y);

/**
 * Capitalizes the first letter of a string
 * @param {*} str String
 */
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Recursively check equality between two objects
 * @param {*} first
 * @param {*} second
 * @param {String[]} invalidKeys List of invalid object keys to consider when comparing
 * @returns true or false
 */
export const deepEqual = (first, second, invalidKeys = ['_id']) => {
  const filterFn = (key) => !invalidKeys.includes(key);

  const firstType = typeof first,
    secondType = typeof second;

  // both are arrays
  if (
    Array.isArray(first) &&
    Array.isArray(second) &&
    first.length === second.length
  ) {
    return first.every((obj, idx) => deepEqual(obj, second[idx], invalidKeys));
  }

  // first is Date, second is date string
  if (
    firstType === 'object' &&
    first instanceof Date &&
    secondType === 'string'
  ) {
    return first.getTime() === new Date(second).getTime();
  }

  // first is Date, second is also Date
  if (
    firstType === 'object' &&
    firstType === secondType &&
    first instanceof Date &&
    second instanceof Date
  ) {
    return first.getTime() === second.getTime();
  }

  // both are objects
  if (firstType === 'object' && firstType === secondType) {
    return (
      Object.keys(first).filter(filterFn).length ===
        Object.keys(second).filter(filterFn).length &&
      Object.keys(first)
        .filter(filterFn)
        .every((key) => deepEqual(first[key], second[key], invalidKeys))
    );
  }

  return first === second;
};

/**
 * Used when configuring React Navigation
 */
export const defaultNavigatorScreenOptions = {
  headerTintColor: 'white',
  headerStyle: { backgroundColor: Colors.blue[500] },
  headerBackTitle: '',
  statusBarAnimation: 'slide',
  headerTopInsetEnabled: false,
};

/**
 * Used for storing sensitive info to the device
 */
const keyChainOptions = {
  sharedPreferencesName: SHARED_PERFS,
  keychainService: KEYCHAIN_SERVICE,
};

/**
 * Gets a sensitive item from storage
 * @param {String} key Storage item key
 */
export async function getSensitiveItem(key) {
  const value = await SensitiveInfo.getItem(key, keyChainOptions);
  return value ? value : null;
}

/**
 * Stores a sensitive item to storage
 * @param {String} key Storage item key
 * @param {*} value Storage item value
 */
export async function setSensitiveItem(key, value) {
  return SensitiveInfo.setItem(key, value, keyChainOptions);
}

/**
 * Removes a sensitive item from storage
 * @param {String} key Storage item key
 */
export async function removeSensitiveItem(key) {
  return SensitiveInfo.deleteItem(key, keyChainOptions);
}

export const getDeviceToken = () => getSensitiveItem(DEVICE_TOKEN_KEY);

export const setDeviceToken = (value) =>
  setSensitiveItem(DEVICE_TOKEN_KEY, value);

export const getToken = () => getSensitiveItem(TOKEN_KEY);

export const removeToken = () => removeSensitiveItem(TOKEN_KEY);

export const setToken = (value) => setSensitiveItem(TOKEN_KEY, value);
