import { Folder } from "../../../../models/folder.model";
import "./FolderSelector.scss";

interface FolderSelectorProps {
  folders: Folder[];
  selectedFolderId: string;
  onChange: (folderId: string) => void;
}

const FolderSelector = ({
  folders,
  selectedFolderId,
  onChange,
}: FolderSelectorProps) => {
  return (
    <select
      className="folder-selector"
      value={selectedFolderId}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Selecciona una carpeta</option>
      {folders.map(({ id, name }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default FolderSelector;
