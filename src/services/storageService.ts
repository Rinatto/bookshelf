interface StorageService {
  saveUser(user: { email: string; password: string }): void
  getUser(email: string): { email: string; password: string } | null
  getUsers(): { email: string; password: string }[]
  saveFavorites(email: string, favorites: string[]): void
  getFavorites(email: string): string[]
  saveSearchHistory(email: string, searchHistory: string[]): void
  getSearchHistory(email: string): string[]
  clearSearchHistory(email: string): void
  saveAuthState(
    isAuth: boolean,
    user: { email: string; password: string } | null,
  ): void
  getAuthState(): {
    isAuth: boolean
    user: { email: string; password: string } | null
  }
  clearAuthState(): void
}

export const storageService: StorageService = {
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
    const uniqueHistory = Array.from(new Set(searchHistory)) // Удаляем дубликаты
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
}
