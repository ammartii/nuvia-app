import { useState } from "react";
import "./Achievements.scss";
import Nav from "../../components/layout/Nav/Nav";
import NuviaHeader from "../../components/layout/NuviaHeader/NuviaHeader";
import GoToAppModal from "../../components/ui/modals/GoToApp/GoToApp";
import AchievementCard from "../../components/ui/cards/AchievementCard/AchievementCard";
import AchievementPopup from "../../components/ui/modals/AchievementPopup/AchievementPopup";
import { achievementsData, Achievement } from "../../constants/achievements";

const Achievements = () => {
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);

  const sortedAchievements = [...achievementsData].sort((a, b) =>
    a.achieved === b.achieved ? 0 : a.achieved ? -1 : 1
  );

  return (
    <div>
      {/* Modal para evitar ver la app en desktop */}
      <GoToAppModal />

      {/* Header personalizado */}
      <NuviaHeader title="Logros" />

      {/* Contenido de la página */}
      <div className="achievements_container">
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

      {/* Popup de logro */}
      {selectedAchievement && (
        <AchievementPopup
          achievement={selectedAchievement}
          onClose={() => setSelectedAchievement(null)}
        />
      )}

      {/* Navegador */}
      <Nav />
    </div>
  );
};

export default Achievements;
