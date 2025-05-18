import { useState } from "react";
import "./AddFolder.scss";

import folderImage from "../../../../assets/images/folder.png";
import useBodyScrollLock from "../../../../utils/bodyScrollLock";
import Button from "../../buttons/Button";

type AddFolderProps = {
  onSave: (name: string, description: string) => void;
  onClose: () => void;
};

const AddFolder = ({ onSave, onClose }: AddFolderProps) => {
  useBodyScrollLock();

  const [form, setForm] = useState({ folderName: "", description: "" });
  const [error, setError] = useState("");

  const { folderName, description } = form;

  // Actualiza formulario y limpia error solo si existía
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (error) setError("");
  };

  // Valida los campos y devuelve mensaje de error o null si válido
  const validateForm = () => {
    if (!folderName.trim()) return "Introduce un nombre para la carpeta";
    return null;
  };

  // Maneja el submit validando antes de enviar
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    onSave(folderName.trim(), description);
  };

  // Evita que clic dentro del modal cierre el overlay
  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div className="add-folder-overlay">
      <form
        className="add-folder-content"
        onClick={stopPropagation}
        onSubmit={handleSave}
        noValidate
      >
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
