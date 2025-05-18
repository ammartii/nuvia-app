import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useActiveUser } from "../../hooks/useActiveUser";

import avatars from "../../constants/avatarList";
import Button from "../../components/ui/buttons/Button";
import "./AvatarRegistration.scss";

const AvatarRegistration = () => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const navigate = useNavigate();

  const { user, updateActiveUser } = useActiveUser();

  // Nuevo estado para saber que ya hemos verificado user
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Marcamos que ya verificamos user
    setChecked(true);
  }, [user]);

  useEffect(() => {
    if (checked && !user) {
      alert("No se encontró usuario activo. Vuelve al paso anterior.");
      navigate("/profile-registration");
    }
  }, [checked, user, navigate]);

  if (!checked || user === null) {
    // Mientras carga o no hay user, mostramos mensaje o spinner
    return <p>Cargando usuario activo...</p>;
  }

  const handleRegister = () => {
    if (!selectedAvatar) {
      alert("Por favor, selecciona un avatar antes de continuar.");
      return;
    }
    if (!user) return;

    try {
      updateActiveUser({ avatarUrl: selectedAvatar });
      alert("¡Avatar guardado exitosamente!");
      navigate("/motivations-registration");
    } catch {
      alert("Error actualizando avatar.");
    }
  };

  return (
    <div className="avatar-registration">
      <div className="avatar-container">
        <h2 className="form-tittle">Elige tu avatar</h2>
        <h3 className="form-subtittle">
          Selecciona el avatar que te va a acompañar durante este viaje.
        </h3>
        <div className="avatar-flex">
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
