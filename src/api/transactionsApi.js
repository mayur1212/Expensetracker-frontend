import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const transactionsApi = createApi({
  reducerPath: 'transactionsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  }),
  tagTypes: ['Transactions'],
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: (params = {}) => {
        // params is an object like { type, category, startDate, endDate }
        const qs = new URLSearchParams(params).toString()
        return `/transactions${qs ? `?${qs}` : ''}`
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((t) => ({ type: 'Transactions', id: t._id })),
              { type: 'Transactions', id: 'LIST' },
            ]
          : [{ type: 'Transactions', id: 'LIST' }],
    }),
    createTransaction: builder.mutation({
      query: (body) => ({ url: '/transactions', method: 'POST', body }),
      invalidatesTags: [{ type: 'Transactions', id: 'LIST' }],
    }),
    updateTransaction: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/transactions/${id}`, method: 'PUT', body }),
      invalidatesTags: (res, err, { id }) => [{ type: 'Transactions', id }, { type: 'Transactions', id: 'LIST' }],
    }),
    deleteTransaction: builder.mutation({
      query: (id) => ({ url: `/transactions/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Transactions', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetTransactionsQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = transactionsApi
