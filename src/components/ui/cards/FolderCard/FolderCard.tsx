import "./FolderCard.scss";
import folderIcon from "../../../../assets/images/folder.png";

type FolderCardProps = {
  name: string;
  onClick: () => void;
};

const FolderCard = ({ name, onClick }: FolderCardProps) => (
  <div className="folder-card" onClick={onClick}>
    <img className="folder-card__image" src={folderIcon} alt="Folder" />
    <h3 className="folder-card__name">{name}</h3>
  </div>
);

export default FolderCard;
