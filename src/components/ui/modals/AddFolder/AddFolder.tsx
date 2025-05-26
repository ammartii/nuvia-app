import { useState } from "react";
import "./AddFolder.scss";

import folderImage from "../../../../assets/images/folder.png";
import useBodyScrollLock from "../../../../hooks/useBodyScrollLock";

import Button from "../../buttons/Button";

// Tipos de props
type AddFolderProps = {
  onSave: (name: string, description: string) => void;
  onClose: () => void;
};

const AddFolder = ({ onSave, onClose }: AddFolderProps) => {
  useBodyScrollLock(); // Bloquea scroll del body al abrir modal

  const [form, setForm] = useState({ folderName: "", description: "" });
  const [error, setError] = useState("");

  const { folderName, description } = form;

  // Actualiza campos del formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  // Validación simple del nombre
  const validateForm = () => {
    if (!folderName.trim()) return "Introduce un nombre para la carpeta";
    return null;
  };

  // Maneja el envío del formulario
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    onSave(folderName.trim(), description);
  };

  // Evita cierre del modal al hacer clic dentro del contenido
  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div className="add-folder__overlay" onClick={onClose}>
      <form
        className="add-folder__content"
        onClick={stopPropagation}
        onSubmit={handleSave}
        noValidate
      >
        <div className="add-folder__info">
          <img src={folderImage} alt="Folder" className="add-folder__image" />

          <input
            name="folderName"
            className={`add-folder__input ${error ? "input-error" : ""}`}
            type="text"
            placeholder="Nombre carpeta"
            value={folderName}
            onChange={handleChange}
            aria-invalid={!!error}
            aria-describedby="folderName-error"
            autoFocus
          />
          {error && (
            <span id="folderName-error" role="alert" className="error-message">
              {error}
            </span>
          )}

          <textarea
            name="description"
            className="add-folder__textarea"
            placeholder="Añade una descripción para tu carpeta..."
            value={description}
            onChange={handleChange}
          />
        </div>
        <div className="add-folder__buttons">
          <Button variant="purple" type="submit">
            Guardar
          </Button>
          <Button variant="outline" onClick={onClose} type="button">
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddFolder;
