import DailyQuiz from "../../ui/modals/DailyQuiz/DailyQuiz";
import AddNote from "../../ui/modals/AddNote/AddNote";
import IconAdd from "../../ui/modals/IconAdd/IconAdd";
import { Folder } from "../../../models/folder.model";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "./Nav.scss";

// Carpeta de ejemplo (puedes reemplazar por tu estado o contexto real)
const exampleFolders: Folder[] = [];

function Nav() {
  const [showQuizModal, setShowQuizModal] = useState(false);
  const openQuizModal = () => setShowQuizModal(true);
  const closeQuizModal = () => setShowQuizModal(false);

  const [showAddNote, setShowAddNote] = useState(false);
  const openAddNote = () => setShowAddNote(true);
  const closeAddNote = () => setShowAddNote(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [isIconAddVisible, setIsIconAddVisible] = useState(false);

  // Alterna visibilidad menú flotante
  const toggleIconAdd = () => {
    setIsIconAddVisible((prev) => !prev);
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
            if (modal === "addnote") {
              openAddNote();
            } else {
              openQuizModal();
            }
            toggleIconAdd();
          }}
        />
      )}

      {/* Modal quiz diario */}
      {showQuizModal && (
        <DailyQuiz
          onClose={closeQuizModal}
          addNewEntrie={() => {}}
          openModal={openAddNote}
        />
      )}

      {/* Modal añadir nota */}
      {showAddNote && (
        <AddNote folders={exampleFolders} onClose={closeAddNote} />
      )}
    </div>
  );
}

export default Nav;
