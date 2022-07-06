import React, { useContext } from 'react';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';
import { Pagination } from '@mui/material';
import { ScreenContext } from '../../../context/ScreenContext';
import './PageSwitcher.scss';

interface Props {
    page: number;
    setPage: (n: number) => void;
    totalPages: number;
}

const PageSwitcher: React.FC<Props> = ({page, setPage, totalPages}) => {
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
                count={totalPages}
                size={isMobile ? 'large' : 'medium'}
                page={page}
                onChange={onSwitchPageHandler}
            />

            <Typography sx={{ fontSize: '18px' }}>
                {(totalPages !== 0 && page + ' of ' + totalPages) || 'страницы отсутствуют'}
            </Typography>
        </FormGroup>
    );
};

export default PageSwitcher;
