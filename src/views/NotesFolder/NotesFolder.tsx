import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NotesFolder.scss";

import Nav from "../../components/layout/Nav/Nav";
import NuviaHeader from "../../components/layout/NuviaHeader/NuviaHeader";
import GoToAppModal from "../../components/ui/modals/GoToApp/GoToApp";
import FolderCard from "../../components/ui/cards/FolderCard/FolderCard";
import Button from "../../components/ui/buttons/Button";
import AddFolder from "../../components/ui/modals/AddFolder/AddFolder";
import AddNote from "../../components/ui/modals/AddNote/AddNote";

import type { Folder } from "../../models/folder.model";
import type { Note } from "../../models/note.model";

import { useActiveUser } from "../../hooks/useActiveUser";

const NotesFolder = () => {
  const { user, updateActiveUser } = useActiveUser();
  const navigate = useNavigate();

  const [folders, setFolders] = useState<Folder[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [showAddFolder, setShowAddFolder] = useState(false);
  const [showAddNote, setShowAddNote] = useState(false);

  useEffect(() => {
    if (!user) return;
    setFolders(user.folders || []);
    setNotes(user.notes || []);
  }, [user]);

  const handleAddFolder = (name: string, description: string) => {
    if (!user) return;

    const newFolder: Folder = {
      id: crypto.randomUUID(),
      name: name.trim() || "Nombre carpeta",
      description: description.trim(),
    };

    const updatedFolders = [...folders, newFolder];
    updateActiveUser({ folders: updatedFolders });

    setFolders(updatedFolders);
    setShowAddFolder(false);
  };

  const handleAddNote = (newNote: Note) => {
    if (!user) return;

    const updatedNotes = [...notes, newNote];
    updateActiveUser({ notes: updatedNotes });

    setNotes(updatedNotes);
    setShowAddNote(false);
  };

  const modalsOpen = showAddFolder || showAddNote;

  return (
    <div>
      <GoToAppModal />
      <NuviaHeader title="Mis Carpetas" />

      <div className="notes-folder-container">
        {showAddFolder && (
          <AddFolder
            onSave={handleAddFolder}
            onClose={() => setShowAddFolder(false)}
          />
        )}

        {showAddNote && (
          <AddNote
            folders={folders}
            onSave={handleAddNote}
            onClose={() => setShowAddNote(false)}
          />
        )}

        {!modalsOpen && (
          <>
            <div className="folders">
              {folders.length === 0 ? (
                <p className="no-things-text">
                  No tienes carpetas creadas todavía.
                </p>
              ) : (
                folders.map((folder) => (
                  <FolderCard
                    key={folder.id}
                    name={folder.name}
                    onClick={() => navigate(`/notes-folder/${folder.id}`)}
                  />
                ))
              )}
            </div>

            <Button variant="purple" onClick={() => setShowAddFolder(true)}>
              Añadir carpeta
            </Button>
            <Button variant="purple" onClick={() => setShowAddNote(true)}>
              Añadir nota
            </Button>
          </>
        )}
      </div>

      <Nav />
    </div>
  );
};

export default NotesFolder;
