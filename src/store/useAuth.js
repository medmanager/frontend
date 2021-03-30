import produce from 'immer';
import { Platform } from 'react-native';
import { create, immer } from '.';
import { getDeviceToken, removeToken, setToken } from '../utils';
import api from '../utils/api-calls';

const defaultState = {
  isSignout: false,
  userToken: null,
  error: null,
  userId: null,
};

const useAuth = create(
  immer((set, get) => ({
    // default state
    ...defaultState,

    // state actions
    restoreToken: async (token) => {
      // call backend to validate token
      try {
        const verifyResponse = await api.verifyToken(token);
        const tokenIsValid = verifyResponse.isValid;

        if (tokenIsValid) {
          set((state) => {
            state.userToken = token;
            state.error = null;
            state.userId = verifyResponse.verifiedJwt._id;
          });
        } else {
          set((state) => {
            state.userToken = null;
            state.isSignout = true;
            state.error = null;
          });
        }
      } catch (ignore) {}
    },
    signIn: async (email, password) => {
      try {
        let response = await api.loginUser(email, password);
        let token = response.token;
        await setToken(token); // persists the token
        const deviceToken = await getDeviceToken();
        const deviceOS = Platform.OS;
        const deviceInfo = {
          token: deviceToken,
          os: deviceOS,
        };
        await api.registerDevice(token, deviceInfo);
        set((state) => {
          state.userToken = token;
          state.isSignout = false;
          state.error = null;
          state.userId = response._id;
        });
      } catch (err) {
        set((state) => {
          state.error = err.message;
        });
      }
    },
    signUp: async (firstName, lastName, email, password) => {
      const { signIn } = get();
      const user = { firstName, lastName, email, password };

      try {
        const registerResponse = await api.registerUser(user);
        console.log('register response:');
        console.log(registerResponse);

        // call the sign in action defined above
        await signIn(email, password);
      } catch (err) {
        set((state) => {
          state.error = err.message;
        });
      }
    },
    signOut: async () => {
      await removeToken();

      set((state) => {
        state.isSignout = true;
        state.userToken = null;
      });
    },
    resetState: () => set((state) => ({ ...state, ...defaultState })),
    setState: (fn) => set(produce(fn)),
  })),
);

export { useAuth };
