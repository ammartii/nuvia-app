import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Nav.scss";

import IconAdd from "../../ui/modals/IconAdd/IconAdd";
import DailyQuiz from "../../ui/modals/DailyQuiz/DailyQuiz";
import AddNote from "../../ui/modals/AddNote/AddNote";
import { Folder } from "../../../models/folder.model";
import { Note } from "../../../models/note.model";

// Carpeta de ejemplo (puedes conectar esto con contexto o estado global)
const exampleFolders: Folder[] = [];

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();

  // Estados para manejar visibilidad de modales
  const [isIconAddVisible, setIsIconAddVisible] = useState(false);
  const [modalToShow, setModalToShow] = useState<"quiz" | "addnote" | null>(
    null
  );

  // Alterna visibilidad del menú de acciones flotantes
  const toggleIconAdd = () => {
    setIsIconAddVisible((prev) => !prev);
  };

  // Abre uno de los dos modales posibles y cierra el menú flotante
  const openModal = (modal: "quiz" | "addnote") => {
    setModalToShow(modal);
    setIsIconAddVisible(false);
  };

  // Cierra cualquier modal abierto
  const closeModal = () => {
    setModalToShow(null);
  };

  // Acción al guardar nota (conectar a tu sistema de almacenamiento)
  const handleSaveNote = (newNote: Note) => {
    console.log("Guardar nota:", newNote);
    closeModal();
  };

  // Chequea si una ruta está activa
  const isActiveRoute = (path: string) => location.pathname === path;

  return (
    <div className="nav">
      {/* Iconos de navegación inferior */}
      <div className="icons">
        <div
          className={`icon ${isActiveRoute("/entries") ? "active" : ""}`}
          onClick={() => navigate("/entries")}
        >
          <span className="material-symbols-rounded">assignment</span>
        </div>

        <div
          className={`icon ${isActiveRoute("/mood-analysis") ? "active" : ""}`}
          onClick={() => navigate("/mood-analysis")}
        >
          <span className="material-symbols-rounded">monitoring</span>
        </div>

        <div
          className={`icon middle-icon ${
            isActiveRoute("/add") ? "active" : ""
          }`}
          onClick={toggleIconAdd}
        >
          <span className="material-symbols-rounded">add_circle</span>
        </div>

        <div
          className={`icon ${isActiveRoute("/calendar") ? "active" : ""}`}
          onClick={() => navigate("/calendar")}
        >
          <span className="material-symbols-rounded">calendar_today</span>
        </div>

        <div
          className={`icon ${isActiveRoute("/profile") ? "active" : ""}`}
          onClick={() => navigate("/profile")}
        >
          <span className="material-symbols-rounded">person</span>
        </div>
      </div>

      {/* Menú de acciones adicionales flotante */}
      {isIconAddVisible && (
        <IconAdd
          onClose={toggleIconAdd}
          openModal={openModal}
          folders={exampleFolders}
          onSaveNote={handleSaveNote}
        />
      )}

      {/* Modal de quiz diario */}
      {modalToShow === "quiz" && (
        <DailyQuiz
          onClose={closeModal}
          addNewEntrie={() => {}}
          openModal={openModal}
        />
      )}

      {/* Modal para añadir nota */}
      {modalToShow === "addnote" && (
        <AddNote
          folders={exampleFolders}
          onClose={closeModal}
          onSave={handleSaveNote}
        />
      )}
    </div>
  );
}

export default Nav;
