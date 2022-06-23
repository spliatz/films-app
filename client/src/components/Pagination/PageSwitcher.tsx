import React, { useContext } from 'react';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';
import { Pagination } from '@mui/material';
import { PaginationContext } from '../../context/PaginationContext';
import { ScreenContext } from '../../context/ScreenContext';
import './PageSwitcher.scss';

const PageSwitcher = () => {
  const { page, switchPage } = useContext(PaginationContext);
  const { isMobile } = useContext(ScreenContext);

  const pageCount = 24;

  return (
    <FormGroup
      sx={{
        p: 1,
        minWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '20px',
      }}
    >
      <Pagination
        count={pageCount}
        size={isMobile ? 'large' : 'medium'}
        page={page}
        onChange={switchPage}
      />

      <Typography sx={{ fontSize: '18px' }}>
        {page} of {pageCount}
      </Typography>
    </FormGroup>
  );
};

export default PageSwitcher;
