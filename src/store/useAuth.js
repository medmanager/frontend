import produce from 'immer';
import { create, immer } from '.';

const useAuth = create(
  immer((set) => ({
    // default state
    isLoading: true,
    isSignout: false,
    userToken: null,

    // state actions
    restoreToken: (token) => {
      // call backend to validate token

      let tokenIsValid = true;

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
    signIn: (data) => {
      // call backend with sign in data

      let token;

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
