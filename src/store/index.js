import produce from 'immer';
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

// Turn the set method into an immer proxy
const immer = (config) => (set, get, api) =>
  config((fn) => set(produce(fn)), get, api);

export { log, immer, create };
