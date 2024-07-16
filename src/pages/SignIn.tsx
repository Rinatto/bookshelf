import type React from "react"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "../components/AuthContext"
import { MyInput } from "../components/UI/Input/MyInput"
import { MyButton } from "../components/UI/MyButton/MyButton"

export const SignIn: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { login, checkUser } = useContext(AuthContext)

  const handleSignIn = (event: React.FormEvent) => {
    event.preventDefault()

    if (checkUser(email, password)) {
      const user = { email, password }
      login(user)
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
