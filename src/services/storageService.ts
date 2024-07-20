export interface StorageService {
  saveUser(user: { email: string; password: string }): void
  getUser(email: string): { email: string; password: string } | null
  getUsers(): { email: string; password: string }[]
  saveFavorites(email: string, favorites: string[]): void
  getFavorites(email: string): string[]
  saveSearchHistory(email: string, searchHistory: string[]): void
  getSearchHistory(email: string): string[]
  clearSearchHistory(email: string): void
  clearFavorites(email: string): void
  checkUser(email: string, password: string): boolean
  saveAuthState(
    isAuth: boolean,
    user: { email: string; password: string } | null,
  ): void
  getAuthState(): {
    isAuth: boolean
    user: { email: string; password: string } | null
  }
  clearAuthState(): void
  saveLogs(logs: any[]): void
  getLogs(): any[]
}
