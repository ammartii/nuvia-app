import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./Login.scss";
import Button from "../../components/ui/buttons/Button";
import Header from "../../components/layout/Header/Header";
import FormInput from "../../components/ui/forms/FormInput/FormInput";
import SideImage from "../../components/layout/SideImage/SideImage";

import { getAllUsers } from "../../services/user.service";
import { useActiveUser } from "../../hooks/useActiveUser"; // Hook para manejar usuario activo
import { isValidEmail } from "../../utils/validation";

const Login = () => {
  // Estados para el email y la contraseña
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const { loginUser } = useActiveUser(); // Función para actualizar usuario activo

  // Función que maneja el login
  const handleLogin = () => {
    // Validar formato del email
    if (!isValidEmail(email)) {
      alert("Por favor, introduce un correo electrónico válido.");
      return;
    }

    // Obtener todos los usuarios
    const users = getAllUsers();

    // Buscar usuario que coincida con email y password
    const matchedUser = Object.values(users).find(
      (u) => u.email === email && u.password === password
    );

    if (matchedUser) {
      alert("Inicio de sesión exitoso");
      loginUser(matchedUser.id); // Actualizar usuario activo
      navigate("/welcome"); // Redirigir a bienvenida
    } else {
      alert("Correo o contraseña incorrectos");
    }
  };

  // Contenido personalizado para el header (link para registrarse)
  const customHeaderContent = (
    <>
      <span className="nav-span">¿No tienes cuenta?</span>
      <Link to="/profile-registration" className="nav-link">
        Prueba nuvia gratis
      </Link>
    </>
  );

  return (
    <div className="login">
      <Header rightContent={customHeaderContent} />

      <SideImage />

      <div className="login__container">
        <div>
          <h2 className="form-tittle">Inicia sesión</h2>
          <h3 className="form-subtittle">¡Qué alegría verte de nuevo!</h3>
        </div>

        {/* Inputs de email y contraseña */}
        <div className="login-grid">
          <FormInput
            name="email"
            type="email"
            label="Correo electrónico"
            placeholder="Introduce tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormInput
            name="password"
            type="password"
            label="Contraseña"
            placeholder="Introduce tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Botón para iniciar sesión */}
        <Button variant="primary" onClick={handleLogin}>
          Empezar viaje
        </Button>
      </div>
    </div>
  );
};

export default Login;
