import type React from "react"
import { useCallback, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "../components/AuthContext"
import { MyButton } from "../components/UI/MyButton/MyButton"
import { storageService } from "../services/storageService"

import "../styles/HistoryPage.css"

export const HistoryPage: React.FC = () => {
  const { isAuth, user } = useContext(AuthContext)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const navigate = useNavigate()

  const loadSearchHistory = useCallback(() => {
    if (user) {
      const history = storageService.getSearchHistory(user.email)
      setSearchHistory(history)
    }
  }, [user])

  useEffect(() => {
    if (!isAuth || !user) {
      navigate("/signin")
    } else {
      loadSearchHistory()
    }
  }, [isAuth, user, navigate, loadSearchHistory])

  const handleClearHistory = () => {
    if (user) {
      storageService.clearSearchHistory(user.email)
      setSearchHistory([])
    }
  }

  const handleRemoveQuery = (query: string) => {
    if (user) {
      const updatedHistory = searchHistory.filter(item => item !== query)
      storageService.saveSearchHistory(user.email, updatedHistory)
      setSearchHistory(updatedHistory)
    }
  }

  const handleQueryClick = (query: string) => {
    navigate(`/?search=${encodeURIComponent(query)}`)
  }

  return (
    <div className="history-page">
      <h1>История поиска</h1>
      {searchHistory.length > 0 ? (
        <>
          <div className="clear-button">
            <MyButton label="Очистить историю" onClick={handleClearHistory} />
          </div>
          <ul className="history-list">
            {searchHistory.map((query, index) => (
              <li key={index}>
                <span onClick={() => handleQueryClick(query)}>{query}</span>
                <MyButton
                  label="Удалить"
                  onClick={() => handleRemoveQuery(query)}
                />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>История поиска не найдена</p>
      )}
    </div>
  )
}
