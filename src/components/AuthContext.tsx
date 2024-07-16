import type { ReactNode } from "react"
import type React from "react"
import { createContext, useEffect, useState } from "react"

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

  const login = (user: { email: string; password: string }) => {
    setIsAuth(true)
    setUser(user)
    localStorage.setItem("isAuth", "true")
    localStorage.setItem("currentUser", JSON.stringify(user))
  }

  const logout = () => {
    setIsAuth(false)
    setUser(null)
    localStorage.removeItem("isAuth")
    localStorage.removeItem("currentUser")
  }

  const checkUser = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const foundUser = users.find(
      (u: { email: string; password: string }) =>
        u.email === email && u.password === password,
    )
    return !!foundUser
  }

  useEffect(() => {
    const auth = localStorage.getItem("isAuth")
    const storedUser = localStorage.getItem("currentUser")
    if (auth && storedUser) {
      setIsAuth(true)
      setUser(JSON.parse(storedUser))
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isAuth, user, login, logout, checkUser }}>
      {children}
    </AuthContext.Provider>
  )
}
