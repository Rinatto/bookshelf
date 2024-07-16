import { useLocation, useNavigate } from "react-router-dom"

import { BookCard } from "../components/BookCard"
import { SearchBar } from "../components/SearchBar"
import { Loader } from "../components/UI/Loader/Loader"
import { useFetchBooksQuery } from "../features/books/booksApi"

import cl from "../styles/About.module.css"

export const About: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search)
  const query = searchParams.get("search") || "javascript"
  const { data: books = [], error, isLoading } = useFetchBooksQuery(query)

  const handleSearch = (query: string) => {
    navigate(`/?search=${encodeURIComponent(query)}`)
  }

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <div>Error: {error.toString()}</div>
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
