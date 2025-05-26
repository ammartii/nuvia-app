import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

// Custom hook para consumir el contexto del modal.
// Lanza un error si se usa fuera de un ModalProvider.

export const useModal = () => {
  const context = useContext(ModalContext);

  // Validar que el contexto exista para evitar errores
  if (!context) {
    throw new Error("useModal debe usarse dentro de un ModalProvider");
  }

  return context;
};
