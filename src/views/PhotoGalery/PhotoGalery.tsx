import { useState, useEffect } from "react";
import "./PhotoGalery.scss";
import Nav from "../../components/layout/Nav/Nav";
import NuviaHeader from "../../components/layout/NuviaHeader/NuviaHeader";

import GoToAppModal from "../../components/ui/modals/GoToApp/GoToApp";
import { useActiveUser } from "../../hooks/useActiveUser";

import type { Note } from "../../models/note.model";

const PhotoGalery = () => {
  const { user } = useActiveUser();
  const [notesWithImages, setNotesWithImages] = useState<Note[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setNotesWithImages([]);
      return;
    }

    // Filtrar notas que tengan imagen
    const filtered = (user.notes || []).filter((note) => note.image);
    setNotesWithImages(filtered);
  }, [user]);

  return (
    <div className="featured-days-container">
      <GoToAppModal />
      <NuviaHeader title="Galería de fotos" />

      <div className="photo-gallery-grid">
        {notesWithImages.length === 0 && (
          <p className="no-things-text">No hay imágenes para mostrar.</p>
        )}

        {notesWithImages.map(({ id, image, title }) => (
          <div
            key={id}
            className="photo-gallery-item"
            onClick={() => setSelectedImage(image!)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setSelectedImage(image!);
            }}
          >
            <img src={image} alt={title} loading="lazy" />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="photo-gallery-modal"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <img
            src={selectedImage}
            alt="Imagen ampliada"
            className="photo-gallery-modal-image"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="photo-gallery-modal-close"
            onClick={() => setSelectedImage(null)}
            aria-label="Cerrar imagen"
          >
            &times;
          </button>
        </div>
      )}

      <Nav />
    </div>
  );
};

export default PhotoGalery;
