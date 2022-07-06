import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const WatchLaterAPI = createApi({
    reducerPath: 'FavoritesAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'api/watch-later' }),
    endpoints: (build) => ({
        fetchUserWatchLater: build.query({
            query: (token: string) => ({
                url: `${token}`,
            }),
        }),
        addUserWatchLater: build.mutation({
            query: ({ token, put }) => ({
                url: `add/${token}`,
                method: 'PUT',
                body: put,
            }),
        }),
        removeUserWatchLater: build.mutation({
            query: ({ token, put }) => ({
                url: `remove/${token}`,
                method: 'PUT',
                body: put,
            }),
        }),
    }),
});
