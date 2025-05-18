import MonthSelector from "../../components/layout/MonthSelector/MonthSelector";
import Nav from "../../components/layout/Nav/Nav";
import NuviaHeader from "../../components/layout/NuviaHeader/NuviaHeader";
import GoToAppModal from "../../components/ui/modals/GoToApp/GoToApp";
import activities from "../../constants/activitiesList";
import moodList from "../../constants/moodList";

import "./MoodAnalysis.scss";
import { useActiveUser } from "../../hooks/useActiveUser";

const MoodAnalysis = () => {
  const { user } = useActiveUser();
  const entries = user?.entries || [];

  const moodCounts = moodList.map((mood) => {
    const count = entries.filter((entry) => entry.text === mood.text).length;
    return { ...mood, count };
  });

  const activityCounts = activities.map((activity) => {
    const count = entries.reduce((acc, entry) => {
      return entry.activities?.includes(activity.text) ? acc + 1 : acc;
    }, 0);
    return { ...activity, count };
  });

  return (
    <div>
      <GoToAppModal />
      <NuviaHeader title="Mood Analysis" />
      <div className="mood-analysis-page">
        <MonthSelector />
        <div className="analysis-selector">
          <span className="selected">Semanal</span>
          <span>Mensual</span>
        </div>

        <div className="mood-card">
          <h2 className="mood-card__title">Flujo de humor</h2>
          <div className="mood-card__flow">
            {entries.length === 0 ? (
              <p>No se han registrado entradas todavía.</p>
            ) : (
              moodCounts
                .filter((icon) => icon.count > 0)
                .map((icon, idx) => (
                  <div key={`flow-${idx}`} className="mood-icon">
                    <img
                      src={icon.image}
                      alt={icon.text}
                      className="mood-icon__image"
                    />
                    <span className="mood-icon__count">{icon.count}</span>
                  </div>
                ))
            )}
          </div>
        </div>

        <div className="mood-card">
          <h2 className="mood-card__title">Ranking de iconos</h2>
          <div className="mood-card__ranking">
            {entries.length === 0 ? (
              <p>No se han registrado entradas todavía.</p>
            ) : (
              activityCounts
                .filter((icon) => icon.count > 0)
                .map((icon, idx) => (
                  <div key={`rank-${idx}`} className="mood-icon">
                    <img
                      src={icon.image}
                      alt={icon.text}
                      className="mood-icon__image"
                    />
                    <span className="mood-icon__count">{icon.count}</span>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
      <Nav />
    </div>
  );
};

export default MoodAnalysis;
