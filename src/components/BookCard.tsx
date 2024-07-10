import type React from "react"

import cl from "../styles/BookCard.module.css"

interface BookCardProps {
  title: string
  authors: string[]
  description: string
  coverImageUrl: string
}

export const BookCard: React.FC<BookCardProps> = ({
  title,
  authors,
  description,
  coverImageUrl,
}) => {
  const truncatedDescription =
    description.length > 100
      ? description.substring(0, 100) + "..."
      : description

  return (
    <div className={cl.card}>
      <img src={coverImageUrl} alt={`${title} cover`} className={cl.image} />
      <div className={cl.details}>
        <h2>{title}</h2>
        <h4>{authors.join(", ")}</h4>
        <p>{truncatedDescription}</p>
      </div>
    </div>
  )
}
