import { BrowserRouter } from "react-router-dom"

import { AppRouter } from "./components/AppRouter"
import { AuthProvider } from "./components/AuthContext"
import { Navbar } from "./components/UI/Navbar/Navbar"
import { WithErrorBoundary } from "./components/WithErrorBoundary"

import "./styles/App.css"

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <WithErrorBoundary>
          <Navbar />
          <AppRouter />
        </WithErrorBoundary>
      </BrowserRouter>
    </AuthProvider>
  )
}
