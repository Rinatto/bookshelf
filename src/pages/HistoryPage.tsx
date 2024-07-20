import type React from "react"
import { useEffect } from "react"

import { useAppDispatch, useAppSelector } from "../app/hooks"
import { MyButton } from "../components/UI/MyButton/MyButton"
import {
  clearSearchHistory,
  removeSearchQuery,
  setSearchHistory,
} from "../features/auth/authSlice"
import { getSearchHistory, getUser } from "../features/auth/selectors"
import { useSearchNavigation } from "../hooks/useSearchNavigation"
import { storageService } from "../services"

import "../styles/HistoryPage.css"

export const HistoryPage: React.FC = () => {
  const user = useAppSelector(getUser)
  const searchHistory = useAppSelector(getSearchHistory)
  const dispatch = useAppDispatch()
  const navigateToSearch = useSearchNavigation()

  useEffect(() => {
    if (user) {
      const history = storageService.getSearchHistory(user.email)
      dispatch(setSearchHistory(history))
    }
  }, [user, dispatch])

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
                <span onClick={() => navigateToSearch(query)}>{query}</span>
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
