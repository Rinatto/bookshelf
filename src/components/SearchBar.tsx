import type React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useDebounce } from "../hooks/useDebounce"

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
  const debouncedQuery = useDebounce(query, 500)
  const navigate = useNavigate()

  useEffect(() => {
    if (debouncedQuery.length > 2) {
      fetchSuggestions(debouncedQuery).then(setSuggestions)
    } else {
      setSuggestions([])
    }
  }, [debouncedQuery])

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    saveSearchHistory(query)
    onSearch(query)
  }

  const handleButtonClick = () => {
    saveSearchHistory(query)
    onSearch(query)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      saveSearchHistory(query)
      onSearch(query)
    }
  }

  const handleSuggestionClick = (id: string) => {
    navigate(`/books/${id}`)
  }

  const saveSearchHistory = (query: string) => {
    const searchHistory = JSON.parse(
      localStorage.getItem("searchHistory") || "[]",
    )
    if (!searchHistory.includes(query)) {
      searchHistory.push(query)
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory))
    }
  }

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Поиск..."
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
