import { useState } from "react";

import "./DailyQuiz.scss";
import DailyQuizStep1 from "./DailyQuizStep1";
import DailyQuizStep2 from "./DailyQuizStep2";
import DailyQuizStep3 from "./DailyQuizStep3";
import Button from "../../buttons/Button";
import useBodyScrollLock from "../../../../utils/bodyScrollLock";
import { Entrie } from "../../../../models/entrie.model";
import moodList from "../../../../constants/moodList";

type DailyQuizProps = {
  onClose: () => void;
  addNewEntrie: (newEntrie: Entrie) => void;
};

const DailyQuiz = ({ onClose, addNewEntrie }: DailyQuizProps) => {
  // Bloquea el scroll del body mientras el modal esté abierto
  useBodyScrollLock();

  // Estado para controlar el paso actual del quiz (1, 2 o 3)
  const [step, setStep] = useState(1);

  // Estado para el índice del estado de ánimo seleccionado
  const [selectedMoodIndex, setSelectedMoodIndex] = useState<number | null>(
    null
  );

  // Estado para las actividades seleccionadas
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  // Retrocede un paso o cierra el modal si está en el primer paso
  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else onClose();
  };

  // Finaliza el quiz creando una nueva entrada y cerrando el modal
  const handleFinish = () => {
    if (selectedMoodIndex === null) return; // Validación básica

    const mood = moodList[selectedMoodIndex];
    const id = Date.now().toString();

    const date = new Date().toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

    const newEntrie: Entrie = {
      id,
      image: mood.image,
      text: mood.text,
      date,
      activities: selectedActivities,
    };

    addNewEntrie(newEntrie);
    onClose();
  };

  return (
    <div className="dailyquiz__modal" onClick={(e) => e.stopPropagation()}>
      {/* Header con navegación y cierre */}
      <div className="dailyquiz-header__container">
        <span className="material-symbols-rounded" onClick={handleBack}>
          chevron_left
        </span>
        <span className="nuvia-header__title">Daily Quiz</span>
        <span className="material-symbols-rounded" onClick={onClose}>
          close
        </span>
      </div>

      {/* Contenido variable según el paso */}
      <div className="dailyquiz__content">
        {step === 1 && (
          <DailyQuizStep1
            selectedMoodIndex={selectedMoodIndex}
            setSelectedMoodIndex={setSelectedMoodIndex}
          />
        )}
        {step === 2 && (
          <DailyQuizStep2
            selectedActivities={selectedActivities}
            setSelectedActivities={setSelectedActivities}
          />
        )}
        {step === 3 && <DailyQuizStep3 onFinish={handleFinish} />}
      </div>

      {/* Botón para avanzar, oculto en último paso */}
      <div className="dailyquiz__actions">
        {step < 3 && (
          <Button variant="primary" onClick={() => setStep(step + 1)}>
            Siguiente
          </Button>
        )}
      </div>
    </div>
  );
};

export default DailyQuiz;
