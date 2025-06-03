export type ModalType = "quiz" | "addnote" | null;

export interface ModalContextProps {
  modalToShow: ModalType;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
}
