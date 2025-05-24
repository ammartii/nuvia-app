import { useNavigate } from "react-router-dom";
import { useActiveUser } from "../../hooks/useActiveUser";

import Button from "../../components/ui/buttons/Button";
import GoToAppModal from "../../components/ui/modals/GoToApp/GoToApp";

import "./Welcome.scss";
import girl from "../../assets/images/nuvia-girl.png";
import clouds from "../../assets/images/nuvia-clouds.png";

// Componente de bienvenida
const Welcome = () => {
  const navigate = useNavigate();
  const { user } = useActiveUser();

  // Mostrar mensaje de carga si no hay usuario activo
  if (!user) {
    return <p>Cargando usuario...</p>;
  }

  // Redirección al iniciar la app
  const handleGoToApp = () => {
    navigate("/entries");
  };

  // Capitaliza el nombre de usuario o muestra "Usuario"
  const userName = user.username
    ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
    : "Usuario";

  return (
    <div className="welcome__container">
      {/* Modal para sugerir la app en móvil (solo visible en escritorio) */}
      <GoToAppModal />

      {/* Fondo animado con nubes */}
      <div className="background-images">
        <img src={clouds} alt="Clouds" className="cloud cloud-1" />
        <img src={clouds} alt="Clouds" className="cloud cloud-2" />
        <img src={clouds} alt="Clouds" className="cloud cloud-3" />
        <img src={clouds} alt="Clouds" className="cloud cloud-4" />
      </div>

      {/* Contenido principal de bienvenida */}
      <div className="welcome__content">
        <div className="logo-app">nuvia</div>

        <div className="welcome__text">
          <h1 className="title-bold">Hola {userName}</h1>
          <h2 className="title-light">Bienvenido/a</h2>
          <p className="subtitle">
            Explora cómo funciona la app y empieza tu viaje hacia el bienestar
            emocional.
          </p>
        </div>

        {/* Imagen decorativa */}
        <img src={girl} alt="Girl" className="nuvia-girl" />

        {/* Botón para comenzar a usar la app */}
        <Button variant="primary" onClick={handleGoToApp}>
          ¡Empezar viaje!
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
