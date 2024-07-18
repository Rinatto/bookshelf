import type React from "react"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "../components/AuthContext"
import { BookCard } from "../components/BookCard"
import { MyButton } from "../components/UI/MyButton/MyButton"
import { storageService } from "../services/storageService"

import st from "../styles/Favorites.module.css"

interface Book {
  imageUrl: string
  id: string
  title: string
  authors: string[]
  description: string
  coverImageUrl?: string
}

export const Favorites: React.FC = () => {
  const { isAuth, user } = useContext(AuthContext)
  const [favorites, setFavorites] = useState<string[]>([])
  const [books, setBooks] = useState<Book[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuth || !user) {
      navigate("/signin")
      return
    }

    const favIds = storageService.getFavorites(user.email)
    setFavorites(favIds)
    fetchFavoriteBooks(favIds)
  }, [isAuth, user, navigate])

  async function fetchFavoriteBooks(favIds: string[]) {
    const booksData = await Promise.all(
      favIds.map(id =>
        fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
          .then(res => res.json())
          .then(data => ({
            id: data.id,
            title: data.volumeInfo.title,
            authors: data.volumeInfo.authors || ["Unknown author"],
            description:
              data.volumeInfo.description || "No description available.",
            imageUrl: data.volumeInfo.imageLinks?.thumbnail || "",
          })),
      ),
    )
    setBooks(booksData)
  }

  const removeFromFavorites = (id: string) => {
    if (user) {
      const updatedFavorites = favorites.filter(favId => favId !== id)
      storageService.saveFavorites(user.email, updatedFavorites)
      setFavorites(updatedFavorites)
      setBooks(books.filter(book => book.id !== id))
    }
  }

  const clearFavorites = () => {
    if (user) {
      storageService.saveFavorites(user.email, [])
      setFavorites([])
      setBooks([])
    }
  }

  return (
    <div>
      <h1>Избранные книги</h1>
      {favorites.length > 0 ? (
        <MyButton label="Очистить избранное" onClick={clearFavorites} />
      ) : (
        <p>Добавьте книги в избранное</p>
      )}
      <div className={st.cardsContainer}>
        {books.map(book => (
          <BookCard
            key={book.id}
            id={book.id}
            title={book.title}
            authors={book.authors}
            description={book.description}
            coverImageUrl={book.imageUrl}
            onRemove={() => removeFromFavorites(book.id)}
          />
        ))}
      </div>
    </div>
  )
}
