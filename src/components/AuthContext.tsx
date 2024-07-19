// import type { ReactNode } from "react"
// import type React from "react"
// import { createContext, useCallback, useEffect, useMemo, useState } from "react"

// import { storageService } from "../services/storageService"

// interface AuthContextType {
//   isAuth: boolean
//   user: { email: string; password: string } | null
//   login: (user: { email: string; password: string }) => void
//   logout: () => void
//   checkUser: (email: string, password: string) => boolean
// }

// export const AuthContext = createContext<AuthContextType>({
//   isAuth: false,
//   user: null,
//   login: () => {},
//   logout: () => {},
//   checkUser: () => false,
// })

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [isAuth, setIsAuth] = useState(false)
//   const [user, setUser] = useState<{ email: string; password: string } | null>(
//     null,
//   )

//   const login = useCallback((user: { email: string; password: string }) => {
//     setIsAuth(true)
//     setUser(user)
//     storageService.saveAuthState(true, user)
//   }, [])

//   const logout = useCallback(() => {
//     setIsAuth(false)
//     setUser(null)
//     storageService.clearAuthState()
//   }, [])

//   const checkUser = useCallback((email: string, password: string) => {
//     const foundUser = storageService.getUser(email)
//     return foundUser?.password === password
//   }, [])

//   useEffect(() => {
//     const auth = storageService.getAuthState()
//     if (auth.isAuth && auth.user) {
//       setIsAuth(true)
//       setUser(auth.user)
//     }
//   }, [])

//   const contextValue = useMemo(
//     () => ({ isAuth, user, login, logout, checkUser }),
//     [isAuth, user, login, logout, checkUser],
//   )

//   return (
//     <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
//   )
// }
