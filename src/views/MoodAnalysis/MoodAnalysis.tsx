import MonthSelector from "../../components/layout/MonthSelector/MonthSelector";
import Nav from "../../components/layout/Nav/Nav";
import NuviaHeader from "../../components/layout/NuviaHeader/NuviaHeader";
import GoToAppModal from "../../components/ui/modals/GoToApp/GoToApp";

import activities from "../../constants/activitiesList";
import moodList from "../../constants/moodList";

import "./MoodAnalysis.scss";
import { useActiveUser } from "../../hooks/useActiveUser";

const MoodAnalysis = () => {
  // Obtener usuario activo y sus entradas
  const { user } = useActiveUser();
  const entries = user?.entries || [];

  // Contar ocurrencias de cada estado de ánimo en las entradas
  const moodCounts = moodList.map((mood) => {
    const count = entries.filter((entry) => entry.text === mood.text).length;
    return { ...mood, count };
  });

  // Contar ocurrencias de cada actividad en las entradas
  const activityCounts = activities.map((activity) => {
    const count = entries.reduce((acc, entry) => {
      return entry.activities?.includes(activity.text) ? acc + 1 : acc;
    }, 0);
    return { ...activity, count };
  });

  return (
    <>
      {/* Modal para desktop */}
      <GoToAppModal />

      {/* Header personalizado */}
      <NuviaHeader title="Mood Analysis" />

      <div className="mood-analysis-page">
        {/* Selector de mes */}
        <MonthSelector />

        {/* Selector de intervalo (por ahora solo visual) */}
        <div className="analysis-selector">
          <span>Semanal</span>
          <span className="selected">Mensual</span>
        </div>

        {/* Card con flujo de estado de ánimo */}
        <div className="mood-analysis__container">
          <h2 className="mood-analysis__title">Flujo de humor</h2>

          <div className="mood-analysis-card__flow">
            {/* Mostrar mensaje si no hay entradas */}
            {entries.length === 0 ? (
              <p className="no-things-text ">
                No se han registrado entradas todavía.
              </p>
            ) : (
              // Mostrar iconos de estado de ánimo con conteo si hay entradas
              moodCounts
                .filter((icon) => icon.count > 0)
                .map((icon, idx) => (
                  <div key={`flow-${idx}`} className="mood-icon__container">
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

        {/* Card con ranking de actividades */}
        <div className="mood-analysis__container">
          <h2 className="mood-analysis__title">Ranking de iconos</h2>

          <div className="mood-analysis-card__ranking">
            {/* Mostrar mensaje si no hay entradas */}
            {entries.length === 0 ? (
              <p className="no-things-text ">
                No se han registrado entradas todavía.
              </p>
            ) : (
              // Mostrar iconos de actividad con conteo si hay entradas
              activityCounts
                .filter((icon) => icon.count > 0)
                .map((icon, idx) => (
                  <div key={`rank-${idx}`} className="mood-icon__container">
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

      {/* Navegación inferior */}
      <Nav />
    </>
  );
};

export default MoodAnalysis;
