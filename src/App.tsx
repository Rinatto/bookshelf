import { BrowserRouter, Route, Routes } from "react-router-dom"
import About from "./pages/About"
import "./styles/App.css"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
