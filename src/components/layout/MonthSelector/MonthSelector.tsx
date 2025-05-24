import "./MonthSelector.scss";

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
