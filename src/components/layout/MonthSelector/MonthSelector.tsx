// Importa los estilos específicos del componente
import "./MonthSelector.scss";

// Define los tipos de las props que recibe el componente
type MonthSelectorProps = {
  month: number;
  year: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
};

// Componente funcional para seleccionar el mes y año
const MonthSelector = ({
  month,
  year,
  onPrevMonth,
  onNextMonth,
}: MonthSelectorProps) => {
  // Lista de nombres de los meses en español
  const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  return (
    <div className="month-selector__container">
      {/* Botón para ir al mes anterior */}
      <button
        onClick={onPrevMonth}
        aria-label="Mes anterior"
        className="material-symbols-rounded btn-selector"
      >
        chevron_left
      </button>

      {/* Muestra el nombre del mes y el año */}
      <p>{`${months[month]} de ${year}`}</p>

      {/* Botón para ir al mes siguiente */}
      <button
        onClick={onNextMonth}
        aria-label="Mes siguiente"
        className="material-symbols-rounded btn-selector"
      >
        chevron_right
      </button>
    </div>
  );
};

export default MonthSelector;
