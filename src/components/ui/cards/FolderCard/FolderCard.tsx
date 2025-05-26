import "./FolderCard.scss";
import folderIcon from "../../../../assets/images/folder.png";

// Tipado de props
type FolderCardProps = {
  name: string;
  onClick: () => void;
};

// Tarjeta de carpeta con nombre e ícono
const FolderCard = ({ name, onClick }: FolderCardProps) => (
  <div className="folder-card" onClick={onClick}>
    {/* Ícono de carpeta */}
    <img className="folder-card__image" src={folderIcon} alt="Folder" />

    {/* Nombre de la carpeta */}
    <h3 className="folder-card__name">{name}</h3>
  </div>
);

export default FolderCard;
