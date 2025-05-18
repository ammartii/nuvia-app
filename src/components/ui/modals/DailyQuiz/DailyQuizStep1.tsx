import "./DailyQuiz.scss";
import moodList from "../../../../constants/moodList";

type DailyQuizStep1Props = {
  selectedMoodIndex: number | null; // Índice del estado de ánimo seleccionado
  setSelectedMoodIndex: (index: number) => void; // Función para actualizar la selección
};

const DailyQuizStep1 = ({
  selectedMoodIndex,
  setSelectedMoodIndex,
}: DailyQuizStep1Props) => {
  return (
    <div className="step__container">
      {/* Título del paso */}
      <div className="step__tittle">
        <h3>¿Cómo te sientes hoy?</h3>
      </div>

      {/* Contenido principal: estado de ánimo seleccionado y opciones */}
      <div className="step1__content">
        {/* Muestra el icono grande y texto del estado de ánimo seleccionado */}
        {selectedMoodIndex !== null && (
          <div className="big-icon">
            <img
              src={moodList[selectedMoodIndex].image}
              alt={moodList[selectedMoodIndex].text}
            />
            <span>{moodList[selectedMoodIndex].text}</span>
          </div>
        )}

        {/* Muestra todos los estados de ánimo como iconos pequeños para seleccionar */}
        <div className="small-icons">
          {moodList.map((mood, index) => {
            const isSelected = selectedMoodIndex === index;

            return (
              <div
                key={index}
                className={`small-icon ${isSelected ? "selected" : ""}`}
                onClick={() => setSelectedMoodIndex(index)} // Actualiza selección al hacer click
              >
                <img src={mood.image} alt={mood.text} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DailyQuizStep1;
