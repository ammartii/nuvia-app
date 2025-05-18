import { useEffect, useState } from "react";
import "./EntrieCard.scss";
import { Entrie } from "../../../../models/entrie.model";
import { useActiveUser } from "../../../../hooks/useActiveUser";

const EntrieCard = ({ id, image, text, date }: Entrie) => {
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

  return (
    <div className="entrie-card__container">
      <img className="entrie-card__image" src={image} alt={text} />
      <div className="entrie-card__text-container">
        <p className="entrie-card__date">{date}</p>
        <p className="entrie-card__text">{text}</p>
      </div>
      <div className="entrie-card__icons">
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

export default EntrieCard;
