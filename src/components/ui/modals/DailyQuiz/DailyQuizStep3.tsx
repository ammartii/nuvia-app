import "./DailyQuiz.scss";
import Button from "../../buttons/Button";

type DailyQuizStep3Props = {
  onFinish: () => void; // Función para finalizar el quiz
  onAddNote: () => void; // Abre el modal para crear nota
};

const DailyQuizStep3 = ({ onFinish, onAddNote }: DailyQuizStep3Props) => {
  return (
    <div className="step__container">
      {/* Título del paso */}
      <div className="step__tittle">
        <h3>¿Quieres registrar algún pensamiento hoy?</h3>
      </div>

      {/* Botones para crear una nota o finalizar el quiz */}
      <div className="step3__content">
        <Button variant="outline" onClick={onAddNote}>
          Crear nota
        </Button>
        <Button variant="purple" onClick={onFinish}>
          Finalizar
        </Button>
      </div>
    </div>
  );
};

export default DailyQuizStep3;
