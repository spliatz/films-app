import { createContext } from 'react';

function pooh(page: number) {}

function setPageCount(pages: number) {}

export const PaginationContext = createContext({
  page: 1,
  switchPage: pooh,
  pageCount: 1,
  setPageCount: setPageCount,
});
