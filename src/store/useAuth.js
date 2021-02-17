import produce from 'immer';
import { create, immer } from '.';
import api from '../utils/api-calls';

const useAuth = create(
  immer((set) => ({
    // default state
    isLoading: true,
    isSignout: false,
    userToken: null,

    // state actions
    restoreToken: async (token) => {
      // call backend to validate token
      let resp = await api.verifyToken(token);

      let tokenIsValid = resp.isValid;

      if (tokenIsValid) {
        set((state) => {
          state.userToken = token;
          state.isLoading = false;
        });
      } else {
        // set error state or
        // require the user to login again?
      }
    },
    signIn: async (email, password) => {
      let resp = await api.loginUser(email, password);

      let token = resp.token;

      set((state) => {
        state.userToken = token;
        state.isSignout = false;
      });
    },
    signOut: () => {
      // call backend to sign out

      set((state) => {
        state.isSignout = true;
        state.userToken = null;
      });
    },
    setState: (fn) => set(produce(fn)),
  })),
);

export { useAuth };
