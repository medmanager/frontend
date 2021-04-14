import produce from 'immer';
import { create, immer } from '.';
import apiCalls from '../utils/api-calls';

const defaultState = {
  firstName: '',
  lastName: '',
  email: '',
};

const useAccountSettings = create(
  immer((set, get) => ({
    ...defaultState,

    setFirstName: (name) =>
      set((state) => {
        state.firstName = name;
      }),
    setLastName: (name) =>
      set((state) => {
        state.lastName = name;
      }),
    setEmail: (email) =>
      set((state) => {
        state.email = email;
      }),
    commit: async (token) => {
      const { firstName, lastName, email } = get();
      const accountSettings = {
        firstName,
        lastName,
        email,
      };

      try {
        await apiCalls.updateUserAccountSettings(accountSettings, token);
      } catch (ignored) {}
    },
    // state actions
    reset: () => set((state) => ({ ...state, ...defaultState })),
    setState: (fn) => set(produce(fn)),
  })),
);

export default useAccountSettings;
