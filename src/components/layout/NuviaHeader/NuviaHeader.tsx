import "./NuviaHeader.scss";

interface NuviaHeaderProps {
  title: string;
}

const NuviaHeader = ({ title }: NuviaHeaderProps) => {
  return (
    <div className="nuvia-header__container">
      <header className="profile__header">
        <div className="profile__icons">
          <div className="profile__cloud-icon" />
        </div>
        <span className="nuvia-header__title">{title}</span>
        <div className="profile__icons">
          <span className="material-symbols-rounded">notifications</span>
          <span className="material-symbols-rounded">settings</span>
        </div>
      </header>
    </div>
  );
};

export default NuviaHeader;
