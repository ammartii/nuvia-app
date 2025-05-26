import { useState } from "react";
import MonthSelector from "../../components/layout/MonthSelector/MonthSelector";
import Nav from "../../components/layout/Nav/Nav";
import NuviaHeader from "../../components/layout/NuviaHeader/NuviaHeader";
import GoToAppModal from "../../components/ui/modals/GoToApp/GoToApp";

import activities from "../../constants/activitiesList";
import moodList from "../../constants/moodList";

import "./MoodAnalysis.scss";
import { useActiveUser } from "../../hooks/useActiveUser";

const MoodAnalysis = () => {
  // Estado para controlar mes, año y filtro (semana/mes)
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [filter, setFilter] = useState<"semana" | "mes">("mes");

  // Cambios de mes para MonthSelector
  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  // Función para obtener número de semana ISO
  const getWeekNumber = (date: Date) => {
    const tempDate = new Date(date.getTime());
    tempDate.setHours(0, 0, 0, 0);
    // Jueves de la semana
    tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7));
    const week1 = new Date(tempDate.getFullYear(), 0, 4);
    return (
      1 +
      Math.round(
        ((tempDate.getTime() - week1.getTime()) / 86400000 -
          3 +
          ((week1.getDay() + 6) % 7)) /
          7
      )
    );
  };

  // Obtener usuario activo y sus entradas
  const { user } = useActiveUser();
  const entries = user?.entries || [];

  // Filtrar entradas según filtro seleccionado
  const filteredEntries = entries.filter((entry) => {
    const entryDate = new Date(entry.date);

    if (filter === "mes") {
      // Filtrar por mes y año
      return entryDate.getMonth() === month && entryDate.getFullYear() === year;
    } else {
      // Filtrar por semana y año
      const today = new Date();
      const selectedWeek = getWeekNumber(
        new Date(year, month, today.getDate())
      );
      const entryWeek = getWeekNumber(entryDate);
      return entryWeek === selectedWeek && entryDate.getFullYear() === year;
    }
  });

  // Contar ocurrencias de cada estado de ánimo en las entradas filtradas
  const moodCounts = moodList.map((mood) => {
    const count = filteredEntries.filter(
      (entry) => entry.text === mood.text
    ).length;
    return { ...mood, count };
  });

  // Contar ocurrencias de cada actividad en las entradas filtradas
  const activityCounts = activities.map((activity) => {
    const count = filteredEntries.reduce((acc, entry) => {
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
        {/* Selector de mes con props */}
        <MonthSelector
          month={month}
          year={year}
          onPrevMonth={prevMonth}
          onNextMonth={nextMonth}
        />

        {/* Selector de intervalo funcional */}
        <div className="analysis-selector">
          <span
            className={filter === "semana" ? "selected" : ""}
            onClick={() => setFilter("semana")}
            style={{ cursor: "pointer" }}
          >
            Semanal
          </span>
          <span
            className={filter === "mes" ? "selected" : ""}
            onClick={() => setFilter("mes")}
            style={{ cursor: "pointer" }}
          >
            Mensual
          </span>
        </div>

        {/* Card con flujo de estado de ánimo */}
        <div className="mood-analysis__container">
          <h2 className="mood-analysis__title">Flujo de humor</h2>

          <div className="mood-analysis-card__flow">
            {filteredEntries.length === 0 ? (
              <p className="no-things-text ">
                No se han registrado entradas todavía.
              </p>
            ) : (
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
            {filteredEntries.length === 0 ? (
              <p className="no-things-text ">
                No se han registrado entradas todavía.
              </p>
            ) : (
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
