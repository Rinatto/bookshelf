import { BrowserRouter } from "react-router-dom"

import { AppRouter } from "./components/AppRouter"
import { AuthProvider } from "./components/AuthContext"
import { Navbar } from "./components/UI/Navbar/Navbar"

import "./styles/App.css"

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  )
}
