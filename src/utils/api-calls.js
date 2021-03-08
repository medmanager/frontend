import { Platform } from 'react-native';

// make sure the port is consistent with backend when testing
const PORT = '4000';
//10.0.2.2 maps to localhost on computer from android emulator
//***only works for android emulators***
//you must use the local ip address of your computer
const APIHOST =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:' + PORT
    : 'http://127.0.0.1:' + PORT;

export default {
  /**doesn't return a token yet, but will register user
   * all three fields: email, password, firstName, lastName are required
   * Example user:
   * user {
   *    email: "john@gmail.com",
   *    password: "123456789",
   *    firstName: "John"
   *    lastName: "Doe"
   * }
   */
  async registerUser(user) {
    const url = APIHOST + '/auth/register';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    return response.json();
  },

  /**returns a token based off a user's email
   * and password
   */
  async loginUser(email, password) {
    const url = APIHOST + '/login';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    return response.json();
  },

  /**verify that the given token is still valid
   * If the token is valid, resp will contain user information in this form
   * resp {
   *    isValid: true,
   *    verifiedJwt: {
   *        email: "john@gmail.com"
   *        _id: "asdlfjlsadjflaskdjfdsa"
   *    }
   * }
   */
  async verifyToken(token) {
    const url = APIHOST + '/auth/verify/' + token;
    const response = await fetch(url);
    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    return response.json();
  },

  /* adds a medication to the database
   * medication should be a javascript object
   * that will be stringified into a JSON object before
   * being send to the database
   * An example medication
   *  {
   *    name: "tylenol",
   *    notes: "Do not take with advil",
   *    dosage: 200,
   *    dosageUnits: "milligrams",
   *    amount: 100,
   *    amountUnits: "pills",
   *    frequency: {
   *      interval: 1,
   *      intervalUnit: "weeks",
   *      weekdays {
   *        monday: true,
   *        thursday: true
   *      }
   *    },
   *    dosages: [
   *    {
   *      dose: 1,
   *      sendReminder: true,
   *      reminderTime: 9am (date object)
   *    },
   *      medicationAmount: 1,
   *      sendReminder: true,
   *      reminderTime: 9pm (date object)
   *    ]
   *  }
   *
   *  To write out this scheduling example a sentence:
   *  Take Tylenol every week, twice a day on Monday and Thursday at 9am
   *  and 9pm
   *
   *  Note: if setReminder is false, you do NOT need to store a reminderTime
   */
  async addMedication(medication, token) {
    const url = APIHOST + '/medication';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + token,
      },
      body: JSON.stringify(medication),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  async getMedications(token) {
    const url = APIHOST + '/medication';
    const response = await fetch(url, {
      headers: {
        Authorization: 'JWT ' + token,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  async getMedicationFromID(medicationID, token) {
    const url = APIHOST + '/medication/' + medicationID;
    const response = await fetch(url, {
      headers: {
        Authorization: 'JWT ' + token,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  async updateMedicationFromID(medication, medicationID, token) {
    const url = APIHOST + '/medication/' + medicationID;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + token,
      },
      body: JSON.stringify(medication),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  async deleteMedicationFromID(medicationID, token) {
    const url = APIHOST + '/medication/' + medicationID;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: 'JWT ' + token,
      },
    });
    return response.json();
  },

  async getCalendarOccurrences(token) {
    const url = APIHOST + '/schedule/occurrences';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'JWT ' + token,
      },
      // body: JSON.stringify({ startDate, endDate }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  /*  returns a JSON array of 5 drug names similar to searchStr
   *  Ex: lisinop ->
   *  ["lysine","lisinopril","Lispro","Listenon","Lysinum"]
   */
  async searchAutoComplete(searchStr) {
    const url = APIHOST + '/medication/search/' + searchStr;
    const response = await fetch(url, {
      method: 'GET',
    });
    return response.json();
  },
};
