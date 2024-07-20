import type { StorageService } from "./storageService"

export const localStorageService: StorageService = {
  saveUser: user => {
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    users.push(user)
    localStorage.setItem("users", JSON.stringify(users))
    localStorage.setItem(`${user.email}-favorites`, JSON.stringify([]))
    localStorage.setItem(`${user.email}-searchHistory`, JSON.stringify([]))
  },
  getUser: email => {
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    return users.find((u: { email: string }) => u.email === email) || null
  },
  getUsers: () => {
    return JSON.parse(localStorage.getItem("users") || "[]")
  },
  saveFavorites: (email, favorites) => {
    localStorage.setItem(`${email}-favorites`, JSON.stringify(favorites))
  },
  getFavorites: email => {
    return JSON.parse(localStorage.getItem(`${email}-favorites`) || "[]")
  },
  saveSearchHistory: (email, searchHistory) => {
    const uniqueHistory = Array.from(new Set(searchHistory))
    localStorage.setItem(
      `${email}-searchHistory`,
      JSON.stringify(uniqueHistory),
    )
  },
  getSearchHistory: email => {
    return JSON.parse(localStorage.getItem(`${email}-searchHistory`) || "[]")
  },
  clearSearchHistory: email => {
    localStorage.removeItem(`${email}-searchHistory`)
  },
  saveAuthState: (isAuth, user) => {
    localStorage.setItem("isAuth", JSON.stringify(isAuth))
    localStorage.setItem("currentUser", JSON.stringify(user))
  },
  getAuthState: () => {
    const isAuth = JSON.parse(localStorage.getItem("isAuth") || "false")
    const user = JSON.parse(localStorage.getItem("currentUser") || "null")
    return { isAuth, user }
  },
  clearAuthState: () => {
    localStorage.removeItem("isAuth")
    localStorage.removeItem("currentUser")
  },
  clearFavorites: email => {
    localStorage.removeItem(`${email}-favorites`)
  },
  checkUser: (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    return users.some(
      (u: { email: string; password: string }) =>
        u.email === email && u.password === password,
    )
  },
  saveLogs: logs => {
    localStorage.setItem("redux-logs", JSON.stringify(logs))
  },
  getLogs: () => {
    return JSON.parse(localStorage.getItem("redux-logs") || "[]")
  },
}
