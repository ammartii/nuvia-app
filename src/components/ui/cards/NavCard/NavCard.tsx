import "./NavCard.scss";
import { Link } from "react-router-dom";

interface NavCardProps {
  icon: string;
  label: string;
  link: string;
}

const NavCard = ({ icon, label, link }: NavCardProps) => {
  return (
    <Link to={link} className="nav-card nav-card__link">
      <div className="nav-card__left">
        <img className="nav-card__img" src={icon} alt={label} />
        <span className="nav-card__label">{label}</span>
      </div>

      <span className="material-symbols-rounded nav-card__icon">
        chevron_right
      </span>
    </Link>
  );
};

export default NavCard;
