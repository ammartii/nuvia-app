import "./DailyQuiz.scss";
import Button from "../../buttons/Button";

type DailyQuizStep3Props = {
  onFinish: () => void; // Función para finalizar el quiz
};

const DailyQuizStep3 = ({ onFinish }: DailyQuizStep3Props) => {
  return (
    <div className="step__container">
      {/* Título del paso */}
      <div className="step__tittle">
        <h3>¿Quieres registrar algún pensamiento hoy?</h3>
      </div>

      {/* Botones para crear una nota o finalizar el quiz */}
      <div className="step3__content">
        <Button
          variant="outline"
          onClick={() => alert("Vamos a crear una nota")} // Placeholder para función crear nota
        >
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
