import SensitiveInfo from 'react-native-sensitive-info';
import { days, KEYCHAIN_SERVICE, SHARED_PERFS, TOKEN_KEY } from './constants';

export { colors as Colors } from './colors';
export * from './constants';

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

export const nthDay = (date) => {
  const num = Math.max(Math.floor(date.getDate() / 7), 1);
  return num + nth(num) + ' ' + capitalize(days[date.getDay()]);
};

export const range = (num) =>
  Array(num)
    .fill(1)
    .map((x, y) => x + y);

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const formatTime = (time) => {
  let hours = time.getHours();
  let minutes = time.getMinutes();
  return (
    (hours > 12 ? hours - 12 : hours).toString() +
    ':' +
    (minutes.toString().length < 2
      ? '0' + minutes.toString()
      : minutes.toString()) +
    (hours > 12 ? ' PM' : ' AM')
  );
};

export const getSelectedDays = (frequency) =>
  Object.entries(frequency.weekdays || {})
    .filter(([key, value]) => !!value) // only get days which are marked as true
    .map(([key, value]) => key);

export const getStatusText = (frequency) => {
  if (frequency.intervalUnits === 'days') {
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

const keyChainOptions = {
  sharedPreferencesName: SHARED_PERFS,
  keychainService: KEYCHAIN_SERVICE,
};

export async function getSensitiveItem(key) {
  const value = await SensitiveInfo.getItem(key, keyChainOptions);
  return value ? value : null;
}

export async function setSensitiveItem(key, value) {
  return SensitiveInfo.setItem(key, value, keyChainOptions);
}

export async function removeSensitiveItem(key) {
  return SensitiveInfo.deleteItem(key, keyChainOptions);
}

export const getToken = () => getSensitiveItem(TOKEN_KEY);

export const removeToken = () => removeSensitiveItem(TOKEN_KEY);

export const setToken = (value) => setSensitiveItem(TOKEN_KEY, value);
