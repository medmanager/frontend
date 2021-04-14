import produce from 'immer';
import { create, immer } from '.';

const useCalendar = create(
  immer((set, get) => ({
    // default state
    startDate: null,
    endDate: null,
    selectedDay: null,

    // state actions
    setState: (fn) => set(produce(fn)),
  })),
);

export { useCalendar };
