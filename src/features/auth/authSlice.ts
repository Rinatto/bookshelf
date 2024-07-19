import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

import { storageService } from "../../services/storageService"

interface AuthState {
  user: { email: string; password: string } | null
  isAuth: boolean
  favorites: string[]
  searchHistory: string[]
}

const authState = storageService.getAuthState()
const initialState: AuthState = {
  user: authState.user,
  isAuth: authState.isAuth,
  favorites: authState.user
    ? storageService.getFavorites(authState.user.email)
    : [],
  searchHistory: authState.user
    ? storageService.getSearchHistory(authState.user.email)
    : [],
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ email: string; password: string }>) {
      state.user = action.payload
      state.isAuth = true
      state.favorites = storageService.getFavorites(action.payload.email)
      state.searchHistory = storageService.getSearchHistory(
        action.payload.email,
      )
      storageService.saveAuthState(true, action.payload)
    },
    logout(state) {
      if (state.user) {
        storageService.clearAuthState()
      }
      state.user = null
      state.isAuth = false
      state.favorites = []
      state.searchHistory = []
    },
    setFavorites(state, action: PayloadAction<string[]>) {
      state.favorites = action.payload
      if (state.user) {
        storageService.saveFavorites(state.user.email, action.payload)
      }
    },
    addFavorite(state, action: PayloadAction<string>) {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload)
        if (state.user) {
          storageService.saveFavorites(state.user.email, state.favorites)
        }
      }
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.favorites = state.favorites.filter(
        favorite => favorite !== action.payload,
      )
      if (state.user) {
        storageService.saveFavorites(state.user.email, state.favorites)
      }
    },
    setSearchHistory(state, action: PayloadAction<string[]>) {
      state.searchHistory = action.payload
      if (state.user) {
        storageService.saveSearchHistory(state.user.email, action.payload)
      }
    },
    addSearchQuery(state, action: PayloadAction<string>) {
      if (!state.searchHistory.includes(action.payload)) {
        state.searchHistory.push(action.payload)
        if (state.user) {
          storageService.saveSearchHistory(
            state.user.email,
            state.searchHistory,
          )
        }
      }
    },
    removeSearchQuery(state, action: PayloadAction<string>) {
      state.searchHistory = state.searchHistory.filter(
        query => query !== action.payload,
      )
      if (state.user) {
        storageService.saveSearchHistory(state.user.email, state.searchHistory)
      }
    },
    clearSearchHistory(state) {
      if (state.user) {
        storageService.clearSearchHistory(state.user.email)
      }
      state.searchHistory = []
    },
  },
})

export const {
  login,
  logout,
  setFavorites,
  addFavorite,
  removeFavorite,
  setSearchHistory,
  addSearchQuery,
  removeSearchQuery,
  clearSearchHistory,
} = authSlice.actions
export const authReducer = authSlice.reducer
