import { useEffect, useState } from "react";

import motivations from "../../constants/motivationList";
import MotivationCard from "../../components/ui/cards/MotivationCard/MotivationCard";
import GoToAppModal from "../../components/ui/modals/GoToApp/GoToApp";
import NuviaHeader from "../../components/layout/NuviaHeader/NuviaHeader";
import Nav from "../../components/layout/Nav/Nav";

import { useActiveUser } from "../../hooks/useActiveUser";
import { MotivationItem } from "../../models/motivation.model";

const Motivations = () => {
  // Obtener usuario activo
  const { user } = useActiveUser();

  // Estado local para motivaciones guardadas del usuario
  const [savedMotivations, setSavedMotivations] = useState<MotivationItem[]>(
    []
  );

  // Cargar motivaciones guardadas cuando cambia el usuario
  useEffect(() => {
    if (user?.motivations) {
      setSavedMotivations(user.motivations);
    }
  }, [user]);

  return (
    <div>
      {/* Modal para desktop */}
      <GoToAppModal />

      {/* Header con título */}
      <NuviaHeader title="Motivaciones" />

      {/* Contenedor principal */}
      <div className="views-content__container">
        {/* Mapear lista general de motivaciones y mostrar solo las que están guardadas */}
        {motivations.map((motivation: MotivationItem, index: number) =>
          savedMotivations.some((saved) => saved.text === motivation.text) ? (
            <MotivationCard
              key={index}
              image={motivation.image}
              text={motivation.text}
              isSelected={false}
              readonly={true} // Solo lectura, sin interacción
            />
          ) : null
        )}
      </div>

      {/* Navegación inferior */}
      <Nav />
    </div>
  );
};

export default Motivations;
