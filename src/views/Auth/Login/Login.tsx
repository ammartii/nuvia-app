import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "../AuthCommon.scss";
import { useActiveUser } from "../../../hooks/useActiveUser";
import { isValidEmail } from "../../../utils/validation";
import { getAllUsers } from "../../../services/user.service";
import Header from "../../../components/layout/Header/Header";
import SideImage from "../../../components/layout/SideImage/SideImage";
import AuthForm from "../../../components/ui/forms/AuthForm/AuthForm";
import Button from "../../../components/ui/buttons/Button";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useActiveUser();

  // Estados para inputs de login
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Lógica principal de inicio de sesión
  const handleLogin = () => {
    if (!isValidEmail(email)) {
      alert("Por favor, introduce un correo electrónico válido.");
      return;
    }

    const users = getAllUsers();

    // Buscar coincidencia exacta de email y password
    const matchedUser = Object.values(users).find(
      (u) => u.email === email && u.password === password
    );

    if (matchedUser) {
      alert("Inicio de sesión exitoso");
      loginUser(matchedUser.id);
      navigate("/welcome");
    } else {
      alert("Correo o contraseña incorrectos");
    }
  };

  // Contenido de navegación en el header (enlace a registro)
  const customHeaderContent = (
    <>
      <span className="nav-span">¿No tienes cuenta?</span>
      <Link to="/profile-registration" className="nav-link">
        Prueba nuvia gratis
      </Link>
    </>
  );

  return (
    <div className="auth-form">
      <Header rightContent={customHeaderContent} />

      <SideImage />

      <div className="auth-form__container">
        <div>
          <h2 className="auth-form__title">Inicia sesión</h2>
          <h3 className="auth-form__subtitle">¡Qué alegría verte de nuevo!</h3>
        </div>

        {/* Campos de entrada */}
        <div className="auth-form__grid login-grid">
          <AuthForm
            name="email"
            type="email"
            label="Correo electrónico"
            placeholder="Introduce tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <AuthForm
            name="password"
            type="password"
            label="Contraseña"
            placeholder="Introduce tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Botón de login */}
        <Button variant="primary" onClick={handleLogin}>
          Empezar viaje
        </Button>
      </div>
    </div>
  );
};

export default Login;
