import { useEffect, useState } from "react";
import "./FeaturedDays.scss";
import Nav from "../../components/layout/Nav/Nav";
import NuviaHeader from "../../components/layout/NuviaHeader/NuviaHeader";
import EntrieCard from "../../components/ui/cards/EntrieCard/EntrieCard";
import GoToAppModal from "../../components/ui/modals/GoToApp/GoToApp";

import { useActiveUser } from "../../hooks/useActiveUser";
import { Entrie } from "../../models/entrie.model";

const FeaturedDays = () => {
  const { user } = useActiveUser();
  const [favorites, setFavorites] = useState<Entrie[]>([]);

  useEffect(() => {
    if (!user?.entries) return;
    const favs = user.entries.filter((entry) => entry.isFavorite);
    setFavorites(favs);
  }, [user]);

  return (
    <div className="featured-days-container">
      <GoToAppModal />
      <NuviaHeader title="Días importantes" />

      <div className="entries__container">
        {favorites.length === 0 ? (
          <p>No hay entradas favoritas aún.</p>
        ) : (
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

      <Nav />
    </div>
  );
};

export default FeaturedDays;
