import { useState } from "react";
import "./AddNote.scss";

import type { Folder } from "../../../../models/folder.model";
import type { Note } from "../../../../models/note.model";

import Button from "../../buttons/Button";

type AddNoteProps = {
  folders: Folder[];
  onClose: () => void;
  onSave: (newNote: Note) => void;
};

const AddNote = ({ folders, onClose, onSave }: AddNoteProps) => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    folderId: folders[0]?.id || "",
    image: undefined as string | undefined,
  });

  const { title, content, folderId, image } = form;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => {
      if (prev[name as keyof typeof prev] === value) return prev;
      return { ...prev, [name]: value };
    });
  };

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

  const validateForm = () => {
    if (!title.trim()) return "Introduce un título para la nota";
    if (!folderId) return "Selecciona una carpeta";
    return null;
  };

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

    onSave(newNote); // Notifica al padre para que agregue la nota y actualice el estado
  };

  return (
    <div className="add-note-overlay" onClick={onClose}>
      <div className="add-note-container" onClick={(e) => e.stopPropagation()}>
        <div className="add-note-content">
          <div className="note-info">
            <input
              className="add-note__input"
              name="title"
              type="text"
              placeholder="Título nota"
              value={title}
              onChange={handleChange}
              autoFocus
            />

            <select
              className="add-note__select"
              name="folderId"
              value={folderId}
              onChange={handleChange}
            >
              {folders.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>

            <textarea
              className="add-note__textarea"
              name="content"
              placeholder="Contenido de la nota"
              value={content}
              onChange={handleChange}
            />
          </div>

          <input
            className="add-note__file"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

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
