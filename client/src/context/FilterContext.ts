import { createContext } from 'react';
import { Filters, FilterPopularity } from '../types';
import { dataCheckBox } from '../const';

const filters: Filters = {
  sortedByPopularity: FilterPopularity.PopularityDescending,
  sortedByYear: '2020',
  sortedCheckbox: dataCheckBox,
};

function pooh(filter: string) {}
function sortByCheckbox(id: number) {}
function reset() {}

export const FilterContext = createContext({
  filters: filters,
  sortByPopularity: pooh,
  sortByYear: pooh,
  sortByCheckbox: sortByCheckbox,
  reset: reset,
});
