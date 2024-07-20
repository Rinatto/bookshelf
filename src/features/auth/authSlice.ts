import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

interface AuthState {
  user: { email: string; password: string } | null
  isAuth: boolean
  favorites: string[]
  searchHistory: string[]
}

const initialState: AuthState = {
  user: null,
  isAuth: false,
  favorites: [],
  searchHistory: [],
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ email: string; password: string }>) {
      state.user = action.payload
      state.isAuth = true
    },
    logout(state) {
      state.user = null
      state.isAuth = false
      state.favorites = []
      state.searchHistory = []
    },
    setFavorites(state, action: PayloadAction<string[]>) {
      state.favorites = action.payload
    },
    addFavorite(state, action: PayloadAction<string>) {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload)
      }
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.favorites = state.favorites.filter(
        favorite => favorite !== action.payload,
      )
    },
    setSearchHistory(state, action: PayloadAction<string[]>) {
      state.searchHistory = action.payload
    },
    addSearchQuery(state, action: PayloadAction<string>) {
      if (!state.searchHistory.includes(action.payload)) {
        state.searchHistory.push(action.payload)
      }
    },
    removeSearchQuery(state, action: PayloadAction<string>) {
      state.searchHistory = state.searchHistory.filter(
        query => query !== action.payload,
      )
    },
    clearSearchHistory(state) {
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
