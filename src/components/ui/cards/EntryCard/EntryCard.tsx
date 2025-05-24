import { useEffect, useState } from "react";
import "./EntryCard.scss";

// Tipos y hooks
import { Entry } from "../../../../models/entry.model";
import { useActiveUser } from "../../../../hooks/useActiveUser";

const EntrieCard = ({ id, image, text, date }: Entry) => {
  const { user, updateActiveUser } = useActiveUser();

  // Estado local para marcar si la entrada es favorita
  const [favorite, setFavorite] = useState(false);

  // Cuando el componente se monta o el usuario cambia,
  // sincroniza el estado local con los datos del usuario activo
  useEffect(() => {
    if (!user?.entries) return;
    const entry = user.entries.find((e) => e.id === id);
    setFavorite(entry?.isFavorite || false);
  }, [user, id]);

  // Alterna el estado de favorito y actualiza al usuario activo
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que se propague el clic a elementos padres

    if (!user?.entries) return;

    // Actualiza la entrada específica en el array del usuario
    const updatedEntries = user.entries.map((entry) =>
      entry.id === id ? { ...entry, isFavorite: !favorite } : entry
    );

    updateActiveUser({ entries: updatedEntries });
    setFavorite(!favorite); // Actualiza el estado local
  };

  return (
    <div className="entrie-card__container">
      {/* Imagen de la entrada */}
      <img className="entrie-card__image" src={image} alt={text} />

      {/* Contenedor de texto */}
      <div className="entrie-card__text-container">
        <p className="entrie-card__date">{date}</p>
        <p className="entrie-card__text">{text}</p>
      </div>

      {/* Iconos de interacción */}
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
