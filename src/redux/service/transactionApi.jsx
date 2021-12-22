import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials } from './authSlice';
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://adamants-wallet-project-back.herokuapp.com/api/',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    console.log('header', token);
    if (token) {
      // console.log('token', token);
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log(result);
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery(
      {
        url: `/refresh`,
        method: 'POST',
      },
      api,
      extraOptions,
    );
    if (refreshResult.data) {
      // store the new token
      api.dispatch(setCredentials(refreshResult.data));
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(transactionApi.logout());
    }
  }
  return result;
};

export const transactionApi = createApi({
  reducerPath: 'transactionApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Transaction'],
  endpoints: builder => ({
    getCategories: builder.query({
      query: arg => {
        const { startDate, endDate } = arg;
        console.log(startDate);
        console.log(endDate);
        return {
          url: `transactions/categories`,
          params: { startDate, endDate },
        };
      },
      providesTags: ['Transaction'],
    }),

    getTransactions: builder.query({
      query: ({ startDate, endDate }) => ({
        url: `transactions?startDate${startDate}&endDate=${endDate}`,
      }),
      // transformResponse(response, meta, args)
      providesTags: ['Transaction'],
    }),
    createTransaction: builder.mutation({
      query: ({ date, category, comment, amount, type }) => ({
        url: `transactions`,
        method: 'POST',
        body: {
          date,
          category,
          comment,
          amount,
          type,
        },
      }),
      invalidatesTags: ['Transaction'],
    }),
  }),
});

export const { useGetCategoriesQuery, useGetTransactionsQuery, useCreateTransactionMutation } =
  transactionApi;
