import "./EntryCard.scss";
import { useEffect, useState } from "react";
import { Entry } from "../../../../models/entry.model";
import { useActiveUser } from "../../../../hooks/useActiveUser";

// Componente que representa una tarjeta individual de entrada
const EntryCard = ({ id, image, text, date }: Entry) => {
  const { user, updateActiveUser } = useActiveUser(); // Obtener el usuario activo y función para actualizarlo

  const [favorite, setFavorite] = useState(false); // Estado local para marcar como favorito

  // Sincroniza el estado local "favorite" cuando cambia el usuario o el ID de la entrada
  useEffect(() => {
    if (!user?.entries) return;

    const entry = user.entries.find((e) => e.id === id);
    setFavorite(entry?.isFavorite || false);
  }, [user, id]);

  // Alternar el estado de favorito para esta entrada
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevenir propagación del evento

    if (!user?.entries) return;

    // Crear una nueva lista de entradas con el estado de favorito actualizado
    const updatedEntries = user.entries.map((entry) =>
      entry.id === id ? { ...entry, isFavorite: !favorite } : entry
    );

    // Actualizar el usuario activo y el estado local
    updateActiveUser({ entries: updatedEntries });
    setFavorite(!favorite);
  };

  // Formatear la fecha en formato largo en español: "Lunes, 5 de mayo"
  const formattedDate = new Date(date)
    .toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
    })
    .replace(/^\w/, (c) => c.toUpperCase()); // Capitaliza la primera letra

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
