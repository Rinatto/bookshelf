import type React from "react"
import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"

import logo from "../../../../public/book.png"
import { AuthContext } from "../../AuthContext"
import { MyButton } from "../MyButton/MyButton"

import cl from "./Navbar.module.css"

export const Navbar: React.FC = () => {
  const { isAuth, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/signin")
  }

  return (
    <div className={cl.navbar}>
      <Link to="/" className={cl.logo}>
        <img src={logo} alt="Logo" className={cl.logoImage} />
      </Link>
      <div className={cl.navItems}>
        {isAuth ? (
          <>
            <Link to="/favorites">
              <MyButton label="Избранное" onClick={() => {}} />
            </Link>
            <Link to="/history">
              <MyButton label="История" onClick={() => {}} />
            </Link>
            <MyButton label="Выход" onClick={handleLogout} />
          </>
        ) : (
          <>
            <Link to="/signin">
              <MyButton label="Вход" onClick={() => {}} />
            </Link>
            <Link to="/signup">
              <MyButton label="Регистрация" onClick={() => {}} />
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
