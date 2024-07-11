import styles from "./MyButton.module.css"

interface MyButtonProps {
  label: string
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
}

export const MyButton: React.FC<MyButtonProps> = ({
  label,
  onClick,
  className = "",
}) => {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {label}
    </button>
  )
}
