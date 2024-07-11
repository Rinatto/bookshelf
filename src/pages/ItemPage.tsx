import type React from 'react';
import { useContext,useEffect, useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';

import { AuthContext } from '../components/AuthContext';
import { MyButton } from '../components/UI/MyButton/MyButton';

interface Book {
  id: string;
  title: string;
  authors: string[];
  description: string;
  imageUrl: string;
}

export const ItemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const { isAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
        const data = await response.json();
        const bookData: Book = {
          id: data.id,
          title: data.volumeInfo.title,
          authors: data.volumeInfo.authors || [],
          description: data.volumeInfo.description || 'No description available.',
          imageUrl: data.volumeInfo.imageLinks?.thumbnail || '',
        };
        setBook(bookData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleFavoriteClick = () => {
    if (!isAuth) {
      navigate('/signin');
      return;
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!book) {
    return <p>Book not found.</p>;
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <img src={book.imageUrl} alt={book.title} />
      <p><strong>Authors:</strong> {book.authors.join(', ')}</p>
      <p>{book.description}</p>
      <MyButton label="Add to Favorites" onClick={handleFavoriteClick} />
    </div>
  );
};
