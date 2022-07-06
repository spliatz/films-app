import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const WatchLaterAPI = createApi({
    reducerPath: 'WatchLaterAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'api/watch-later'}),
    tagTypes: ['WatchLater'],
    endpoints: (build) => ({
        fetchUserWatchLater: build.query({
            query: (token: string) => ({
                url: `${token}`,
            }),
            providesTags: () => ['WatchLater'],
        }),
        addUserWatchLater: build.mutation({
            query: ({ token, put }) => ({
                url: `add/${token}`,
                method: 'PUT',
                body: put,
            }),
            invalidatesTags: ['WatchLater'],
        }),
        removeUserWatchLater: build.mutation({
            query: ({ token, put }) => ({
                url: `remove/${token}`,
                method: 'PUT',
                body: put,
            }),
            invalidatesTags: ['WatchLater'],
        }),
    })
})