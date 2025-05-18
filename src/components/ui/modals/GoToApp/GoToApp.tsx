import React, { useEffect, useState } from "react";
import "./GoToApp.scss";
import logoNuvia from "../../../../assets/logo-nuvia.png";

const GoToAppModal: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 430);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 430);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) return null;

  return (
    <div className="gotoapp-modal">
      <div className="modal-content">
        <p className="text-gotoapp">
          Accede <span> a la app </span> en versión movil
        </p>
        <img src={logoNuvia} alt="Logo Nuvia" className="modal-logo" />
      </div>
    </div>
  );
};

export default GoToAppModal;
