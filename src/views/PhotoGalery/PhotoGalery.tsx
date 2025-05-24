import { useState, useEffect } from "react";
import "./PhotoGalery.scss";

import Nav from "../../components/layout/Nav/Nav";
import NuviaHeader from "../../components/layout/NuviaHeader/NuviaHeader";
import GoToAppModal from "../../components/ui/modals/GoToApp/GoToApp";
import PhotoGalleryModal from "../../components/ui/modals/PhotoGalleryModal";
import { useActiveUser } from "../../hooks/useActiveUser";
import type { Note } from "../../models/note.model";

const PhotoGalery = () => {
  const { user } = useActiveUser();

  // Estado para almacenar notas con imágenes
  const [notesWithImages, setNotesWithImages] = useState<Note[]>([]);

  // Estado para la imagen seleccionada (mostrar en modal)
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Filtra notas con imagen cuando cambia el usuario
  useEffect(() => {
    if (!user) {
      setNotesWithImages([]);
      return;
    }
    const filtered = (user.notes || []).filter((note) => note.image);
    setNotesWithImages(filtered);
  }, [user]);

  return (
    <>
      {/* Modal para desktop */}
      <GoToAppModal />

      {/* Header personalizado */}
      <NuviaHeader title="Galería de fotos" />

      {/* Contenedor principal de la galería */}
      <div className="profile-subviews__container">
        <div className="photo-gallery__container">
          {/* Mensaje cuando no hay imágenes */}
          {notesWithImages.length === 0 && (
            <p className="no-things-text">No hay imágenes para mostrar.</p>
          )}

          {/* Mostrar imágenes con interacción para abrir modal */}
          {notesWithImages.map(({ id, image, title }) => (
            <div
              key={id}
              className="photo-gallery__item"
              onClick={() => setSelectedImage(image!)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  setSelectedImage(image!);
              }}
            >
              <img
                src={image}
                alt={title}
                loading="lazy"
                className="photo-gallery__img"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal que muestra la imagen ampliada */}
      {selectedImage && (
        <PhotoGalleryModal
          selectedImage={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}

      {/* Navegación inferior */}
      <Nav />
    </>
  );
};

export default PhotoGalery;
