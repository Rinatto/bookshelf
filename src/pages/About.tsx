import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { BookCard } from "../components/BookCard"
import { SearchBar } from "../components/SearchBar"
import { Loader } from "../components/UI/Loader/Loader"

import cl from "../styles/About.module.css"

interface Book {
  id: string
  volumeInfo: {
    title: string
    authors: string[]
    description: string
    imageLinks: {
      thumbnail: string
    }
  }
}

export const About: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const location = useLocation()
  const navigate = useNavigate()

  const fetchBooks = async (query: string) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&projection=lite&maxResults=20`,
      )
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data = await response.json()
      setBooks(data.items)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const query = searchParams.get("search") || "javascript"
    fetchBooks(query)
  }, [location.search])

  const handleSearch = (query: string) => {
    setLoading(true)
    setError(null)
    setBooks([])

    navigate(`/?search=${encodeURIComponent(query)}`)

    fetchBooks(query)
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
