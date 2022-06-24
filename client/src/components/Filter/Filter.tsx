import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SortedSelect from './FilterSorted/SortedSelect';
import SortedCheckboxList from './FilterSorted/SortedCheckboxList';
import { ScreenContext } from '../../context/ScreenContext';
import PageSwitcher from '../Pagination/PageSwitcher';
import { FilterContext } from '../../context/FilterContext';

const Filter = () => {
  const { isMobile } = useContext(ScreenContext);
  const { reset } = useContext(FilterContext);

  const resetHandler = () => {
    reset();
  };

  return (
    <Card
      sx={{
        minWidth: 395,
        py: 3,
        px: 2,
        maxWidth: 400,
      }}
      style={{
        boxShadow: '0px 0px 21px 5px rgba(16, 32, 45, 0.2)',
        height: '100%',
        width: '100%',
        alignSelf: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'sticky',
        top: 0,
      }}
    >
      <Typography variant="h5" component="div">
        Filters:
      </Typography>
      <Button color="primary" sx={{ width: '100%' }} onClick={resetHandler}>
        Reset all filters
      </Button>
      <SortedSelect />
      <SortedCheckboxList />
      {!isMobile && <PageSwitcher />}
    </Card>
  );
};

export default Filter;
