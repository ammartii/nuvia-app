import React from "react";

interface PhotoGalleryModalProps {
  selectedImage: string; // URL de la imagen seleccionada para mostrar
  onClose: () => void; // Función para cerrar el modal
}

const PhotoGalleryModal: React.FC<PhotoGalleryModalProps> = ({
  selectedImage,
  onClose,
}) => {
  return (
    // Overlay que cubre toda la pantalla y detecta clic para cerrar modal
    <div
      className="modal__overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Imagen ampliada, evita que el clic en la imagen cierre el modal */}
      <img
        src={selectedImage}
        alt="Imagen ampliada"
        className="photo-gallery-modal__image"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Botón para cerrar el modal con accesibilidad */}
      <button
        className="photo-gallery-modal-close"
        onClick={onClose}
        aria-label="Cerrar imagen"
      >
        &times;
      </button>
    </div>
  );
};

export default PhotoGalleryModal;
