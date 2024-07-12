import type React from "react"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "../components/AuthContext"
import { MyButton } from "../components/UI/MyButton/MyButton"

import "../styles/HistoryPage.css"

export const HistoryPage: React.FC = () => {
  const { isAuth } = useContext(AuthContext)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuth) {
      navigate("/signin")
    } else {
      loadSearchHistory()
    }
  }, [isAuth, navigate])

  const loadSearchHistory = () => {
    const history = JSON.parse(localStorage.getItem("searchHistory") || "[]")
    setSearchHistory(history)
  }

  const handleClearHistory = () => {
    localStorage.removeItem("searchHistory")
    setSearchHistory([])
  }

  const handleRemoveQuery = (query: string) => {
    const updatedHistory = searchHistory.filter(item => item !== query)
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory))
    setSearchHistory(updatedHistory)
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
