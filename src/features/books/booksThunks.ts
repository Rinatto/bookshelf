import { createAsyncThunk } from "@reduxjs/toolkit"

import type { Book } from "./booksTypes"

export const fetchBooks = createAsyncThunk<Book[], string>(
  "books/fetchBooks",
  async (query: string) => {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&projection=lite&maxResults=20`,
    )
    const data = await response.json()
    return data.items
  },
)
