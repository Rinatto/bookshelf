import type React from "react"
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { MyButton } from "./UI/MyButton/MyButton";
import { AuthContext } from "./AuthContext";

import cl from "../styles/BookCard.module.css"

interface BookCardProps {
  id: string;
  title: string;
  authors: string[];
  description: string;
  coverImageUrl: string;
  onRemove?: () => void; 
}

export const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  authors,
  description,
  coverImageUrl,
  onRemove,
}) => {
  const { isAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddToFavorites = () => {
    if (!isAuth) {
      navigate('/signin');
      return;
    }
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favorites.includes(id)) {
      favorites.push(id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  };

  const truncatedDescription = description.length > 100 ? description.substring(0, 100) + "..." : description;

  return (
    <div className={cl.card}>
      <img src={coverImageUrl} alt={`${title} cover`} className={cl.image} />
      <div className={cl.details}>
        <h2>{title}</h2>
        <h4>{authors.join(", ")}</h4>
        <p>{truncatedDescription}</p>
        <MyButton label="Добавить в избранное" onClick={handleAddToFavorites} />
        {onRemove && <MyButton label="Убрать из избранного" onClick={onRemove} />}
      </div>
    </div>
  );
};