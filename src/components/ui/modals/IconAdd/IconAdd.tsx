import useBodyScrollLock from "../../../../hooks/useBodyScrollLock";
import Button from "../../buttons/Button";

import "./IconAdd.scss";

interface IconAddProps {
  onClose: () => void;
  openModal: (modal: "quiz" | "addnote") => void;
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
