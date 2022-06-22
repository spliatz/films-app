import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import React from 'react';

const releaseYears = [
  {
    value: 2022,
    label: 2022,
  },
  {
    value: 2021,
    label: 2021,
  },
];
function SortedSelect() {
  const [sortedValue, setSortedValue] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const handleChangeSorted = (event: any) => {
    console.log(event.target.value);
    setSortedValue(event.target.value as string);
  };
  const handleChangeYear = (event: any) => {
    setReleaseYear(event.target.value as string);
  };

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
          <MenuItem value={''}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={'descent'}>descending sort</MenuItem>
          <MenuItem value={'growth'}>sort by growth</MenuItem>
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
          <MenuItem value={''}>
            <em>None</em>
          </MenuItem>
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
