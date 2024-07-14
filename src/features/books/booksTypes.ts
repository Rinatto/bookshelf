export interface VolumeInfo {
  title: string
  authors: string[]
  description: string
  imageLinks: {
    thumbnail: string
  }
}

export interface Book {
  id: string
  volumeInfo: VolumeInfo
}

export interface BooksState {
  books: Book[]
  loading: boolean
  error: string | null
}
