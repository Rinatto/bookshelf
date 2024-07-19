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
      const favorites = JSON.parse(
        localStorage.getItem(`${action.payload.email}-favorites`) || "[]",
      )
      state.favorites = favorites
      const searchHistory = JSON.parse(
        localStorage.getItem(`${action.payload.email}-searchHistory`) || "[]",
      )
      state.searchHistory = searchHistory
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
        if (state.user) {
          localStorage.setItem(
            `${state.user.email}-favorites`,
            JSON.stringify(state.favorites),
          )
        }
      }
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.favorites = state.favorites.filter(
        favorite => favorite !== action.payload,
      )
      if (state.user) {
        localStorage.setItem(
          `${state.user.email}-favorites`,
          JSON.stringify(state.favorites),
        )
      }
    },
    setSearchHistory(state, action: PayloadAction<string[]>) {
      state.searchHistory = action.payload
      if (state.user) {
        localStorage.setItem(
          `${state.user.email}-searchHistory`,
          JSON.stringify(state.searchHistory),
        )
      }
    },
    addSearchQuery(state, action: PayloadAction<string>) {
      if (!state.searchHistory.includes(action.payload)) {
        state.searchHistory.push(action.payload)
        if (state.user) {
          localStorage.setItem(
            `${state.user.email}-searchHistory`,
            JSON.stringify(state.searchHistory),
          )
        }
      }
    },
    removeSearchQuery(state, action: PayloadAction<string>) {
      state.searchHistory = state.searchHistory.filter(
        query => query !== action.payload,
      )
      if (state.user) {
        localStorage.setItem(
          `${state.user.email}-searchHistory`,
          JSON.stringify(state.searchHistory),
        )
      }
    },
    clearSearchHistory(state) {
      state.searchHistory = []
      if (state.user) {
        localStorage.removeItem(`${state.user.email}-searchHistory`)
      }
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
