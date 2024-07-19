import type React from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../app/hooks"
import { MyButton } from "../components/UI/MyButton/MyButton"
import {
  clearSearchHistory,
  removeSearchQuery,
} from "../features/auth/authSlice"
import {
  getIsAuth,
  getSearchHistory,
  getUser,
} from "../features/auth/selectors"

import "../styles/HistoryPage.css"

export const HistoryPage: React.FC = () => {
  const navigate = useNavigate()
  const isAuth = useAppSelector(getIsAuth)
  const user = useAppSelector(getUser)
  const searchHistory = useAppSelector(getSearchHistory)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isAuth || !user) {
      navigate("/signin")
    }
  }, [isAuth, user, navigate])

  const handleClearHistory = () => {
    if (user) {
      dispatch(clearSearchHistory())
    }
  }

  const handleRemoveQuery = (query: string) => {
    if (user) {
      dispatch(removeSearchQuery(query))
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
