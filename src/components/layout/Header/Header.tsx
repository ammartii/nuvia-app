import { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

type HeaderProps = {
  rightContent?: ReactNode;
};

const Header = ({ rightContent }: HeaderProps) => {
  return (
    <header className="landing-header">
      <div className="landing-header__left">
        <Link to="/landing" className="header__logo">
          nuvia.
        </Link>
      </div>
      {rightContent && (
        <div className="landing-header__right">{rightContent}</div>
      )}
    </header>
  );
};

export default Header;
