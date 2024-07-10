import { useState } from "react"

import { MyInput } from "../components/UI/Input/MyInput"
import { MyButton } from "../components/UI/MyButton/MyButton"

export const Login: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Логика входа
  }

  return (
    <div>
      <h1>Вход</h1>
      <form onSubmit={handleSubmit}>
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
        <MyButton label="Войти" onClick={handleSubmit} />
      </form>
    </div>
  )
}
