import type React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../app/hooks"
import { addFavorite, removeFavorite } from "../features/auth/authSlice"
import {
  selectFavorites,
  selectIsAuth,
  selectUser,
} from "../features/auth/selectors"

import { MyButton } from "./UI/MyButton/MyButton"

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
  const isAuth = useAppSelector(selectIsAuth)
  const user = useAppSelector(selectUser)
  const favorites = useAppSelector(selectFavorites)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isFavorite, setIsFavorite] = useState(false)

  const goToItemPage = () => {
    navigate(`/books/${id}`)
  }

  useEffect(() => {
    if (user) {
      setIsFavorite(favorites.includes(id))
    }
  }, [id, user, favorites])

  const handleToggleFavorite = () => {
    if (!isAuth || !user) {
      navigate("/signin")
      return
    }
    if (favorites.includes(id)) {
      dispatch(removeFavorite(id))
      setIsFavorite(false)
    } else {
      dispatch(addFavorite(id))
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
