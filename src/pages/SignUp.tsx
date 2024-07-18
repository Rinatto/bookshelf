import type React from "react"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "../components/AuthContext"
import { MyInput } from "../components/UI/Input/MyInput"
import { MyButton } from "../components/UI/MyButton/MyButton"
import { storageService } from "../services/storageService"

export const Signup: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(String(email).toLowerCase())
  }

  const handleSignup = (event: React.FormEvent) => {
    event.preventDefault()

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (password.length < 3) {
      setError("Password must be at least 3 characters long")
      return
    }

    const user = { email, password }
    const users = JSON.parse(localStorage.getItem("users") || "[]")

    const userExists = users.some((u: { email: string }) => u.email === email)

    if (userExists) {
      setError("User with this email already exists")
      return
    }

    storageService.saveUser(user)
    login(user)
    navigate("/")
  }

  return (
    <div>
      <h1>Регистрация</h1>
      <form onSubmit={handleSignup}>
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
        <MyButton label="Регистрация" onClick={handleSignup} />
      </form>
    </div>
  )
}
