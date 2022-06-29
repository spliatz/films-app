import { createContext } from 'react';
import { Filters, FilterPopularity, UserFilter } from '../types';
import { dataCheckBox } from '../const';

const filters: Filters = {
  sortedByPopularity: FilterPopularity.PopularityDescending,
  sortedByYear: '2020',
  sortedCheckbox: dataCheckBox,
  userFilters: UserFilter.DEFAULT,
};

function pooh(filter: string) {}
function sortByCheckbox(id: number) {}
function reset() {}

export const FilterContext = createContext({
  filters: filters,
  sortByPopularity: pooh,
  sortByYear: pooh,
  sortByUserFilter: pooh,
  sortByCheckbox: sortByCheckbox,
  reset: reset,
});
