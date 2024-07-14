import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../app/hooks"
import { BookCard } from "../components/BookCard"
import { SearchBar } from "../components/SearchBar"
import { Loader } from "../components/UI/Loader/Loader"
import { fetchBooks } from "../features/books/booksThunks"

import cl from "../styles/About.module.css"

export const About: React.FC = () => {
  const dispatch = useAppDispatch()
  const { books, loading, error } = useAppSelector(state => state.books)

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const query = searchParams.get("search") || "javascript"
    dispatch(fetchBooks(query))
  }, [dispatch, location.search])

  const handleSearch = (query: string) => {
    navigate(`/?search=${encodeURIComponent(query)}`)
    dispatch(fetchBooks(query))
  }

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className={cl.grid}>
        {books.map(book => (
          <BookCard
            key={book.id}
            id={book.id}
            title={book.volumeInfo.title}
            authors={book.volumeInfo.authors || ["Unknown"]}
            description={
              book.volumeInfo.description || "No description available"
            }
            coverImageUrl={
              book.volumeInfo.imageLinks?.thumbnail ||
              "https://via.placeholder.com/128x195.png?text=No+Image"
            }
          />
        ))}
      </div>
    </div>
  )
}
