import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { BookCard } from "../components/BookCard"
import { SearchBar } from "../components/SearchBar"
import { Loader } from "../components/UI/Loader/Loader"
import { useFetch } from "../hooks/useFetch"

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

interface BooksResponse {
  items: Book[]
}

export const About: React.FC = () => {
  const [dataError, setDataError] = useState<string | null>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search)
  const query = searchParams.get("search") || "javascript"

  const { data, loading, error } = useFetch<BooksResponse>(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&projection=lite&maxResults=20`,
  )

  const handleSearch = (query: string) => {
    navigate(`/?search=${encodeURIComponent(query)}`)
  }

  useEffect(() => {
    if (data && !Array.isArray(data.items)) {
      setDataError("Data is not an array")
    } else {
      setDataError(null)
    }
  }, [data])

  if (loading) {
    return <Loader />
  }

  if (error || dataError) {
    return <div>Error: {error || dataError}</div>
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className={cl.grid}>
        {data?.items?.map(book => (
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
