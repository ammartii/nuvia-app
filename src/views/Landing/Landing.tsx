import "./Landing.scss";
import { Link } from "react-router-dom";
import Header from "../../components/layout/Header/Header";
import Button from "../../components/ui/buttons/Button";

import imgWelcome from "../../assets/images/app-welcome.png";
import appContent01 from "../../assets/images/app-content-01.png";
//import appGroup from "../../assets/images/app-group.png";

const Landing = () => {
  const customHeaderContent = (
    <>
      <Link to="/login" className="nav-link">
        Inicia sesión
      </Link>
      <Link to="/profile-registration" className="nav-link-outlined">
        Prueba nuvia Gratis
      </Link>
    </>
  );

  return (
    <div className="landing-container">
      {/* Header */}
      <Header rightContent={customHeaderContent} />

      {/* Contenido de la página */}

      {/* Hero */}
      <section className="hero">
        <h1>Cruzar nubes tambiés es avanzar </h1>
        <p>Escúchate, escribe y acompaña tu proceso paso a paso</p>
        <Button variant="primary">Descubre Nuvia</Button>
      </section>

      {/* Inner journey */}
      <section className="inner-journey">
        <div className="text-content">
          <h2>
            Prepárate para empezar tu <strong>viaje interior.</strong>
          </h2>
          <p>
            Una app pensada para ayudarte a entenderte, cuidarte y crecer cada
            día. Un espacio íntimo donde escribir lo que sientes, seguir tu
            evolución emocional y reconectar contigo misma, a tu ritmo y sin
            presiones.
          </p>
          <Button variant="outline">Conoce más</Button>
        </div>
        <div className="phone-image">
          <img src={imgWelcome} alt="App Preview" />
        </div>
      </section>

      {/* AppContent Section */}
      <section className="app-content-section">
        <div className="app-tittle">
          <h2>Escúchate, escribe y acompaña tu proceso paso a paso</h2>
        </div>
        <div className="app-content">
          <img src={appContent01} alt="Contenido 1" />
          <img src={appContent01} alt="Contenido 2" />
          <img src={appContent01} alt="Contenido 3" />
        </div>
      </section>

      {/* App Store Section
      <section className="download-section">
        <h2>Descárgala pronto en la AppStore...</h2>
        <div className="phones">
          <img src={appGroup} alt="App Phones" />
        </div>
      </section>
       */}
    </div>
  );
};

export default Landing;
