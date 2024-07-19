import type React from "react"
import { createContext, useContext, useMemo, useState } from "react"

interface ThemeContextType {
  isDarkTheme: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  const toggleTheme = () => {
    setIsDarkTheme(prevTheme => !prevTheme)
  }

  const value = useMemo(() => ({ isDarkTheme, toggleTheme }), [isDarkTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
