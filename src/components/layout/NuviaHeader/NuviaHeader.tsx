import "./NuviaHeader.scss";

// Tipado de props del componente
interface NuviaHeaderProps {
  title: string; // Título que se mostrará en el header
}

// Componente del encabezado superior de la app
const NuviaHeader = ({ title }: NuviaHeaderProps) => {
  return (
    <div className="nuvia-header__container">
      <header className="profile__header">
        {/* Icono decorativo de nube a la izquierda */}
        <div className="profile__icons">
          <div className="profile__cloud-icon" />
        </div>

        {/* Título dinámico del header */}
        <span className="nuvia-header__title">{title}</span>

        {/* Iconos de notificaciones y ajustes a la derecha */}
        <div className="profile__icons">
          <span className="material-symbols-rounded">notifications</span>
          <span className="material-symbols-rounded">settings</span>
        </div>
      </header>
    </div>
  );
};

export default NuviaHeader;
