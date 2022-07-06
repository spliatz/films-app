import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const API = createApi({
    reducerPath: 'API',
    baseQuery: fetchBaseQuery({ baseUrl: 'api' }),
    tagTypes: ['Favourites', 'WatchLater'],
    endpoints: (build) => ({
        fetchUserFavourites: build.query({
            query: (token: string) => ({
                url: `favourites/${token}`,
            }),
            providesTags: (result) => ['Favourites'],
        }),
        addUserFavourites: build.mutation({
            query: ({ token, put }) => ({
                url: `favourites/add/${token}`,
                method: 'PUT',
                body: put,
            }),
            invalidatesTags: ['Favourites'],
        }),
        removeUserFavourites: build.mutation({
            query: ({ token, put }) => ({
                url: `favourites/remove/${token}`,
                method: 'PUT',
                body: put,
            }),
            invalidatesTags: ['Favourites'],
        }),
        fetchUserWatchLater: build.query({
            query: (token: string) => ({
                url: `watch-later/${token}`,
            }),
            providesTags: (result) => ['WatchLater'],
        }),
        addUserWatchLater: build.mutation({
            query: ({ token, put }) => ({
                url: `watch-later/add/${token}`,
                method: 'PUT',
                body: put,
            }),
            invalidatesTags: ['WatchLater'],
        }),
        removeUserWatchLater: build.mutation({
            query: ({ token, put }) => ({
                url: `watch-later/remove/${token}`,
                method: 'PUT',
                body: put,
            }),
            invalidatesTags: ['WatchLater'],
        }),
    }),
});
