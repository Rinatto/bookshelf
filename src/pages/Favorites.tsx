import type React from 'react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../components/AuthContext';
import { BookCard } from '../components/BookCard';
import { MyButton } from '../components/UI/MyButton/MyButton';

interface Book {
  imageUrl: string;
  id: string;
  title: string;
  authors: string[];
  description: string;
  coverImageUrl?: string;
}

export const Favorites: React.FC = () => {
  const { isAuth } = useContext(AuthContext);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate('/signin');
      return;
    }

    const loadFavorites = () => {
      const favIds = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavorites(favIds);
      fetchFavoriteBooks(favIds);
    };

    loadFavorites();

    async function fetchFavoriteBooks(favIds: string[]) {
      const booksData = await Promise.all(
        favIds.map(id =>
          fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
            .then(res => res.json())
            .then(data => ({
              id: data.id,
              title: data.volumeInfo.title,
              authors: data.volumeInfo.authors || ['Unknown author'],
              description: data.volumeInfo.description || 'No description available.',
              imageUrl: data.volumeInfo.imageLinks?.thumbnail || '',
            }))
        )
      );
      setBooks(booksData);
    }
  }, [isAuth, navigate]);

  const removeFromFavorites = (id: string) => {
    const updatedFavorites = favorites.filter(favId => favId !== id);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
    setBooks(books.filter(book => book.id !== id));
  };

  const clearFavorites = () => {
    localStorage.removeItem('favorites');
    setFavorites([]);
    setBooks([]);
  };

  return (
    <div>
      <h1>Your Favorites</h1>
      {favorites.length > 0 ? (
        <MyButton label="Clear Favorites" onClick={clearFavorites} />
      ) : (
        <p>No favorite books added yet.</p>
      )}
      <div>
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
  );
};
