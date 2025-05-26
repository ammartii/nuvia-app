import "./MonthSelector.scss";

type MonthSelectorProps = {
  month: number; // 0 a 11
  year: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
};

const MonthSelector = ({
  month,
  year,
  onPrevMonth,
  onNextMonth,
}: MonthSelectorProps) => {
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
      <button
        onClick={onPrevMonth}
        aria-label="Mes anterior"
        className="material-symbols-rounded"
      >
        chevron_left
      </button>
      <p>{`${months[month]} de ${year}`}</p>
      <button
        onClick={onNextMonth}
        aria-label="Mes siguiente"
        className="material-symbols-rounded"
      >
        chevron_right
      </button>
    </div>
  );
};

export default MonthSelector;

/* 

ESTE ES EL QUE FUNCIONABA ANTES

const MonthSelector = () => {
  // Obtener la fecha actual
  const date = new Date();

  // Array con los nombres de los meses en español
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

  // Obtener el mes y el año actuales
  const currentMonth = months[date.getMonth()];
  const currentYear = date.getFullYear();

  return (
    <div className="month-selector__container">
      <span className="material-symbols-rounded">chevron_left</span>
      <p>{`${currentMonth} de ${currentYear}`}</p>
      <span className="material-symbols-rounded">chevron_right</span>
    </div>
  );
};

export default MonthSelector;

*/
