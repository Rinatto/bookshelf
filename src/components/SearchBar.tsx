import type React from "react"
import { useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { useAppSelector } from "../app/hooks"
import { selectUser } from "../features/auth/selectors"
import { useDebounce } from "../hooks/useDebounce"
import { storageService } from "../services"

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
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false)
  const debouncedQuery = useDebounce(query, 500)
  const user = useAppSelector(selectUser)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const searchQuery = params.get("search")
    if (searchQuery) {
      setQuery(searchQuery)
    }
  }, [location.search])

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
    setShowSuggestions(false)
  }

  const handleButtonClick = () => {
    saveSearchHistory(query)
    onSearch(query)
    setShowSuggestions(false)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      saveSearchHistory(query)
      onSearch(query)
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (id: string) => {
    navigate(`/books/${id}`)
    setShowSuggestions(false)
  }

  const saveSearchHistory = useCallback(
    (query: string) => {
      if (user) {
        const searchHistory = storageService.getSearchHistory(user.email)
        if (!searchHistory.includes(query)) {
          searchHistory.push(query)
          storageService.saveSearchHistory(user.email, searchHistory)
        }
      }
    },
    [user],
  )

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
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setShowSuggestions(false)}
        />
        <MyButton label="Искать" onClick={handleButtonClick} />
      </form>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map(book => (
            <li
              key={book.id}
              onMouseDown={() => handleSuggestionClick(book.id)}
            >
              {book.volumeInfo.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
