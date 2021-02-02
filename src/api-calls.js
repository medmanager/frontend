// make sure the port is consistent with backend when testing
const PORT = '4000';
//10.0.2.2 maps to localhost on computer from android emulator
//***only works for android emulators***
//you must use the local ip address of your computer
const APIHOST = 'http://10.0.2.2:' + PORT;

export default {
  async addMedication(medication) {
    const url = APIHOST + '/medication';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(medication)
      });
      return response.json();
    } catch(error) {
      return error;
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
        body: JSON.stringify(medication)
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
        method: 'DELETE'
      });
      return response.json();
    } catch (error) {
      return error;
    }
  }
}