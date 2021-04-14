import produce from 'immer';
import { create, immer } from '.';
import apiCalls from '../utils/api-calls';

const defaultState = {
  notificationSettings: {
    silenceAll: false,
    hideMedName: true,
  },
  hasCaregiverContact: false,
  caregiverContact: {
    name: '',
    phoneNumber: '',
  },
};

const useSettings = create(
  immer((set, get) => ({
    ...defaultState,

    toggleCaregiverContact: () =>
      set((state) => {
        state.hasCaregiverContact = !state.hasCaregiverContact;
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
    setCaregiverContactName: (name) =>
      set((state) => {
        state.caregiverContact.name = name;
      }),
    setCaregiverContactPhoneNumber: (phoneNumber) =>
      set((state) => {
        state.caregiverContact.phoneNumber = phoneNumber;
      }),
    commit: async (token) => {
      const {
        notificationSettings,
        hasCaregiverContact,
        caregiverContact,
      } = get();
      const settings = {
        notificationSettings,
        hasCaregiverContact,
        caregiverContact,
      };

      await apiCalls.updateUserSettings(settings, token);
    },
    // state actions
    reset: () => set((state) => ({ ...state, ...defaultState })),
    setState: (fn) => set(produce(fn)),
  })),
);

export default useSettings;
