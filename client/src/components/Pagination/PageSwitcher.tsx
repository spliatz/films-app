import React, { useContext } from 'react';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';
import { Pagination } from '@mui/material';
import { PaginationContext } from '../../context/PaginationContext';
import { ScreenContext } from '../../context/ScreenContext';
import './PageSwitcher.scss';

const PageSwitcher = () => {
    const { page, setPage, pageCount } = useContext(PaginationContext);
    const { isMobile } = useContext(ScreenContext);

    const onSwitchPageHandler = (e: React.ChangeEvent<unknown>, page: number) => {
        setPage(page);
    };

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
                onChange={onSwitchPageHandler}
            />

            <Typography sx={{ fontSize: '18px' }}>
                {(pageCount !== 0 && page + ' of ' + pageCount) || 'страницы отсутствуют'}
            </Typography>
        </FormGroup>
    );
};

export default PageSwitcher;
