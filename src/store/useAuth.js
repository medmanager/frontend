import produce from 'immer';
import { create, immer } from '.';
import { removeToken, setToken } from '../utils';
import api from '../utils/api-calls';

const useAuth = create(
  immer((set, get) => ({
    // default state
    isLoading: true,
    isSignout: false,
    userToken: null,
    error: null,
    userId: null,

    // state actions
    restoreToken: async (token) => {
      // call backend to validate token
      const verifyResponse = await api.verifyToken(token);
      const tokenIsValid = verifyResponse.isValid;

      if (tokenIsValid) {
        set((state) => {
          state.userToken = token;
          state.isLoading = false;
          state.error = null;
          state.userId = verifyResponse.verifiedJwt._id;
        });
      } else {
        set((state) => {
          state.userToken = null;
          state.isLoading = false;
          state.isSignout = true;
          state.error = null;
        });
      }
    },
    signIn: async (email, password) => {
      let response = await api.loginUser(email, password);

      console.log('log in reponse:');
      console.log(response);

      if (response.error) {
        set((state) => {
          state.error = response.message;
        });
      } else {
        let token = response.token;
        console.log('got token:');
        console.log(token);
        await setToken(token); // perists the token

        set((state) => {
          state.userToken = token;
          state.isSignout = false;
          state.error = null;
          state.userId = response._id;
        });
      }
    },
    signUp: async (firstName, lastName, email, password) => {
      const { signIn } = get();
      const user = { firstName, lastName, email, password };
      const registerResponse = await api.registerUser(user);

      if (registerResponse.error) {
        console.log('error registering user');
      }
      console.log('register response:');
      console.log(registerResponse);

      // call the sign in action defined above
      signIn(email, password);
    },
    signOut: async () => {
      await removeToken();

      set((state) => {
        state.isSignout = true;
        state.userToken = null;
      });
    },
    setState: (fn) => set(produce(fn)),
  })),
);

export { useAuth };
