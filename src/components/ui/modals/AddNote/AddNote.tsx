import { useState } from "react";
import "./AddNote.scss";

import type { Folder } from "../../../../models/folder.model";
import type { Note } from "../../../../models/note.model";

import Button from "../../buttons/Button";
import FolderSelector from "../../other/FolderSelector/FolderSelector";

type AddNoteProps = {
  folders: Folder[];
  onClose: () => void;
  onSave: (newNote: Note) => void;
};

const AddNote = ({ folders, onClose, onSave }: AddNoteProps) => {
  // Estado local para manejar el formulario de la nota
  const [form, setForm] = useState({
    title: "",
    content: "",
    folderId: folders[0]?.id || "", // Selecciona la primera carpeta por defecto
    image: undefined as string | undefined,
  });

  const { title, content, folderId, image } = form;

  // Actualiza el estado del formulario para inputs y textarea
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Maneja la carga de imagen y la convierte a base64
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

  // Valida los datos antes de guardar
  const validateForm = () => {
    if (!title.trim()) return "Introduce un título para la nota";
    if (!folderId) return "Selecciona una carpeta";
    return null;
  };

  // Crea la nueva nota y la envía al callback onSave
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

    onSave(newNote);
  };

  return (
    // Overlay que cierra el modal al hacer clic fuera
    <div className="add-note-overlay" onClick={onClose}>
      {/* Contenedor principal, previene el cierre al hacer clic dentro */}
      <div className="add-note-container" onClick={(e) => e.stopPropagation()}>
        <div className="add-note-content">
          <div className="note-info">
            {/* Input para el título de la nota */}
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

            {/* Textarea para el contenido de la nota */}
            <textarea
              className="add-note__textarea"
              name="content"
              placeholder="Contenido de la nota"
              value={content}
              onChange={handleChange}
            />
          </div>

          {/* Input para cargar imagen */}
          <input
            className="add-note__file"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {/* Botones para guardar o cancelar */}
        <div className="add-note__buttons">
          <Button variant="purple" onClick={handleSave} type="submit">
            Guardar nota
          </Button>
          <Button variant="outline" onClick={onClose} type="button">
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
