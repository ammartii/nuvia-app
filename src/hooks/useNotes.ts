import { useActiveUser } from "../hooks/useActiveUser";
import type { Note } from "../models/note.model";

export const useNotes = () => {
  const { user, updateActiveUser } = useActiveUser();

  // Función para guardar una nueva nota y actualizar el usuario activo
  const handleSaveNote = (newNote: Note) => {
    if (!user) return;

    const updatedNotes = [...(user.notes || []), newNote];
    updateActiveUser({ notes: updatedNotes });
  };

  return {
    handleSaveNote,
  };
};
