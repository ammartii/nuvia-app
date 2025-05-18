import useBodyScrollLock from "../../../../utils/bodyScrollLock";
import Button from "../../buttons/Button";

import "./IconAdd.scss";
import { Folder } from "../../../../models/folder.model";
import { Note } from "../../../../models/note.model";

interface IconAddProps {
  onClose: () => void;
  openModal: (modal: "quiz" | "addnote") => void;
  folders: Folder[];
  onSaveNote: (newNote: Note) => void;
}

function IconAdd({ onClose, openModal }: IconAddProps) {
  useBodyScrollLock();

  const handleBackgroundClick = () => {
    onClose();
  };

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className="icon-add" onClick={handleBackgroundClick}>
      <div className="icon-add-content" onClick={handleContentClick}>
        <Button
          variant="secondary"
          onClick={() => {
            openModal("quiz");
            onClose();
          }}
        >
          Estado de ánimo
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            openModal("addnote");
            onClose();
          }}
        >
          Pensamiento
        </Button>
      </div>
    </div>
  );
}

export default IconAdd;
