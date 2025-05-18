import "./DailyQuiz.scss";
import activities from "../../../../constants/activitiesList";

type DailyQuizStep2Props = {
  selectedActivities: string[]; // Lista de actividades seleccionadas
  setSelectedActivities: (activities: string[]) => void; // Función para actualizar la selección
};

const DailyQuizStep2 = ({
  selectedActivities,
  setSelectedActivities,
}: DailyQuizStep2Props) => {
  // Función para agregar o quitar una actividad de la selección
  const toggleActivity = (activityText: string) => {
    if (selectedActivities.includes(activityText)) {
      // Si ya está seleccionada, la quitamos
      setSelectedActivities(
        selectedActivities.filter((act) => act !== activityText)
      );
    } else {
      // Si no está, la agregamos
      setSelectedActivities([...selectedActivities, activityText]);
    }
  };

  return (
    <div className="step__container">
      {/* Título del paso */}
      <div className="step__tittle">
        <h3>¿Qué ha hecho que te sientas así?</h3>
      </div>

      {/* Lista de actividades disponibles para seleccionar */}
      <div className="activities-list">
        {activities.map((activity, idx) => (
          <div
            key={idx}
            className={`activity-item ${
              selectedActivities.includes(activity.text) ? "selected" : ""
            }`}
            onClick={() => toggleActivity(activity.text)} // Selecciona/deselecciona actividad
          >
            <img src={activity.image} alt={activity.text} />
            <span>{activity.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyQuizStep2;
