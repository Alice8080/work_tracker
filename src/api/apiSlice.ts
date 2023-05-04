import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface User {
    id: string
    name: string
}

// конфигурация api

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://example.ru/api/' }),
    endpoints: (builder) => ({
        getUserInfo: builder.query<User, string>({
            query: (id) => `users/${id}`,
            transformResponse: (rawResult: { result: { user: User } }, meta) => {
                return rawResult.result.user;
            },
        }),
    }),
})

export const { useLazyGetUserInfoQuery } = apiSlice;

