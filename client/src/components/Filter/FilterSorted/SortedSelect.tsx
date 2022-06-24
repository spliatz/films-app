import React, { useContext, useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { FilterContext } from '../../../context/FilterContext';
import { releaseYears } from '../../../const';
import { FilterPopularity } from '../../../types';

function SortedSelect() {
  const [sortedValue, setSortedValue] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const { sortByPopularity, sortByYear, filters } = useContext(FilterContext);

  const handleChangeSorted = (event: any) => {
    const value = event.target.value as string;
    sortByPopularity(value);
  };

  const handleChangeYear = (event: any) => {
    const value = event.target.value as string;
    sortByYear(value);
  };

  useEffect(() => {
    const sortedByPop = filters.sortedByPopularity;
    !!sortedByPop
      ? setSortedValue(sortedByPop)
      : setSortedValue(FilterPopularity.PopularityDescending);

    const sortedByYear = filters.sortedByYear;
    !!sortedByYear ? setReleaseYear(sortedByYear) : setReleaseYear('2020');
  }, [filters]);

  return (
    <>
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
