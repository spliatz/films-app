import { useState } from 'react';

type UsePagination = (arg: UsePaginationProps) => (UsePaginationReturn);

interface UsePaginationProps {
    contentPerPage: number,
    initialCount: number,
}
interface UsePaginationReturn {
    page: number;
    totalPages: number;
    firstContentIndex: number;
    lastContentIndex: number;
    nextPage: () => void;
    prevPage: () => void;
    setPage: (page: number) => void;
    updateCount: (c: number) => void;
}

const usePagination: UsePagination = ({ contentPerPage, initialCount }): UsePaginationReturn => {
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(initialCount)
    const pageCount = Math.ceil(count / contentPerPage);
    const lastContentIndex = page * contentPerPage;
    const firstContentIndex = lastContentIndex - contentPerPage;

    const changePage = (direction: boolean) => {
        setPage((state) => {
            if (direction) {
                if (state === pageCount) {
                    return state;
                }
                return state + 1;
            } else {
                if (state === 1) {
                    return state;
                }
                return state - 1;
            }
        });
    };

    const setPageSAFE = (num: number) => {
        if (num > pageCount) {
            setPage(pageCount);
        } else if (num < 1) {
            setPage(1);
        } else {
            setPage(num);
        }
    };

    return {
        totalPages: pageCount,
        nextPage: () => changePage(true),
        prevPage: () => changePage(false),
        setPage: setPageSAFE,
        updateCount: (c: number) => setCount(c),
        firstContentIndex,
        lastContentIndex,
        page,
    }
}

export default usePagination;
