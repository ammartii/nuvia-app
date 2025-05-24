import { useModal } from "../../../hooks/useModal";
import DailyQuiz from "../../ui/modals/DailyQuiz/DailyQuiz";
import AddNote from "../../ui/modals/AddNote/AddNote";
import IconAdd from "../../ui/modals/IconAdd/IconAdd";
import { Folder } from "../../../models/folder.model";
import { Note } from "../../../models/note.model";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "./Nav.scss";

// Carpeta de ejemplo (puedes reemplazar por tu estado o contexto real)
const exampleFolders: Folder[] = [];

function Nav() {
  const { modalToShow, openModal, closeModal } = useModal();
  const navigate = useNavigate();
  const location = useLocation();

  const [isIconAddVisible, setIsIconAddVisible] = useState(false);

  // Alterna visibilidad menú flotante
  const toggleIconAdd = () => {
    setIsIconAddVisible((prev) => !prev);
  };

  // Guarda la nota y cierra modal
  const handleSaveNote = (newNote: Note) => {
    console.log("Guardar nota:", newNote);
    closeModal();
  };

  // Chequea si ruta está activa para estilos
  const isActiveRoute = (path: string) => location.pathname === path;

  return (
    <div className="nav">
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

      {/* Menú acciones flotantes */}
      {isIconAddVisible && (
        <IconAdd
          onClose={toggleIconAdd}
          openModal={(modal) => {
            openModal(modal);
            toggleIconAdd();
          }}
          folders={exampleFolders}
          onSaveNote={handleSaveNote}
        />
      )}

      {/* Modal quiz diario */}
      {modalToShow === "quiz" && (
        <DailyQuiz
          onClose={closeModal}
          addNewEntrie={() => {}}
          openModal={openModal}
        />
      )}

      {/* Modal añadir nota */}
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
