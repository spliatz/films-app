import { ActionTest } from '../types';

export const test = (state = [], action: ActionTest) => {
  switch (action.type) {
    case 'OK':
      return [...state, 'ok'];
    case 'NO':
      return [...state, 'no'];
    default:
      return state;
  }
};
