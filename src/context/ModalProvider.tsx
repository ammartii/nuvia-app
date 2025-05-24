import { useState, ReactNode } from "react";
import { ModalContext, ModalType } from "./ModalContext";
import { useActiveUser } from "../hooks/useActiveUser";
import AddNote from "../components/ui/modals/AddNote/AddNote";
import type { Note } from "../models/note.model";

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const { user, updateActiveUser } = useActiveUser();

  // solo guardamos el tipo del modal a mostrar
  const [modalToShow, setModalToShow] = useState<ModalType>(null);

  const openModal = (modal: ModalType) => setModalToShow(modal);
  const closeModal = () => setModalToShow(null);

  // Función para guardar una nueva nota y actualizar el usuario activo
  const handleSaveNote = (newNote: Note) => {
    if (!user) return;

    const updatedNotes = [...(user.notes || []), newNote];
    updateActiveUser({ notes: updatedNotes });
    closeModal();
  };

  return (
    <ModalContext.Provider value={{ modalToShow, openModal, closeModal }}>
      {children}

      {/* Renderizamos el modal AddNote si toca */}
      {modalToShow === "addnote" && user && (
        <AddNote
          folders={user.folders || []}
          onClose={closeModal}
          onSave={handleSaveNote}
        />
      )}
    </ModalContext.Provider>
  );
};
