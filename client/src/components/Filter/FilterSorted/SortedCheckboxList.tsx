import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { dataCheckBox } from '../../../const';

function SortedCheckboxList() {
  return (
    <FormGroup sx={{ p: 1, Width: '100%' }}>
      {dataCheckBox.map((checkbox) => (
        <FormControlLabel
          key={checkbox.id}
          control={<Checkbox size="small" />}
          label={checkbox.name}
        />
      ))}
    </FormGroup>
  );
}

export default SortedCheckboxList;
