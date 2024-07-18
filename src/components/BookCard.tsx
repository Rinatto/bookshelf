import type React from "react"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { storageService } from "../services/storageService"

import { MyButton } from "./UI/MyButton/MyButton"
import { AuthContext } from "./AuthContext"

import cl from "../styles/BookCard.module.css"

interface BookCardProps {
  id: string
  title: string
  authors: string[]
  description: string
  coverImageUrl: string
  onRemove?: () => void
}

export const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  authors,
  description,
  coverImageUrl,
  onRemove,
}) => {
  const { isAuth, user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [isFavorite, setIsFavorite] = useState(false)

  const goToItemPage = () => {
    navigate(`/books/${id}`)
  }

  useEffect(() => {
    if (user) {
      const favorites = storageService.getFavorites(user.email)
      setIsFavorite(favorites.includes(id))
    }
  }, [id, user])

  const handleToggleFavorite = () => {
    if (!isAuth || !user) {
      navigate("/signin")
      return
    }
    const favorites = storageService.getFavorites(user.email)
    if (favorites.includes(id)) {
      const newFavorites = favorites.filter((favId: string) => favId !== id)
      storageService.saveFavorites(user.email, newFavorites)
      setIsFavorite(false)
    } else {
      favorites.push(id)
      storageService.saveFavorites(user.email, favorites)
      setIsFavorite(true)
    }
  }

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
        <MyButton
          label={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
          onClick={handleToggleFavorite}
          className={isFavorite ? cl.favorite : cl.notFavorite}
        />
        <MyButton
          label="Подробнее"
          onClick={e => {
            e.stopPropagation()
            goToItemPage()
          }}
          className={cl.viewDetails}
        />
      </div>
    </div>
  )
}
