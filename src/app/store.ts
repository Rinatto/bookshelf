import { configureStore } from "@reduxjs/toolkit"

import { booksReducer } from "../features/books/booksSlice"
import { loggerMiddleware } from "../middleware/loggerMiddleware"

export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(loggerMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
