import { useEffect, useState } from "react";
import "./EntryCard.scss";

import { Entry } from "../../../../models/entry.model";
import { useActiveUser } from "../../../../hooks/useActiveUser";

const EntryCard = ({ id, image, text, date }: Entry) => {
  const { user, updateActiveUser } = useActiveUser();

  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (!user?.entries) return;
    const entry = user.entries.find((e) => e.id === id);
    setFavorite(entry?.isFavorite || false);
  }, [user, id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!user?.entries) return;

    const updatedEntries = user.entries.map((entry) =>
      entry.id === id ? { ...entry, isFavorite: !favorite } : entry
    );

    updateActiveUser({ entries: updatedEntries });
    setFavorite(!favorite);
  };

  // Formatear fecha para mostrar "Lunes, 5 de mayo"
  const formattedDate = new Date(date)
    .toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
    })
    .replace(/^\w/, (c) => c.toUpperCase());

  return (
    <div className="entry-card__container">
      <img className="entry-card__image" src={image} alt={text} />

      <div className="entry-card__text-container">
        <p className="entry-card__date">{formattedDate}</p>
        <p className="entry-card__text">{text}</p>
      </div>

      <div className="entry-card__icons">
        <span
          className={`material-symbols-rounded star-icon ${
            favorite ? "favorite" : ""
          }`}
          onClick={toggleFavorite}
        >
          star
        </span>
        <span className="material-symbols-rounded">expand_circle_down</span>
      </div>
    </div>
  );
};

export default EntryCard;
