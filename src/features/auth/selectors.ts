import type { RootState } from "../../app/store"

export const getUser = (state: RootState) => state.auth.user
export const getIsAuth = (state: RootState) => state.auth.isAuth
export const getFavorites = (state: RootState) => state.auth.favorites
export const getSearchHistory = (state: RootState) => state.auth.searchHistory
export const selectUser = (state: RootState) => state.auth.user
export const selectIsAuth = (state: RootState) => state.auth.isAuth
export const selectFavorites = (state: RootState) => state.auth.favorites
