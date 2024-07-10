import cl from "./MyInput.module.css"

interface MyInputProps {
  type?: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

export const MyInput: React.FC<MyInputProps> = ({
  type = "text",
  value,
  onChange,
  placeholder,
}) => {
  return (
    <input
      className={cl.myInput}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
}
