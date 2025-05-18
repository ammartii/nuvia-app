import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Nav.scss";
import IconAdd from "../../ui/modals/IconAdd/IconAdd";
import DailyQuiz from "../../ui/modals/DailyQuiz/DailyQuiz";
import AddNote from "../../ui/modals/AddNote/AddNote";
import { Folder } from "../../../models/folder.model";
import { Note } from "../../../models/note.model";

// Ejemplo: si tienes las carpetas en algún lado, pásalas aquí
const exampleFolders: Folder[] = [
  // aquí pones las carpetas que tengas o las cargas desde el estado global o context
];

function Nav() {
  const [isIconAddVisible, setIsIconAddVisible] = useState(false);
  const [modalToShow, setModalToShow] = useState<"quiz" | "addnote" | null>(
    null
  );

  const navigate = useNavigate();
  const location = useLocation();

  const toggleIconAdd = () => {
    setIsIconAddVisible((prev) => !prev);
  };

  // Este es el callback para abrir modal hijo y cerrar IconAdd
  const openModal = (modal: "quiz" | "addnote") => {
    setModalToShow(modal);
    setIsIconAddVisible(false);
  };

  const closeModal = () => {
    setModalToShow(null);
  };

  // Función para guardar la nota, aquí deberías conectar con tu lógica real
  const handleSaveNote = (newNote: Note) => {
    console.log("Guardar nota:", newNote);
    // Aquí guardarías en estado global o localStorage
    closeModal();
  };

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

      {isIconAddVisible && (
        <IconAdd
          onClose={toggleIconAdd}
          openModal={openModal}
          folders={exampleFolders}
          onSaveNote={handleSaveNote}
        />
      )}

      {modalToShow === "quiz" && (
        <DailyQuiz onClose={closeModal} addNewEntrie={() => {}} />
      )}

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
