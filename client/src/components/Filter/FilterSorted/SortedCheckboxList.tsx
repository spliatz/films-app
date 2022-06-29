import React, { useContext } from 'react';
import { FilterContext } from '../../../context/FilterContext';

import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

function SortedCheckboxList() {
  const { filters, sortByCheckbox } = useContext(FilterContext);

  const handler = (e: React.SyntheticEvent<Element, Event>, checked: boolean, id: number) => {
    sortByCheckbox(id);
  };

  return (
    <FormGroup sx={{ p: 1, Width: '100%' }}>
      {filters.sortedCheckbox.map((checkbox) => {
        return (
          <FormControlLabel
            key={checkbox.id}
            control={<Checkbox size="small" />}
            label={checkbox.name}
            onChange={(e, checked) => handler(e, checked, checkbox.id)}
            checked={checkbox.checked}
          />
        );
      })}
    </FormGroup>
  );
}

export default SortedCheckboxList;
