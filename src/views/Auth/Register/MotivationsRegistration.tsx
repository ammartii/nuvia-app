import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../AuthCommon.scss";
import { useActiveUser } from "../../../hooks/useActiveUser";
import { MotivationItem } from "../../../models/motivation.model";
import motivations from "../../../constants/motivationList";
import MotivationCard from "../../../components/ui/cards/MotivationCard/MotivationCard";
import Button from "../../../components/ui/buttons/Button";

const MotivationsRegistration = () => {
  const navigate = useNavigate();
  const { user, updateActiveUser } = useActiveUser();

  // Estado para las motivaciones seleccionadas (por texto)
  const [selectedMotivationsTexts, setSelectedMotivationsTexts] = useState<
    string[]
  >([]);

  // Controla si ya se verificó el usuario activo
  const [checked, setChecked] = useState(false);

  // Marcar como verificado al montar
  useEffect(() => {
    setChecked(true);
  }, [user]);

  // Si no hay usuario activo tras el chequeo, redirige
  useEffect(() => {
    if (checked && !user) {
      alert("No se encontró usuario activo. Vuelve al paso anterior.");
      navigate("/profile-registration");
    }
  }, [checked, user, navigate]);

  // Mostrar mensaje de carga mientras se valida el usuario
  if (!checked || user === null) {
    return <p>Cargando usuario activo...</p>;
  }

  // Alterna selección/deselección de una motivación
  const toggleMotivation = (text: string) => {
    setSelectedMotivationsTexts((prev) =>
      prev.includes(text) ? prev.filter((mot) => mot !== text) : [...prev, text]
    );
  };

  // Guardar motivaciones seleccionadas y avanzar
  const handleRegister = () => {
    if (selectedMotivationsTexts.length === 0) {
      alert("Selecciona al menos una motivación para continuar.");
      return;
    }

    if (!user) return;

    // Obtener los objetos MotivationItem a partir de los textos seleccionados
    const selectedMotivationsObjects: MotivationItem[] = motivations.filter(
      (motivation) => selectedMotivationsTexts.includes(motivation.text)
    );

    try {
      updateActiveUser({ motivations: selectedMotivationsObjects });
      alert("¡Motivaciones guardadas!");
      navigate("/welcome");
    } catch {
      alert("Error guardando motivaciones.");
    }
  };

  return (
    <div className="auth-form-steps">
      <div className="auth-form-steps__container">
        <h2 className="auth-form__title">Selecciona tu motivación</h2>
        <h3 className="auth-form__subtitle">
          Selecciona las motivaciones que te refuercen y te mantengan en el
          camino.
        </h3>

        {/* Lista de motivaciones */}
        <div className="auth-form-steps__content">
          {motivations.map((motivation: MotivationItem, index: number) => (
            <MotivationCard
              key={index}
              image={motivation.image}
              text={motivation.text}
              isSelected={selectedMotivationsTexts.includes(motivation.text)}
              onClick={() => toggleMotivation(motivation.text)}
            />
          ))}
        </div>

        {/* Botón para guardar motivaciones y continuar */}
        <Button variant="primary" onClick={handleRegister}>
          ¡Empezar viaje!
        </Button>
      </div>
    </div>
  );
};

export default MotivationsRegistration;
