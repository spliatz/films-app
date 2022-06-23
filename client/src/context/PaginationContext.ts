import React, { createContext } from 'react';

function pooh(e: React.ChangeEvent<unknown>, page: number) {}

export const PaginationContext = createContext({
  page: 1,
  switchPage: pooh,
});
