// React y estilos
import { useState } from "react";
import "./AddNote.scss";

// Tipado
import type { Folder } from "../../../../models/folder.model";
import type { Note } from "../../../../models/note.model";

// Componentes UI
import Button from "../../buttons/Button";
import FolderSelector from "../../other/FolderSelector/FolderSelector";
import { useNotes } from "../../../../hooks/useNotes";

// Props del componente
type AddNoteProps = {
  folders: Folder[];
  onClose: () => void;
  onNoteAdded?: (note: Note) => void;
};

const AddNote = ({ folders, onClose, onNoteAdded }: AddNoteProps) => {
  // Estado del formulario
  const [form, setForm] = useState({
    title: "",
    content: "",
    folderId: folders[0]?.id || "", // Carpeta seleccionada por defecto
    image: undefined as string | undefined,
  });
  const { handleSaveNote } = useNotes();

  const { title, content, folderId, image } = form;

  // Maneja cambios en título y contenido
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Maneja selección de imagen (convierte a base64)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result && reader.result !== image) {
        setForm((prev) => ({ ...prev, image: reader.result as string }));
      }
    };

    reader.onerror = () => alert("Error leyendo la imagen");
    reader.readAsDataURL(file);
  };

  // Valida campos obligatorios
  const validateForm = () => {
    if (!title.trim()) return "Introduce un título para la nota";
    if (!folderId) return "Selecciona una carpeta";
    return null;
  };

  // Crea y guarda una nueva nota
  const handleSave = () => {
    const error = validateForm();
    if (error) {
      alert(error);
      return;
    }

    const newNote: Note = {
      id: crypto.randomUUID(),
      title: title.trim(),
      content,
      folderId,
      date: new Date().toLocaleDateString(),
      image,
    };

    handleSaveNote(newNote);

    if (onNoteAdded) {
      onNoteAdded(newNote);
    }
  };

  return (
    // Fondo semitransparente para cerrar al hacer clic fuera
    <div className="add-note__overlay" onClick={onClose}>
      {/* Contenedor del modal */}
      <div className="add-note__container" onClick={(e) => e.stopPropagation()}>
        <div className="add-note__content">
          <div className="note-info">
            {/* Campo título */}
            <input
              className="add-note__input"
              name="title"
              type="text"
              placeholder="Título nota"
              value={title}
              onChange={handleChange}
              autoFocus
            />

            {/* Selector de carpeta */}
            <FolderSelector
              folders={folders}
              selectedFolderId={folderId}
              onChange={(id) => setForm((prev) => ({ ...prev, folderId: id }))}
            />

            {/* Campo contenido */}
            <textarea
              className="add-note__textarea"
              name="content"
              placeholder="Contenido de la nota"
              value={content}
              onChange={handleChange}
            />
          </div>

          {/* Selector de imagen */}
          <div>
            <input
              id="fileUpload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            <label htmlFor="fileUpload" className="add-note__file">
              Insertar imagen
            </label>
          </div>
        </div>

        {/* Botones guardar / cancelar */}
        <div className="add-note__buttons">
          <Button variant="purple" onClick={handleSave} type="submit">
            Guardar nota
          </Button>
          {/*
          <Button variant="outline" onClick={onClose} type="button">
            Cancelar
          </Button>
           */}
        </div>
      </div>
    </div>
  );
};

export default AddNote;
