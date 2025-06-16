import { useEffect, useState } from "react";

import Nav from "../../components/layout/Nav/Nav";
import NuviaHeader from "../../components/layout/NuviaHeader/NuviaHeader";
import EntrieCard from "../../components/ui/cards/EntryCard/EntryCard";
import GoToAppModal from "../../components/ui/modals/GoToApp/GoToApp";

import { useActiveUser } from "../../hooks/useActiveUser";
import { Entry } from "../../models/entry.model";

const FeaturedDays = () => {
  // Obtener usuario activo con sus entradas
  const { user } = useActiveUser();

  // Estado local para almacenar entradas favoritas
  const [favorites, setFavorites] = useState<Entry[]>([]);

  // Filtrar las entradas favoritas al cargar el componente o cambiar el usuario
  useEffect(() => {
    if (!user?.entries) return;

    const favs = user.entries.filter((entry) => entry.isFavorite);
    setFavorites(favs);
  }, [user]);

  return (
    <>
      {/* Modal para evitar uso en escritorio */}
      <GoToAppModal />

      {/* Encabezado de la página */}
      <NuviaHeader title="Días importantes" />

      {/* Contenedor de entradas */}
      <div className="profile-subviews__container">
        <div className="entries__container">
          {favorites.length === 0 ? (
            // Mensaje si no hay favoritos
            <p className="no-things-text">No hay entradas favoritas aún.</p>
          ) : (
            // Mostrar tarjetas de entradas favoritas
            favorites.map((entry) => (
              <EntrieCard
                key={entry.id}
                id={entry.id}
                image={entry.image}
                text={entry.text}
                date={entry.date}
              />
            ))
          )}
        </div>
      </div>

      {/* Navegación inferior */}
      <Nav />
    </>
  );
};

export default FeaturedDays;
