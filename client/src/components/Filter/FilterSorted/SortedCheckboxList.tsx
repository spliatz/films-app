import React, { useContext } from 'react';
import { useAuth } from '../../../hooks/auth.hook';

import { FilterContext } from '../../../context/FilterContext';
import { AuthPopupContext } from '../../../context/AuthPopup';

import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

function SortedCheckboxList() {
  const { filters, sortByCheckbox } = useContext(FilterContext);
  const { open } = useContext(AuthPopupContext);

  const { isAuth } = useAuth();

  const handler = (e: React.SyntheticEvent<Element, Event>, checked: boolean, id: number) => {
    if (!isAuth && (id === 0 || id === 1)) return open();
    sortByCheckbox(id);
  };

  const favouriteID = 0;
  const watchLaterID = 1;

  return (
    <FormGroup sx={{ p: 1, Width: '100%' }}>
      {filters.sortedCheckbox.map((checkbox) => {
        if (!isAuth && (checkbox.id === favouriteID || checkbox.id === watchLaterID)) return null;

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
