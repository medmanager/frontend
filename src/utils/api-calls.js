// make sure the port is consistent with backend when testing
const PORT = '4000';
//10.0.2.2 maps to localhost on computer from android emulator
//***only works for android emulators***
//you must use the local ip address of your computer
const APIHOST = 'http://192.168.1.141:' + PORT;

export default {
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
   *    times: [
   *    {
   *      medicationAmount: 1,
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
  async addMedication(medication) {
    const url = APIHOST + '/medication';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(medication),
      });
      const resp = response.json();
      return { isError: false, response: resp };
    } catch (error) {
      return { isError: true, error: error };
    }
  },

  async getMedications() {
    const url = APIHOST + '/medication';
    try {
      const response = await fetch(url);
      return response.json();
    } catch (error) {
      return error;
    }
  },

  async getMedicationFromID(medicationID) {
    const url = APIHOST + '/medication/' + medicationID;
    try {
      const response = await fetch(url);
      return response.json();
    } catch (error) {
      return error;
    }
  },

  async updateMedicationFromID(medication, medicationID) {
    const url = APIHOST + '/medication/' + medicationID;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(medication),
      });
      return response.json();
    } catch (error) {
      return error;
    }
  },

  async deleteMedicationFromID(medicationID) {
    const url = APIHOST + '/medication/' + medicationID;
    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });
      return response.json();
    } catch (error) {
      return error;
    }
  },

  /*  returns a JSON array of 5 drug names similar to searchStr
   *  Ex: lisinop ->
   *  ["lysine","lisinopril","Lispro","Listenon","Lysinum"]
   */
  async searchAutoComplete(searchStr) {
    const url = APIHOST + '/medication/search/' + searchStr;
    try {
      const response = await fetch(url, {
        method: 'GET',
      });
      return response.json();
    } catch (error) {
      return error;
    }
  },
};
