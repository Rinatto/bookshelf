import { createSlice } from "@reduxjs/toolkit"

import { fetchBooks } from "./booksThunks"
import type { BooksState } from "./booksTypes"

const initialState: BooksState = {
  books: [],
  loading: false,
  error: null,
}

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBooks.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false
        state.books = action.payload
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch books"
      })
  },
})

export const booksReducer = booksSlice.reducer
