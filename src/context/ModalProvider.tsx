import { useState, ReactNode } from "react";
import { ModalContext, ModalType } from "./ModalContext";
import { useActiveUser } from "../hooks/useActiveUser";
import AddNote from "../components/ui/modals/AddNote/AddNote";

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useActiveUser();

  // solo guardamos el tipo del modal a mostrar
  const [modalToShow, setModalToShow] = useState<ModalType>(null);

  const openModal = (modal: ModalType) => setModalToShow(modal);
  const closeModal = () => setModalToShow(null);

  return (
    <ModalContext.Provider value={{ modalToShow, openModal, closeModal }}>
      {children}

      {/* Renderizamos el modal AddNote si toca */}
      {modalToShow === "addnote" && user && (
        <AddNote folders={user.folders || []} onClose={closeModal} />
      )}
    </ModalContext.Provider>
  );
};
