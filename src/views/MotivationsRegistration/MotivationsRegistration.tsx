import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useActiveUser } from "../../hooks/useActiveUser";

import motivations from "../../constants/motivationList";
import { MotivationItem } from "../../models/motivation.model";
import MotivationCard from "../../components/ui/cards/MotivationCard/MotivationCard";
import Button from "../../components/ui/buttons/Button";

import "./MotivationsRegistration.scss";

const MotivationsRegistration = () => {
  // Guardamos textos seleccionados para toggle rápido
  const [selectedMotivationsTexts, setSelectedMotivationsTexts] = useState<
    string[]
  >([]);
  const navigate = useNavigate();

  const { user, updateActiveUser } = useActiveUser();

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, [user]);

  useEffect(() => {
    if (checked && !user) {
      alert("No se encontró usuario activo. Vuelve al paso anterior.");
      navigate("/profile-registration");
    }
  }, [checked, user, navigate]);

  if (!checked || user === null) {
    return <p>Cargando usuario activo...</p>;
  }

  const toggleMotivation = (text: string) => {
    setSelectedMotivationsTexts((prev) =>
      prev.includes(text) ? prev.filter((mot) => mot !== text) : [...prev, text]
    );
  };

  const handleRegister = () => {
    if (selectedMotivationsTexts.length === 0) {
      alert("Selecciona al menos una motivación para continuar.");
      return;
    }
    if (!user) return;

    // Convertimos los textos seleccionados a objetos MotivationItem completos
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
    <div className="motivations-registration">
      <div className="motivations-registration__container">
        <h2 className="form-tittle">Selecciona tu motivación</h2>
        <h3 className="form-subtittle">
          Selecciona las motivaciones que te refuercen y te mantengan en el
          camino.
        </h3>

        <div className="motivations-flex">
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

        <Button variant="primary" onClick={handleRegister}>
          ¡Empezar viaje!
        </Button>
      </div>
    </div>
  );
};

export default MotivationsRegistration;
