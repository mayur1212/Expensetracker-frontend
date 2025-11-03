import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const transactionsApi = createApi({
  reducerPath: "transactionsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseURL}/api/` }),
  tagTypes: ["Transactions"],
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: () => "transactions",
      providesTags: ["Transactions"],
    }),

    addTransaction: builder.mutation({
      query: (data) => ({
        url: "transactions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Transactions"],
    }),

    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `transactions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Transactions"],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useAddTransactionMutation,
  useDeleteTransactionMutation,
} = transactionsApi;
