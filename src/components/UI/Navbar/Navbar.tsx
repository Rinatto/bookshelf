import { Link } from "react-router-dom"

import img from "../../../../public/book.png"
import { MyButton } from "../MyButton/MyButton"

import cl from "./Navbar.module.css"

export const Navbar: React.FC = () => {
  return (
    <div className={cl.navbar}>
      <Link to="/" className={cl.logo}>
        <img src={img} alt="Logo" className={cl.logoImage} />
      </Link>
      <div className={cl.navItems}>
            <Link to="/favorites">
              <MyButton label="Избранное" onClick={() => {}} />
            </Link>
            <Link to="/history">
              <MyButton label="История" onClick={() => {}} />
            </Link>
            <Link to="/signin">
              <MyButton label="Вход" onClick={() => {}} />
            </Link>
            <Link to="/signup">
              <MyButton label="Регистрация" onClick={() => {}} />
            </Link>
            <MyButton label="Выход" onClick={() => {}} />
      </div>
    </div>
  )
}
