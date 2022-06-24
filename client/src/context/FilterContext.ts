import { createContext } from 'react';
import { Filters } from '../types';

const filters: Filters = {
  sortedByPopularity: 'PopularityDescending',
  sortedByYear: '2020',
};

function pooh(filter: string) {}
function reset() {}

export const FilterContext = createContext({
  filters: filters,
  sortByPopularity: pooh,
  sortByYear: pooh,
  reset: reset,
});
