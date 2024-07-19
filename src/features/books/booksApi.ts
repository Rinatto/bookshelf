import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface VolumeInfo {
  title: string
  authors: string[]
  description: string
  imageLinks: {
    thumbnail: string
  }
}

interface Book {
  id: string
  volumeInfo: VolumeInfo
}

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.googleapis.com/books/v1/",
  }),
  endpoints: builder => ({
    fetchBooks: builder.query<Book[], string>({
      query: query =>
        `volumes?q=${encodeURIComponent(query)}&projection=lite&maxResults=20`,
      transformResponse: (response: { items: Book[] }): Book[] =>
        response.items,
    }),
  }),
})

export const { useFetchBooksQuery } = booksApi
