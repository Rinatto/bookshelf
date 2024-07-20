import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useAppDispatch } from "../app/hooks"
import { MyInput } from "../components/UI/Input/MyInput"
import { MyButton } from "../components/UI/MyButton/MyButton"
import { login } from "../features/auth/authSlice"
import { storageService } from "../services"

export const SignIn: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSignIn = (event: React.FormEvent) => {
    event.preventDefault()

    if (storageService.checkUser(email, password)) {
      const user = { email, password }
      dispatch(login(user))
      navigate("/")
      return
    }

    setError("Invalid email or password")
  }

  return (
    <div>
      <h1>Вход</h1>
      <form onSubmit={handleSignIn}>
        <MyInput
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
        />
        <MyInput
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Пароль"
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <MyButton label="Войти" onClick={handleSignIn} />
      </form>
    </div>
  )
}
