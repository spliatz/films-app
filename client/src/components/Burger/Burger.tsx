import React, { Dispatch, SetStateAction, useState } from 'react';
import Filter from '../Filter/Filter';
import './Burger.scss';

interface Props {
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    page: number;
    setPage: (n: number) => void;
    totalPages: number;
}

const Burger: React.FC<Props> = ({ isOpen, setOpen, page, setPage, totalPages }) => {
    const [animationClass, setAnimClass] = useState('close');

    const onOpenHandler = () => {
        setOpen((prevState) => !prevState);
        animationClass === 'open' ? setAnimClass('close') : setAnimClass('open');
    };

    if (isOpen) {
        return (
            <>
                <button className="burger" onClick={onOpenHandler}>
                    <div className={'stick stick-1 ' + animationClass} />
                    <div className={'stick stick-2 ' + animationClass} />
                    <div className={'stick stick-3 ' + animationClass} />
                </button>
                <Filter page={page} setPage={setPage} totalPages={totalPages}/>
            </>
        );
    }

    return (
        <button className="burger" onClick={onOpenHandler}>
            <div className="stick stick-1" />
            <div className="stick stick-2" />
            <div className="stick stick-3" />
        </button>
    );
};

export default Burger;
