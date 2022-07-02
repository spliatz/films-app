import React from 'react';

import { ISearchForm, RateEnum, PopularityEnum } from '../../types';
import { dataCheckBox } from '../../const';

import {
    Radio,
    RadioGroup,
    TextField,
    FormGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    MenuItem,
} from '@mui/material';

import './SearchForm.scss';

interface Props {
    form: ISearchForm;
    setForm: React.Dispatch<ISearchForm>;
    pickFilm: () => void | undefined;
}

const SearchForm: React.FC<Props> = ({ form, setForm, pickFilm }) => {
    const genreHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const obj = { ...form };
        obj.genre = Number(e.target.value);
        setForm({ ...obj });
    };

    const rateHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const obj = { ...form };
        obj.rate = e.target.value;
        setForm({ ...obj });
    };

    const popularityHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const obj = { ...form };
        obj.popularity = e.target.value;
        setForm({ ...obj });
    };

    return (
        <div className="search-form">
            <FormGroup>
                <TextField
                    label="Выбрать жанр"
                    select
                    value={form.genre || ''}
                    onChange={genreHandler}
                    size="small"
                    defaultValue="choose"
                    id="select-sorted"
                >
                    {dataCheckBox.map((item) => {
                        return (
                            <MenuItem key={item.id} value={item.id}>
                                {item.name}
                            </MenuItem>
                        );
                    })}
                </TextField>
            </FormGroup>

            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Rate</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue=""
                    name="radio-buttons-group"
                    onChange={rateHandler}
                >
                    <FormControlLabel value={RateEnum.HIGH} control={<Radio />} label="High" />
                    <FormControlLabel value={RateEnum.LOW} control={<Radio />} label="Low" />
                </RadioGroup>
            </FormControl>

            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Popularity</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue=""
                    name="radio-buttons-group"
                    onChange={popularityHandler}
                >
                    <FormControlLabel
                        value={PopularityEnum.HIGH}
                        control={<Radio />}
                        label="High"
                    />
                    <FormControlLabel value={PopularityEnum.LOW} control={<Radio />} label="Low" />
                </RadioGroup>
            </FormControl>

            <button className="submit-btn" onClick={pickFilm}>
                Подобрать фильм
            </button>
        </div>
    );
};

export default SearchForm;
