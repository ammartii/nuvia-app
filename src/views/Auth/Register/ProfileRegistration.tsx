import { useState, ChangeEvent } from "react";
import { useNavigate, Link } from "react-router-dom";

import "../AuthCommon.scss";
import { useActiveUser } from "../../../hooks/useActiveUser";
import { isValidEmail } from "../../../utils/validation";
import { User } from "../../../models/user.model";
import { createNewUser } from "../../../services/user.service";
import Header from "../../../components/layout/Header/Header";
import SideImage from "../../../components/layout/SideImage/SideImage";
import AuthForm from "../../../components/ui/forms/AuthForm/AuthForm";
import TermsAgreement from "../../../components/ui/forms/TermsAgreement/TermsAgreement";
import Button from "../../../components/ui/buttons/Button";

const ProfileRegistration = () => {
  // Estado del formulario de registro
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  // Estado para el checkbox de términos y condiciones
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const navigate = useNavigate();
  const { loginUser } = useActiveUser(); // Hook para guardar al usuario activo

  // Manejo de cambio en inputs del formulario
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Validación y creación del nuevo usuario
  const handleRegister = () => {
    if (!isValidEmail(form.email)) {
      alert("Por favor, introduce un correo electrónico válido.");
      return;
    }

    if (!acceptedTerms) {
      alert("Debes aceptar los Términos y Condiciones para continuar.");
      return;
    }

    if (form.password !== form.repeatPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Eliminamos el campo repeatPassword del objeto final
    const { repeatPassword, ...toSave } = form;
    console.log(repeatPassword);

    try {
      const newUser: User = {
        id: Date.now().toString(), // ID simple basado en timestamp
        username: toSave.username,
        password: toSave.password,
        email: toSave.email,
        avatarUrl: "",
        goals: [],
      };

      createNewUser(newUser); // Guardamos el nuevo usuario
      loginUser(newUser.id); // Lo iniciamos sesión automáticamente

      alert("¡Usuario creado con éxito!");
      navigate("/avatar-registration"); // Siguiente paso del registro
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Ocurrió un error inesperado."
      );
    }
  };

  // Campos del formulario definidos para mapear
  const formFields = [
    {
      name: "username",
      type: "text",
      label: "Nombre",
      placeholder: "Introduce tu nombre",
    },
    {
      name: "email",
      type: "email",
      label: "Correo electrónico",
      placeholder: "Introduce tu email",
    },
    {
      name: "password",
      type: "password",
      label: "Contraseña",
      placeholder: "Introduce tu contraseña",
    },
    {
      name: "repeatPassword",
      type: "password",
      label: "Repite la contraseña",
      placeholder: "Repite tu contraseña",
    },
  ];

  // Enlace personalizado para el header
  const customHeaderContent = (
    <>
      <span className="nav-span">¿Ya tienes cuenta?</span>
      <Link to="/login" className="nav-link">
        Inicia sesión
      </Link>
    </>
  );

  return (
    <div className="auth-form">
      <Header rightContent={customHeaderContent} />
      <SideImage />

      <main className="auth-form__container">
        <header>
          <h2 className="auth-form__title">Crea tu cuenta gratis</h2>
          <h3 className="auth-form__subtitle">Empieza ya tu viaje emocional</h3>
        </header>

        {/* Campos del formulario */}
        <section className="auth-form__grid register-grid">
          {formFields.map(({ name, type, label, placeholder }) => (
            <AuthForm
              key={name}
              name={name}
              type={type}
              label={label}
              placeholder={placeholder}
              value={form[name as keyof typeof form]}
              onChange={handleChange}
            />
          ))}
        </section>

        {/* Checkbox de términos y condiciones */}
        <TermsAgreement
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.target.checked)}
        />

        {/* Botón para crear la cuenta */}
        <Button variant="primary" onClick={handleRegister}>
          Crear cuenta
        </Button>
      </main>
    </div>
  );
};

export default ProfileRegistration;
