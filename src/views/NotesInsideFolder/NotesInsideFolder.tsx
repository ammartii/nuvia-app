import "./NotesInsideFolder.scss";
import Nav from "../../components/layout/Nav/Nav";
import NuviaHeader from "../../components/layout/NuviaHeader/NuviaHeader";
import Button from "../../components/ui/buttons/Button";
import AddNote from "../../components/ui/modals/AddNote/AddNote";
import GoToAppModal from "../../components/ui/modals/GoToApp/GoToApp";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Folder } from "../../models/folder.model";
import type { Note } from "../../models/note.model";
import { NoteCard } from "../../components/ui/cards/NoteCard/NoteCard";
import { useActiveUser } from "../../hooks/useActiveUser";

const NotesInsideFolder = () => {
  const navigate = useNavigate();
  const { user } = useActiveUser();
  const { folderId } = useParams<{ folderId: string }>();

  const [folder, setFolder] = useState<Folder | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [showAddNote, setShowAddNote] = useState(false);

  // Cargar carpeta actual y sus notas
  useEffect(() => {
    if (!user || !folderId) return;

    setFolders(user.folders || []);

    // Buscar carpeta por ID
    const currentFolder =
      (user.folders || []).find((f) => f.id === folderId) || null;
    setFolder(currentFolder);

    // Filtrar notas que pertenecen a la carpeta
    const folderNotes = (user.notes || []).filter(
      (note) => note.folderId === folderId
    );
    setNotes(folderNotes);
  }, [user, folderId]);

  // Agregar nueva nota a la carpeta
  const handleNoteAdded = (newNote: Note) => {
    const updatedNotes = [...notes, newNote];

    // Mostrar solo las notas de la carpeta actual
    setNotes(updatedNotes.filter((note) => note.folderId === newNote.folderId));
  };

  // Validar si la carpeta existe
  if (!folder) return <p>Carpeta no encontrada</p>;

  return (
    <div>
      <GoToAppModal />
      <NuviaHeader title={folder.name} />

      <div className="notes-inside-folder__container">
        {/* Modal para añadir nota */}
        {showAddNote && (
          <AddNote
            folders={folders}
            onClose={() => setShowAddNote(false)}
            onNoteAdded={handleNoteAdded}
          />
        )}

        {/* Lista de notas dentro de la carpeta */}
        <div className="notes-list">
          {notes.length === 0 ? (
            <p className="no-things-text">No hay notas en esta carpeta.</p>
          ) : (
            notes.map(({ id, title, content, image }) => (
              <NoteCard
                key={id}
                title={title}
                content={content}
                image={image}
              />
            ))
          )}
        </div>

        {/* Botones de acción */}
        <div className="notes-inside-folder__buttons">
          <Button variant="purple" onClick={() => setShowAddNote(true)}>
            Añadir Nota
          </Button>
          <Button variant="outline" onClick={() => navigate("/notes-folder")}>
            Volver a carpetas
          </Button>
        </div>
      </div>

      <Nav />
    </div>
  );
};

export default NotesInsideFolder;
