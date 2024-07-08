import { BrowserRouter} from "react-router-dom"

import { AppRouter } from "./components/AppRouter"
import { Navbar } from "./components/UI/Navbar/Navbar"

import "./styles/App.css"

 export const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <AppRouter/>
    </BrowserRouter>
  )
}
