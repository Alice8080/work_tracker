import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import env from "react-dotenv";

export interface Record {
    fromDate: string,
    toDate: string,
    name: string
}

export type RecordsList = Record[];

// конфигурация api

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://script.google.com/macros/s/AKfycbxmJSzytHBLpNFHa-8jWbtGQZFmfq8yD2E8oRXR0y-iC0LsW8bozNzbergrRK55nKiEOA/' }),
    tagTypes: ['Records'],
    endpoints: (builder) => ({
        getUserInfo: builder.query<RecordsList, string>({
            query: (id) => ({
                url: `exec?userid=${id}`,
            }),
            transformResponse: (result: []) => {
                let records: RecordsList = [];
                if (result.length !== 0) {
                    for (let item of result) {
                        if (Date.parse(item[0]) && Date.parse(item[1]) && item[1]) {
                            let record: Record = {
                                fromDate: item[0],
                                toDate: item[1],
                                name: item[2]
                            }
                            records.push(record);
                        }
                    }
                }
                return records;
            },
            // providesTags: ['Records']
        }),
    }),
});

export const { useLazyGetUserInfoQuery } = apiSlice;

