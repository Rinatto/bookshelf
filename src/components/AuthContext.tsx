import type { ReactNode } from "react"
import type React from "react"
import { createContext, useCallback, useEffect, useMemo, useState } from "react"

interface AuthContextType {
  isAuth: boolean
  user: { email: string; password: string } | null
  login: (user: { email: string; password: string }) => void
  logout: () => void
  checkUser: (email: string, password: string) => boolean
}

export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  user: null,
  login: () => {},
  logout: () => {},
  checkUser: () => false,
})

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuth, setIsAuth] = useState(false)
  const [user, setUser] = useState<{ email: string; password: string } | null>(
    null,
  )

  const login = useCallback(
    (user: { email: string; password: string }): void => {
      setIsAuth(true)
      setUser(user)
      localStorage.setItem("isAuth", "true")
      localStorage.setItem("currentUser", JSON.stringify(user))
    },
    [],
  )

  const logout = useCallback((): void => {
    setIsAuth(false)
    setUser(null)
    localStorage.removeItem("isAuth")
    localStorage.removeItem("currentUser")
  }, [])

  const checkUser = useCallback((email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const foundUser = users.find(
      (u: { email: string; password: string }) =>
        u.email === email && u.password === password,
    )
    return !!foundUser
  }, [])

  useEffect(() => {
    const auth = localStorage.getItem("isAuth")
    const storedUser = localStorage.getItem("currentUser")
    if (auth && storedUser) {
      setIsAuth(true)
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const contextValue = useMemo(
    () => ({ isAuth, user, login, logout, checkUser }),
    [isAuth, user, login, logout, checkUser],
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
