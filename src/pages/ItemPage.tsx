import type React from "react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import DOMPurify from "dompurify"

import { useAppDispatch, useAppSelector } from "../app/hooks"
import type { RootState } from "../app/store"
import { Loader } from "../components/UI/Loader/Loader"
import { MyButton } from "../components/UI/MyButton/MyButton"
import { addFavorite, removeFavorite } from "../features/auth/authSlice"
import { storageService } from "../services"

interface Book {
  id: string
  title: string
  authors: string[]
  description: string
  imageUrl: string
}

export const ItemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const isAuth = useAppSelector((state: RootState) => state.auth.isAuth)
  const user = useAppSelector((state: RootState) => state.auth.user)
  const favorites = useAppSelector((state: RootState) => state.auth.favorites)
  const [isFavorite, setIsFavorite] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!id) {
      navigate("/")
      return
    }

    const fetchBook = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${id}`,
        )
        const data = await response.json()
        const bookData: Book = {
          id: data.id,
          title: data.volumeInfo.title,
          authors: data.volumeInfo.authors || [],
          description: DOMPurify.sanitize(
            data.volumeInfo.description || "No description available.",
          ),
          imageUrl: data.volumeInfo.imageLinks?.thumbnail || "",
        }
        setBook(bookData)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }

    fetchBook()
  }, [id, navigate])

  useEffect(() => {
    if (user) {
      const favorites = storageService.getFavorites(user.email)
      setIsFavorite(favorites.includes(id!))
    }
  }, [id, user])

  const handleFavoriteClick = () => {
    if (!isAuth || !user) {
      navigate("/signin")
      return
    }

    if (favorites.includes(id!)) {
      dispatch(removeFavorite(id!))
      setIsFavorite(false)
    } else {
      dispatch(addFavorite(id!))
      setIsFavorite(true)
    }
  }

  if (loading) {
    return <Loader />
  }

  if (!book) {
    return <p>Book not found.</p>
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <img src={book.imageUrl} alt={book.title} />
      <p>
        <strong>Authors:</strong> {book.authors.join(", ")}
      </p>
      <p>{book.description}</p>
      <MyButton
        label={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
        onClick={handleFavoriteClick}
      />
    </div>
  )
}
