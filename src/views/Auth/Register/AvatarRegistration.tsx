import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../AuthCommon.scss";
import { useActiveUser } from "../../../hooks/useActiveUser";
import avatars from "../../../constants/avatarList";
import Button from "../../../components/ui/buttons/Button";

const AvatarRegistration = () => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user, updateActiveUser } = useActiveUser();

  // Controla si ya se verificó la existencia del usuario activo
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Marcar que se ha verificado `user` (aunque sea null)
    setChecked(true);
  }, [user]);

  useEffect(() => {
    // Si no hay usuario activo después de verificar, redirigir al paso anterior
    if (checked && !user) {
      alert("No se encontró usuario activo. Vuelve al paso anterior.");
      navigate("/profile-registration");
    }
  }, [checked, user, navigate]);

  // Mientras se verifica, mostrar mensaje de carga
  if (!checked || user === null) {
    return <p>Cargando usuario activo...</p>;
  }

  // Guardar avatar seleccionado y avanzar al siguiente paso
  const handleRegister = () => {
    if (!selectedAvatar) {
      alert("Por favor, selecciona un avatar antes de continuar.");
      return;
    }

    try {
      updateActiveUser({ avatarUrl: selectedAvatar });
      alert("¡Avatar guardado exitosamente!");
      navigate("/motivations-registration");
    } catch {
      alert("Error actualizando avatar.");
    }
  };

  return (
    <div className="auth-form-steps">
      <div className="auth-form-steps__container">
        <h2 className="auth-form__title">Elige tu avatar</h2>
        <h3 className="auth-form__subtitle">
          Selecciona el avatar que te va a acompañar durante este viaje.
        </h3>

        <div className="auth-form-steps__content" style={{ width: "80%" }}>
          {avatars.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Avatar ${index + 1}`}
              className={`avatar-image ${
                selectedAvatar === src ? "selected" : ""
              }`}
              onClick={() => setSelectedAvatar(src)}
            />
          ))}
        </div>

        <Button variant="primary" onClick={handleRegister}>
          Guardar avatar
        </Button>
      </div>
    </div>
  );
};

export default AvatarRegistration;
