import "./styles/App.css"

import { BrowserRouter, Route, Routes } from "react-router-dom"

import About from "./pages/About"

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
