// React & librerías externas
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Estilos y componentes propios
import "./Calendar.scss";

import Nav from "../../components/layout/Nav/Nav";
import NuviaHeader from "../../components/layout/NuviaHeader/NuviaHeader";
import GoToAppModal from "../../components/ui/modals/GoToApp/GoToApp";
import MonthSelector from "../../components/layout/MonthSelector/MonthSelector";

// Modelos y constantes
import { useActiveUser } from "../../hooks/useActiveUser";
import { Entry } from "../../models/entry.model";
import moodList from "../../constants/moodList";

const CalendarPage = () => {
  const { user } = useActiveUser();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [date, setDate] = useState<Date>(new Date()); // Fecha actualmente seleccionada

  useEffect(() => {
    if (user?.entries) {
      setEntries(user.entries);
    } else {
      setEntries([]);
    }
  }, [user]);

  // Filtra las entradas que coincidan exactamente con el día proporcionado
  const getEntriesForDate = (day: Date) => {
    return entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      return (
        entryDate.getFullYear() === day.getFullYear() &&
        entryDate.getMonth() === day.getMonth() &&
        entryDate.getDate() === day.getDate()
      );
    });
  };

  // Cambiar al mes anterior
  const prevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  // Cambiar al mes siguiente
  const nextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  return (
    <>
      <GoToAppModal />
      <NuviaHeader title="Calendar" />
      <div className="calendar-container">
        {/* Selector de mes personalizado */}
        <MonthSelector
          month={date.getMonth()}
          year={date.getFullYear()}
          onPrevMonth={prevMonth}
          onNextMonth={nextMonth}
        />

        {/* Componente calendario */}
        <Calendar
          value={date}
          onChange={(value) => {
            if (value instanceof Date) {
              setDate(value);
            } else if (Array.isArray(value) && value[0] instanceof Date) {
              setDate(value[0]);
            }
          }}
          showNavigation={false}
          tileClassName={({ date: tileDate, view }) => {
            if (view === "month") {
              const day = tileDate.getDay();
              const entriesForDay = getEntriesForDate(tileDate);

              const classes = [];

              if (entriesForDay.length > 0) {
                classes.push("calendar-tile-has-entry");
              }

              if (day === 0 || day === 6) {
                classes.push("calendar-weekend");
              }

              return classes.join(" ");
            }
            return "";
          }}
          tileContent={({ date: tileDate, view }) => {
            if (view !== "month") return null;

            const entriesForDay = getEntriesForDate(tileDate);
            if (entriesForDay.length === 0) return null;

            return (
              <div className="calendar-mood-icons-container">
                {entriesForDay.map((entry, idx) => {
                  const mood = moodList.find((m) => m.text === entry.text);
                  return mood ? (
                    <img
                      key={idx}
                      src={mood.image}
                      alt={mood.text}
                      className="calendar-mood-icon"
                    />
                  ) : null;
                })}
              </div>
            );
          }}
        />
      </div>
      <Nav />
    </>
  );
};

export default CalendarPage;
