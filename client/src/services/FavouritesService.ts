import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const FavouriteAPI = createApi({
    reducerPath: 'FavouriteAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'api/favourites' }),
    tagTypes: ['Favourites'],
    endpoints: (build) => ({
        fetchUserFavourites: build.query({
            query: (token: string) => ({
                url: `${token}`,
            }),
            providesTags: () => ['Favourites'],
        }),
        addUserFavourites: build.mutation({
            query: ({ token, put }) => ({
                url: `/add/${token}`,
                method: 'PUT',
                body: put,
            }),
            invalidatesTags: ['Favourites'],
        }),
        removeUserFavourites: build.mutation({
            query: ({ token, put }) => ({
                url: `/remove/${token}`,
                method: 'PUT',
                body: put,
            }),
            invalidatesTags: ['Favourites'],
        }),
    }),
});
