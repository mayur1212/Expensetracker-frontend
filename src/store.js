import { configureStore } from "@reduxjs/toolkit";
import { transactionsApi } from "./api/transactionsApi";

export const store = configureStore({
  reducer: {
    [transactionsApi.reducerPath]: transactionsApi.reducer,
  },
  middleware: (gDM) => gDM().concat(transactionsApi.middleware),
});
