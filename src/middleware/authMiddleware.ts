import type { Middleware } from "@reduxjs/toolkit"

import {
  addFavorite,
  addSearchQuery,
  clearSearchHistory,
  login,
  logout,
  removeFavorite,
  removeSearchQuery,
  setFavorites,
  setSearchHistory,
} from "../features/auth/authSlice"
import { storageService } from "../services"

export const authMiddleware: Middleware = store => next => action => {
  const result = next(action)

  if (login.match(action)) {
    storageService.saveAuthState(true, action.payload)
    const favorites = storageService.getFavorites(action.payload.email)
    const searchHistory = storageService.getSearchHistory(action.payload.email)
    store.dispatch(setFavorites(favorites))
    store.dispatch(setSearchHistory(searchHistory))
  } else if (logout.match(action)) {
    storageService.clearAuthState()
  } else if (setFavorites.match(action)) {
    const state = store.getState()
    if (state.auth.user) {
      storageService.saveFavorites(state.auth.user.email, action.payload)
    }
  } else if (addFavorite.match(action) || removeFavorite.match(action)) {
    const state = store.getState()
    if (state.auth.user) {
      storageService.saveFavorites(state.auth.user.email, state.auth.favorites)
    }
  } else if (
    setSearchHistory.match(action) ||
    addSearchQuery.match(action) ||
    removeSearchQuery.match(action) ||
    clearSearchHistory.match(action)
  ) {
    const state = store.getState()
    if (state.auth.user) {
      storageService.saveSearchHistory(
        state.auth.user.email,
        state.auth.searchHistory,
      )
    }
  }

  return result
}
