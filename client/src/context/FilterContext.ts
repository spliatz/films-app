import { createContext } from 'react';
import { Filters } from '../types';
import { FilterPopularity } from '../types';

const filters: Filters = {
  sortedByPopularity: FilterPopularity.PopularityDescending,
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
