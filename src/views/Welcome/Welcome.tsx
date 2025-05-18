import { useNavigate } from "react-router-dom";

import Button from "../../components/ui/buttons/Button";
import GoToAppModal from "../../components/ui/modals/GoToApp/GoToApp";
import "./Welcome.scss";

import girl from "../../assets/images/nuvia-girl.png";
import clouds from "../../assets/images/nuvia-clouds.png";

import { useActiveUser } from "../../hooks/useActiveUser";

const Welcome = () => {
  const navigate = useNavigate();

  const { user } = useActiveUser();

  if (!user) {
    return <p>Cargando usuario...</p>;
  }

  const handleGoToApp = () => {
    navigate("/entries");
  };

  const userName = user.username
    ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
    : "Usuario";

  return (
    <div className="welcome-container">
      <GoToAppModal />

      <div className="background-images">
        <img src={clouds} alt="Clouds" className="cloud cloud-1" />
        <img src={clouds} alt="Clouds" className="cloud cloud-2" />
        <img src={clouds} alt="Clouds" className="cloud cloud-3" />
        <img src={clouds} alt="Clouds" className="cloud cloud-4" />
      </div>

      <div className="welcome-content">
        <div className="logo-app">nuvia</div>

        <div className="welcome-text">
          <h1 className="title-bold">Hola {userName}</h1>
          <h2 className="title-light">Bienvenido/a</h2>
          <p className="subtitle">
            Explora cómo funciona la app y empieza tu viaje hacia el bienestar
            emocional.
          </p>
        </div>

        <div className="floating-image">
          <img src={girl} alt="Girl" className="nuvia-girl" />
        </div>

        <Button variant="primary" onClick={handleGoToApp}>
          ¡Empezar viaje!
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
