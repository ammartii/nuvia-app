import { useState, ChangeEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createNewUser } from "../../services/user.service";
import { User } from "../../models/user.model";
import { isValidEmail } from "../../utils/validation";
import "./ProfileRegistration.scss";

import Button from "../../components/ui/buttons/Button";
import Header from "../../components/layout/Header/Header";
import FormInput from "../../components/ui/forms/FormInput/FormInput";
import TermsAgreement from "../../components/ui/forms/TermsAgreement/TermsAgreement";
import SideImage from "../../components/layout/SideImage/SideImage";

import { useActiveUser } from "../../hooks/useActiveUser";

const ProfileRegistration = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const navigate = useNavigate();

  // Usamos el hook unificado
  const { loginUser } = useActiveUser();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

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

    const { repeatPassword, ...toSave } = form;
    console.log(repeatPassword);

    try {
      const newUser: User = {
        id: Date.now().toString(),
        username: toSave.username,
        password: toSave.password,
        email: toSave.email,
        avatarUrl: "",
        goals: [],
      };

      // Dentro de handleRegister antes de llamar a createNewUser y loginUser:
      console.log("Creando usuario:", newUser);

      createNewUser(newUser);
      loginUser(newUser.id);

      console.log("Usuario logueado:", newUser.id);

      alert("¡Usuario creado con éxito!");
      navigate("/avatar-registration");
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Ocurrió un error inesperado."
      );
    }
  };

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

  const customHeaderContent = (
    <>
      <span className="nav-span">¿Ya tienes cuenta?</span>
      <Link to="/login" className="nav-link">
        Inicia sesión
      </Link>
    </>
  );

  return (
    <div className="profile-registration">
      <Header rightContent={customHeaderContent} />
      <SideImage />
      <main className="profile-registration__container">
        <header>
          <h2 className="form-tittle">Crea tu cuenta gratis</h2>
          <h3 className="form-subtittle">Empieza ya tu viaje emocional</h3>
        </header>
        <section className="register-grid">
          {formFields.map(({ name, type, label, placeholder }) => (
            <FormInput
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
        <TermsAgreement
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.target.checked)}
        />
        <Button variant="primary" onClick={handleRegister}>
          Crear cuenta
        </Button>
      </main>
    </div>
  );
};

export default ProfileRegistration;
