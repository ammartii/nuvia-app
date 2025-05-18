import Nav from "../../components/layout/Nav/Nav";
import NuviaHeader from "../../components/layout/NuviaHeader/NuviaHeader";
import GoToAppModal from "../../components/ui/modals/GoToApp/GoToApp";
import "./Calendar.scss";

const Calendar = () => {
  return (
    <div className="calendar-container">
      {/* Modal para evitar ver la app en desktop */}
      <GoToAppModal />

      {/* Header personalizado */}
      <NuviaHeader title="Calendar" />

      {/* Navegador */}
      <Nav />
    </div>
  );
};

export default Calendar;
