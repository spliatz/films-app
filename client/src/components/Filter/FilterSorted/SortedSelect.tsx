import React, { useContext, useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { FilterContext } from '../../../context/FilterContext';
import { releaseYears, defaultRelease } from '../../../const';
import { FilterPopularity, UserFilter } from '../../../types';
import { useAuth } from '../../../hooks/auth.hook';

function SortedSelect() {
  const [sortedValue, setSortedValue] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [userFilter, setUserFilter] = useState('');
  const { sortByPopularity, sortByYear, sortByUserFilter, filters } = useContext(FilterContext);
  const { isAuth } = useAuth();

  const handleChangeSorted = (event: any) => {
    const value = event.target.value as string;
    sortByPopularity(value);
  };

  const handleChangeYear = (event: any) => {
    const value = event.target.value as string;
    sortByYear(value);
  };

  const handleUserFilter = (event: any) => {
    const value = event.target.value as string;
    sortByUserFilter(value);
  };

  useEffect(() => {
    const sortedByPop = filters.sortedByPopularity;
    !!sortedByPop
      ? setSortedValue(sortedByPop)
      : setSortedValue(FilterPopularity.PopularityDescending);

    const sortedByYear = filters.sortedByYear;
    !!sortedByYear ? setReleaseYear(sortedByYear) : setReleaseYear(defaultRelease);

    const sortedByUserFilter = filters.userFilters;
    !!sortedByUserFilter ? setUserFilter(sortedByUserFilter) : setUserFilter(UserFilter.DEFAULT);
  }, [filters]);

  return (
    <>
      {isAuth && (
        <FormControl sx={{ p: 1, minWidth: '100%' }}>
          <TextField
            label="User Filters:"
            select
            value={userFilter}
            onChange={handleUserFilter}
            size="small"
            defaultValue="choose"
            id="select-user"
          >
            <MenuItem value={UserFilter.DEFAULT}>Default</MenuItem>
            <MenuItem value={UserFilter.FAVOURITE}>Favourite</MenuItem>
            <MenuItem value={UserFilter.WATCH_LATER}>Watch Later</MenuItem>
          </TextField>
        </FormControl>
      )}

      <FormControl sx={{ p: 1, minWidth: '100%' }}>
        <TextField
          label="Sorted by:"
          select
          value={sortedValue}
          onChange={handleChangeSorted}
          size="small"
          defaultValue="choose"
          id="select-sorted"
        >
          <MenuItem value={FilterPopularity.PopularityDescending}>Популярные по убыванию</MenuItem>
          <MenuItem value={FilterPopularity.PopularityAscending}>
            Популярные по возрастанию
          </MenuItem>
          <MenuItem value={FilterPopularity.RateDescending}>Рейтинг по убыванию</MenuItem>
          <MenuItem value={FilterPopularity.RateAscending}>Рейтинг по возрастанию</MenuItem>
        </TextField>
      </FormControl>

      <FormControl sx={{ p: 1, minWidth: '100%' }}>
        <TextField
          id="select-year"
          label="Year of release:"
          select
          value={releaseYear}
          onChange={handleChangeYear}
          size="small"
        >
          <MenuItem value={defaultRelease}>All</MenuItem>
          {releaseYears.map((year) => (
            <MenuItem key={year.value} value={year.value}>
              {year.label}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
    </>
  );
}

export default SortedSelect;
