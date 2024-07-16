import { configureStore } from "@reduxjs/toolkit"

import { booksApi } from "../features/books/booksApi"
import { booksReducer } from "../features/books/booksSlice"
import { loggerMiddleware } from "../middleware/loggerMiddleware"

export const store = configureStore({
  reducer: {
    books: booksReducer,
    [booksApi.reducerPath]: booksApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(booksApi.middleware, loggerMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
