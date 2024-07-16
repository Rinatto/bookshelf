import type React from "react"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import DOMPurify from "dompurify"

import { AuthContext } from "../components/AuthContext"
import { Loader } from "../components/UI/Loader/Loader"
import { MyButton } from "../components/UI/MyButton/MyButton"

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
  const [isFavorite, setIsFavorite] = useState(false)
  const { isAuth, user } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
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
  }, [id])

  useEffect(() => {
    if (user) {
      const favorites = JSON.parse(
        localStorage.getItem(`${user.email}-favorites`) || "[]",
      )
      if (favorites.includes(id)) {
        setIsFavorite(true)
      }
    }
  }, [id, user])

  const handleFavoriteClick = () => {
    if (!isAuth || !user) {
      navigate("/signin")
      return
    }

    const favoritesKey = `${user.email}-favorites`
    const favorites = JSON.parse(localStorage.getItem(favoritesKey) || "[]")
    if (favorites.includes(id)) {
      const updatedFavorites = favorites.filter((favId: string) => favId !== id)
      localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites))
      setIsFavorite(false)
    } else {
      favorites.push(id)
      localStorage.setItem(favoritesKey, JSON.stringify(favorites))
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
