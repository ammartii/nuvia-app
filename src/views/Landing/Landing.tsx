import "./Landing.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header/Header";
import Button from "../../components/ui/buttons/Button";

import clouds from "../../assets/images/nuvia-clouds.png";
import appStore from "../../assets/images/app-store.png";

import { ImageCarousel } from "../../components/ui/carousel/ImageCarousel/ImageCarousel";
import { AppCarousel } from "../../components/ui/carousel/AppCarousel/AppCarousel";

const Landing = () => {
  const navigate = useNavigate();

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

      {/* Hero */}
      <section className="hero__container">
        <div className="hero__background-images">
          <img src={clouds} alt="Clouds" className="hero-cloud hero-cloud-1" />
          <img src={clouds} alt="Clouds" className="hero-cloud hero-cloud-2" />
          <img src={clouds} alt="Clouds" className="hero-cloud hero-cloud-3" />
          <img src={clouds} alt="Clouds" className="hero-cloud hero-cloud-4" />
          <img src={clouds} alt="Clouds" className="hero-cloud hero-cloud-5" />
        </div>

        <div className="hero__content">
          <h1>Cruzar nubes también es avanzar </h1>
          <p className="landing-text">
            Una app que te acompaña en tu viaje interior: entiende lo que
            sientes, cuídate a tu ritmo y celebra cada pequeño paso.
          </p>
          <Button
            variant="primary"
            onClick={() => navigate("/profile-registration")}
          >
            Descubre Nuvia
            <span className="material-symbols-rounded">arrow_outward</span>
          </Button>
        </div>
      </section>

      {/* Inner journey */}
      <section className="inner-journey">
        <div className="text-content">
          <h2 className="landing-title ">
            Prepárate para empezar tu <strong>viaje interior.</strong>
          </h2>
          <p className="landing-text">
            Una app pensada para ayudarte a entenderte, cuidarte y crecer cada
            día. Un espacio íntimo donde escribir lo que sientes, seguir tu
            evolución emocional y reconectar contigo misma, a tu ritmo y sin
            presiones.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              const target = document.getElementById("content");
              target?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Conoce más
          </Button>
        </div>
        <div className="inner-journey_carousel">
          <ImageCarousel />
        </div>
      </section>

      {/* AppContent Section  */}
      <section className="app-content-section" id="content">
        <h2 className="landing-title">
          Escúchate, escribe y acompaña tu proceso paso a paso
        </h2>
        <AppCarousel />
      </section>

      {/* App Store Section*/}
      <section className="download-section">
        <h2 className="landing-title">
          Descárgala pronto en la AppStore y en Google Play
        </h2>
        <div className="phones">
          <img src={appStore} alt="App Store" />
        </div>
      </section>

      <footer>
        <span>Nuvia App </span>
        <span>Proyecto ID3 Amanda Martí</span>
      </footer>
    </div>
  );
};

export default Landing;
