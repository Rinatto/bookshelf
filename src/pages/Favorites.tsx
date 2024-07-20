import type React from "react"
import { useEffect, useState } from "react"

import { useAppDispatch, useAppSelector } from "../app/hooks"
import { BookCard } from "../components/BookCard"
import { MyButton } from "../components/UI/MyButton/MyButton"
import { setFavorites } from "../features/auth/authSlice"
import { getFavorites, getUser } from "../features/auth/selectors"
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
  const user = useAppSelector(getUser)
  const favorites = useAppSelector(getFavorites)
  const dispatch = useAppDispatch()
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    if (user) {
      fetchFavoriteBooks(favorites)
    }
  }, [user, favorites])

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
    const updatedFavorites = favorites.filter(favId => favId !== id)
    dispatch(setFavorites(updatedFavorites))
    storageService.saveFavorites(user?.email || "", updatedFavorites)
    setBooks(books.filter(book => book.id !== id))
  }

  const clearFavorites = () => {
    if (user) {
      storageService.clearFavorites(user.email)
      dispatch(setFavorites([]))
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
