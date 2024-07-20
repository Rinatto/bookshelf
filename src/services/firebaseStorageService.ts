import type { StorageService } from "./storageService"

export const firebaseStorageService: StorageService = {
  saveUser: user => {},
  getUser: email => {
    return null
  },
  getUsers: () => {
    return []
  },
  saveFavorites: (email, favorites) => {},
  getFavorites: email => {
    return []
  },
  saveSearchHistory: (email, searchHistory) => {},
  getSearchHistory: email => {
    return []
  },
  clearSearchHistory: email => {},
  saveAuthState: (isAuth, user) => {},
  getAuthState: () => {
    return { isAuth: false, user: null }
  },
  clearAuthState: () => {},
  clearFavorites: email => {},
  checkUser: (email, password) => {
    return false
  },
  saveLogs: logs => {},
  getLogs: () => {
    return []
  },
}
