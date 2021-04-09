import Config from 'react-native-config';

// 10.0.2.2 maps to localhost on computer for android emulator
// 127.0.0.1 maps to localhost on computer for iOS emulator
// If using a physical device, you must use the ip address of your computer to access the backend
const API_URL = Config.API_URL;

console.log({ APIHOST: API_URL });

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
    const url = API_URL + '/auth/register';
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
    const url = API_URL + '/auth/login';
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
    const url = API_URL + '/auth/verify/' + token;
    const response = await fetch(url);
    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    return response.json();
  },

  /**register a device based off deviceInfo
   * ex: deviceInfo {
   *    token: "asdfasdfasdf"
   *    os: "ios" or "android"
   * }
   */
  async registerDevice(token, deviceInfo) {
    const url = API_URL + '/register/notifications';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + token,
      },
      body: JSON.stringify(deviceInfo),
    });
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
   *    condition: "Pain management",
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
   *      dose: 1,
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
    const url = API_URL + '/medication';
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

  async activateMedication(medicationID, token) {
    const url = API_URL + '/medication/' + medicationID + '/activate';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + token,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  async deactivateMedication(medicationID, token) {
    const url = API_URL + '/medication/' + medicationID + '/deactivate';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + token,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  async getMedications(token) {
    const url = API_URL + '/medication';
    const response = await fetch(url, {
      headers: {
        Authorization: 'JWT ' + token,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    return response.json();
  },

  async getMedicationFromID(medicationID, token) {
    const url = API_URL + '/medication/' + medicationID;
    const response = await fetch(url, {
      headers: {
        Authorization: 'JWT ' + token,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      console.log('Error in get medication');
      const error = await response.json();
      throw error;
    }
    return response.json();
  },

  async getOccurrenceFromID(occurrenceId, token) {
    const url = API_URL + '/schedule/occurrence/' + occurrenceId;
    const response = await fetch(url, {
      headers: {
        Authorization: 'JWT ' + token,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    return response.json();
  },

  async updateMedicationFromID(medication, medicationID, token) {
    const url = API_URL + '/medication/' + medicationID;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + token,
      },
      body: JSON.stringify(medication),
    });
    if (!response.ok) {
      console.log('Error in update medication');
      const error = await response.json();
      throw error;
    }
    return response.json();
  },

  async deleteMedicationFromID(medicationID, token) {
    const url = API_URL + '/medication/' + medicationID;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: 'JWT ' + token,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      console.log('Error in delete medication');
      const error = await response.json();
      throw error;
    }
    return response.json();
  },

  async getCalendarOccurrences(token) {
    const url = API_URL + '/schedule/occurrences';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'JWT ' + token,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    return response.json();
  },

  async getOccurrenceGroupFromID(occurrenceGroupId, token) {
    const url = API_URL + '/schedule/occurrenceGroup/' + occurrenceGroupId;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'JWT ' + token,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    return response.json();
  },

  /**
   * function to post new calendar occurrence
   * occurrence should look like this:
   * occurrence: {
   *    _id: asdf1234
   *    isTaken: true,
   *    timeTaken: Date(),
   *    //any other fields won't hurt, but aren't necessary
   * }
   */
  async takeCalendarOccurrence(occurrenceId, token) {
    const url = API_URL + '/schedule/occurrence/' + occurrenceId;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: 'JWT ' + token,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    const data = await response.json();
    return data;
  },

  /**
   * function to get compliance information for a user
   *
   * @returns array of objects where each object contains a medication id,
   * medication name, and a compliance value.
   * example: [
   * {
   *    medicationId: ObjectId
   *    name: String (name of medication)
   *    compliance: Number (float between 0 and 1 representing percentage of occurrences
   *                        taken over total number of occurrences within the last 30 days)
   * },
   * ]
   */
  async getTrackingInfo(token) {
    const url = API_URL + '/tracking';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'JWT ' + token,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    const data = await response.json();
    return data;
  },

  /**
   * Gets the current logged in user object
   * @param {string} token JWT token
   * @returns User with fields firstName, lastName, and email
   */
  async getCurrentUser(token) {
    const url = API_URL + '/getCurrentUser';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'JWT ' + token,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    const data = await response.json();
    return data;
  },

  /**
   * Update user settings
   * @param settings Updated settings
   * @param {string} token JWT token
   */
  async updateUserSettings(settings, token) {
    const url = API_URL + '/user/updateSettings';
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: 'JWT ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    });
    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    const data = await response.json();
    return data;
  },

  /**
   * Update user account settings
   * @param settings Updated settings
   * @param {string} token JWT token
   */
  async updateUserAccountSettings(settings, token) {
    const url = API_URL + '/user/update';
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: 'JWT ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    });
    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    const data = await response.json();
    return data;
  },

  /*  returns a JSON array of 5 drug names similar to searchStr
   *  Ex: lisinop ->
   *  ["lysine","lisinopril","Lispro","Listenon","Lysinum"]
   */
  async searchAutoComplete(searchStr) {
    const url = API_URL + '/medication/search/' + searchStr;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },
};
