import type React from "react"
import { Link, useNavigate } from "react-router-dom"

import logo from "../../../../public/book.png"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { logout } from "../../../features/auth/authSlice"
import { getIsAuth } from "../../../features/auth/selectors"
import { useTheme } from "../../ThemeContext"
import { MyButton } from "../MyButton/MyButton"

import cl from "./Navbar.module.css"

export const Navbar: React.FC = () => {
  const isAuth = useAppSelector(getIsAuth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isDarkTheme, toggleTheme } = useTheme()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/signin")
  }

  return (
    <div className={`${cl.navbar} ${isDarkTheme ? cl.dark : cl.light}`}>
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
      <div className={cl.themeToggle}>
        <MyButton
          label={isDarkTheme ? "Светлая тема" : "Темная тема"}
          onClick={toggleTheme}
        />
      </div>
    </div>
  )
}
