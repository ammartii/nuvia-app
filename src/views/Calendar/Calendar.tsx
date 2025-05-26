import { useEffect, useState } from "react";
import Nav from "../../components/layout/Nav/Nav";
import NuviaHeader from "../../components/layout/NuviaHeader/NuviaHeader";
import GoToAppModal from "../../components/ui/modals/GoToApp/GoToApp";
import CalendarView from "../../components/ui/other/CalendarView/CalendarView";
import { useActiveUser } from "../../hooks/useActiveUser";
import { Entry } from "../../models/entry.model";
import "./Calendar.scss";

const Calendar = () => {
  const { user } = useActiveUser();
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    if (user?.entries) {
      setEntries(user.entries);
    } else {
      setEntries([]);
    }
  }, [user]);

  return (
    <>
      {/* Modal para evitar ver la app en desktop */}
      <GoToAppModal />

      {/* Header personalizado */}
      <NuviaHeader title="Calendar" />

      {/* Contenido de la página */}
      <CalendarView entries={entries} />

      {/* Navegador */}
      <Nav />
    </>
  );
};

export default Calendar;
