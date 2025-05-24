import Nav from "../../components/layout/Nav/Nav";
import NuviaHeader from "../../components/layout/NuviaHeader/NuviaHeader";
import GoToAppModal from "../../components/ui/modals/GoToApp/GoToApp";

const Reports = () => {
  return (
    <>
      {/* Modal para evitar uso en escritorio */}
      <GoToAppModal />

      {/* Encabezado personalizado */}
      <NuviaHeader title="Informes" />

      {/* Contenedor de informes */}
      <div className="profile-subviews__container">
        {/* Mensaje por defecto si no hay informes */}
        <p className="no-things-text">No hay informes para mostrar.</p>
      </div>

      {/* Navegación inferior */}
      <Nav />
    </>
  );
};

export default Reports;
