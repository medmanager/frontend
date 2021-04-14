import produce from 'immer';
import { QueryClient } from 'react-query';
import create from 'zustand';

const log = (config) => (set, get, api) =>
  config(
    (args) => {
      console.log('  applying', args);
      set(args);
      console.log('  new state', get());
    },
    get,
    api,
  );

// Turn the store set method into an immer proxy (immutable state)
const immer = (config) => (set, get, api) =>
  config((fn) => set(produce(fn)), get, api);

// query client for keeping track of server state
const queryClient = new QueryClient();

export { log, immer, create, queryClient };
