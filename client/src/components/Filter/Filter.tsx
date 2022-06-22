import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SortedSelect from './FilterSorted/SortedSelect';
import SortedCheckboxList from './FilterSorted/SortedCheckboxList';

const Filter = () => {
  return (
    <Card sx={{ minWidth: 330, py: 3, px: 2, maxWidth: 380, height: '100%', width: '100%' }} className="filter">
      <Typography variant="h5" component="div">
        Filters:
      </Typography>
      <Button color="primary" sx={{ width: '100%' }}>
        Reset all filters
      </Button>
      <SortedSelect />
      <SortedCheckboxList />
    </Card>
  );
};

export default Filter;
