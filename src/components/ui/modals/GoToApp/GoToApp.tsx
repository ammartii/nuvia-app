import { useEffect, useState } from "react";
import "./GoToApp.scss";
import logoNuvia from "../../../../assets/logo-nuvia.png";

const GoToAppModal = () => {
  // Estado para detectar si la pantalla es de tamaño móvil (<= 430px)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 430);

  // Efecto para actualizar el estado al cambiar el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 430);
    };

    window.addEventListener("resize", handleResize);

    // Limpieza del evento al desmontar el componente
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // No renderizar nada si es dispositivo móvil
  if (isMobile) return null;

  // Renderizar modal para invitar a usar la app en móvil
  return (
    <div className="gotoapp__modal">
      <div className="gotoapp__content">
        <p className="gotoapp__text">
          Accede <span>a la app</span> en versión móvil
        </p>
        <img src={logoNuvia} alt="Logo Nuvia" className="gotoapp__logo" />
      </div>
    </div>
  );
};

export default GoToAppModal;
