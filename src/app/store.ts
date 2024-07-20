import { configureStore } from "@reduxjs/toolkit"

import { authReducer } from "../features/auth/authSlice"
import { booksApi } from "../features/books/booksApi"
import { authMiddleware } from "../middleware/authMiddleware"
import { loggerMiddleware } from "../middleware/loggerMiddleware"
import { storageService } from "../services"

const preloadedState = storageService.getAuthState()

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [booksApi.reducerPath]: booksApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      booksApi.middleware,
      authMiddleware,
      loggerMiddleware,
    ),
  preloadedState: {
    auth: {
      user: preloadedState.user,
      isAuth: preloadedState.isAuth,
      favorites: preloadedState.user
        ? storageService.getFavorites(preloadedState.user.email)
        : [],
      searchHistory: preloadedState.user
        ? storageService.getSearchHistory(preloadedState.user.email)
        : [],
    },
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
