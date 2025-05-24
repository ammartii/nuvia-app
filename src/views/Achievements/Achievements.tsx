import { useState } from "react";

import "./Achievements.scss";
import Nav from "../../components/layout/Nav/Nav";
import NuviaHeader from "../../components/layout/NuviaHeader/NuviaHeader";
import GoToAppModal from "../../components/ui/modals/GoToApp/GoToApp";
import AchievementPopup from "../../components/ui/modals/AchievementPopup/AchievementPopup";
import AchievementCard from "../../components/ui/cards/AchievementCard/AchievementCard";
import { achievementsData, Achievement } from "../../constants/achievements";

const Achievements = () => {
  // Estado para controlar el logro seleccionado en el popup
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  // Ordena los logros para mostrar primero los logrados
  const sortedAchievements = [...achievementsData].sort((a, b) =>
    a.achieved === b.achieved ? 0 : a.achieved ? -1 : 1
  );

  return (
    <div>
      {/* Modal para redirigir si se accede desde desktop */}
      <GoToAppModal />

      {/* Encabezado de la página */}
      <NuviaHeader title="Logros" />

      {/* Contenedor de las tarjetas de logros */}
      <div className="achievements__container">
        {sortedAchievements.map((ach, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedAchievement(ach)}
            style={{ cursor: "pointer" }}
          >
            <AchievementCard
              title={ach.title}
              subtitle={ach.subtitle}
              achieved={ach.achieved}
            />
          </div>
        ))}
      </div>

      {/* Popup con los detalles del logro seleccionado */}
      {selectedAchievement && (
        <AchievementPopup
          achievement={selectedAchievement}
          onClose={() => setSelectedAchievement(null)}
        />
      )}

      {/* Barra de navegación inferior */}
      <Nav />
    </div>
  );
};

export default Achievements;
