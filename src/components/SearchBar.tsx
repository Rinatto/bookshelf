import type React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { MyButton } from "./UI/MyButton/MyButton"

import "../styles/SearchBar.css"

const baseUrl = "https://www.googleapis.com/books/v1/volumes"

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

const fetchSuggestions = async (query: string): Promise<Book[]> => {
  const url = `${baseUrl}?q=${encodeURIComponent(query)}&projection=lite&maxResults=5`
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data.items || []
  } catch (error) {
    return []
  }
}

interface SearchBarProps {
  onSearch: (query: string) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("")
  const [suggestions, setSuggestions] = useState<Book[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    if (query.length > 2) {
      fetchSuggestions(query).then(setSuggestions)
    } else {
      setSuggestions([])
    }
  }, [query])

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSearch(query)
  }

  const handleButtonClick = () => {
    onSearch(query)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      onSearch(query)
    }
  }

  const handleSuggestionClick = (id: string) => {
    navigate(`/books/${id}`)
  }

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
          onKeyDown={handleKeyDown}
        />
        <MyButton label="Искать" onClick={handleButtonClick} />
      </form>
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map(book => (
            <li key={book.id} onClick={() => handleSuggestionClick(book.id)}>
              {book.volumeInfo.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
