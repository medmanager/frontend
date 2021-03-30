import produce from 'immer';
import { create, immer } from '.';
import apiCalls from '../utils/api-calls';

const defaultState = {
  notificationSettings: {
    silenceAll: false,
    hideMedName: true,
  },
  hasEmergencyContact: false,
  emergencyContact: {
    name: '',
    phoneNumber: '',
  },
};

const useSettings = create(
  immer((set, get) => ({
    ...defaultState,

    toggleEmergencyContact: () =>
      set((state) => {
        state.hasEmergencyContact = !state.hasEmergencyContact;
      }),
    toggleSilenceAllNotifications: () =>
      set((state) => {
        state.notificationSettings.silenceAll = !state.notificationSettings
          .silenceAll;
      }),
    toggleHideMedName: () =>
      set((state) => {
        state.notificationSettings.hideMedName = !state.notificationSettings
          .hideMedName;
      }),
    setEmergencyContactName: (name) =>
      set((state) => {
        state.emergencyContact.name = name;
      }),
    setEmergencyContactPhoneNumber: (phoneNumber) =>
      set((state) => {
        state.emergencyContact.phoneNumber = phoneNumber;
      }),
    commit: async (token) => {
      const {
        notificationSettings,
        hasEmergencyContact,
        emergencyContact,
      } = get();
      const settings = {
        notificationSettings,
        hasEmergencyContact,
        emergencyContact,
      };

      console.log('updating settings...');
      console.log('new settings:');
      console.log({ settings });
      await apiCalls.updateUserSettings(settings, token);
    },
    // state actions
    reset: () => set((state) => ({ ...state, ...defaultState })),
    setState: (fn) => set(produce(fn)),
  })),
);

export default useSettings;
