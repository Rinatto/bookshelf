import type React from "react"

import { MyButton } from "./UI/MyButton/MyButton";

import cl from "../styles/BookCard.module.css"

interface BookCardProps {
  id: string;
  title: string;
  authors: string[];
  description: string;
  coverImageUrl: string;
  onRemove: () => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  authors,
  description,
  coverImageUrl,
  onRemove,
}) => {
  const truncatedDescription =
    description.length > 100 ? description.substring(0, 100) + "..." : description;

  return (
    <div className={cl.card}>
      <img src={coverImageUrl} alt={`${title} cover`} className={cl.image} />
      <div className={cl.details}>
        <h2>{title}</h2>
        <h4>{authors.join(", ")}</h4>
        <p>{truncatedDescription}</p>
        <MyButton label="Убрать из избранного" onClick={onRemove} />
      </div>
    </div>
  );
};
