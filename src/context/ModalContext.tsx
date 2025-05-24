import { createContext } from "react";

export type ModalType = "addnote" | null; 

export interface ModalContextProps {
  modalToShow: ModalType;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextProps | undefined>(undefined);
