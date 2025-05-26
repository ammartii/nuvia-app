// Importación de tipos y estilos
import { Folder } from "../../../../models/folder.model";
import "./FolderSelector.scss";

// Props del componente
interface FolderSelectorProps {
  folders: Folder[];
  selectedFolderId: string;
  onChange: (folderId: string) => void;
}

// Selector de carpeta para asignar notas
const FolderSelector = ({
  folders,
  selectedFolderId,
  onChange,
}: FolderSelectorProps) => {
  return (
    <select
      className="folder-selector"
      value={selectedFolderId}
      onChange={(e) => onChange(e.target.value)} // Llama al callback al cambiar opción
    >
      {/* Opción por defecto */}
      <option value="">Selecciona una carpeta</option>

      {/* Opciones generadas a partir de las carpetas disponibles */}
      {folders.map(({ id, name }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default FolderSelector;
