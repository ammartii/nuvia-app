import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal debe usarse dentro de un ModalProvider");
  }
  return context;
};
