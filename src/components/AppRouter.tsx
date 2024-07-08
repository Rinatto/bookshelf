import { Route, Routes } from "react-router-dom"

import { About } from "../pages/About"
import { Error } from "../pages/Error"

export const AppRouter = () => {
    return (
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="*" element={<Error />} />
      </Routes>
    );
};