import type React from 'react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../components/AuthContext';
import { BookCard } from '../components/BookCard';
import { MyButton } from '../components/UI/MyButton/MyButton';

interface Book {
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
    } else {
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    if (favorites.length > 0) {
      const fetchBooks = async () => {
        const fetchedBooks: Book[] = [];
        for (const id of favorites) {
          const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
          const data = await response.json();
          fetchedBooks.push({
            id: data.id,
            title: data.volumeInfo.title,
            authors: data.volumeInfo.authors,
            description: data.volumeInfo.description || '',
            coverImageUrl: data.volumeInfo.imageLinks?.thumbnail,
          });
        }
        setBooks(fetchedBooks);
      };
      fetchBooks();
    }
  }, [favorites]);

  const removeFromFavorites = (id: string) => {
    const updatedFavorites = favorites.filter(favId => favId !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('favorites');
  };

  return (
    <div>
      <h1>Избранное</h1>
      <MyButton label="Очистить избранное" onClick={clearFavorites} />
      <div>
        {books.map(book => (
          <BookCard
            key={book.id}
            id={book.id}
            title={book.title}
            authors={book.authors}
            description={book.description}
            coverImageUrl={book.coverImageUrl || ''}
            onRemove={() => removeFromFavorites(book.id)}
          />
        ))}
      </div>
    </div>
  );
};
