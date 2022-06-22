import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { dataCheckBox } from '../../../const';

function SortedCheckboxList() {
  const [page, setPage] = useState(1);
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const pageCount = 1400;

  return (
    <>
      <FormGroup sx={{ p: 1, Width: '100%' }}>
        {dataCheckBox.map((checkbox, index) => (
          <FormControlLabel
            key={checkbox.id}
            control={<Checkbox size="small" />}
            label={checkbox.name}
          />
        ))}
      </FormGroup>
      <FormGroup sx={{ p: 1, minWidth: '100%' }}>
        <Pagination count={pageCount} size="small" sx={{ marginBottom: '15px' }} />
        <Typography sx={{ m: 'auto' }}>
          {page} of {pageCount}
        </Typography>
      </FormGroup>
    </>
  );
}

export default SortedCheckboxList;
