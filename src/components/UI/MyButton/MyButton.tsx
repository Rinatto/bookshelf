import PropTypes from "prop-types"

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

MyButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
}
