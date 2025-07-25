import Nav from "../../components/layout/Nav/Nav";
import GoToAppModal from "../../components/ui/modals/GoToApp/GoToApp";
import NuviaHeader from "../../components/layout/NuviaHeader/NuviaHeader";
import NavCard from "../../components/ui/cards/NavCard/NavCard";

import { icons } from "../../constants/icons";

import { useActiveUser } from "../../hooks/useActiveUser";
import { useUserStats } from "../../hooks/useUserStats";

import "./Profile.scss";

const Profile = () => {
  const { user } = useActiveUser();
  const { entriesCount, photosCount } = useUserStats();

  const capitalize = (str: string) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  return (
    <>
      <GoToAppModal />
      <NuviaHeader title="Perfil" />

      <div className="profile-container">
        {/* Section Premium Banner */}
        <section className="profile__premium-banner">
          <div className="profile__premium-banner-text">
            <h3 className="profile__title ">Pase Premium</h3>
            <p className="profile__text">¡Accede a todas las funciones!</p>
          </div>
          <div className="profile__premium-banner-icon" />
        </section>

        {/* Section Account */}
        <section className="profile-account">
          <h3 className="profile__title ">Cuenta</h3>
          <div className="profile-account__user-card">
            <div className="user-card__text">
              <div
                className="profile__avatar"
                style={{
                  backgroundImage: user?.avatarUrl
                    ? `url(${user.avatarUrl})`
                    : "none",
                }}
              />
              <span>{capitalize(user?.username || "")}</span>
            </div>
            <span className="material-symbols-rounded nav-card__icon">
              chevron_right
            </span>
          </div>
        </section>

        {/* Section Records */}
        <section className="profile-records">
          <h3 className="profile__title ">Mis registros</h3>
          <div className="profile-records__boxes">
            <div className="profile-records__record">
              <p className="profile__text">Registros</p>
              <span>{entriesCount}</span>
            </div>
            <div className="profile-records__record">
              <p className="profile__text">Fotos</p>
              <span>{photosCount}</span>
            </div>
          </div>
        </section>

        {/* Section Profile Nav */}
        <section className="profile__nav">
          {[
            {
              icon: icons.Calendar,
              label: "Días importantes",
              link: "/featured-days",
            },
            {
              icon: icons.Gallery,
              label: "Galería de fotos",
              link: "/photo-gallery",
            },
            { icon: icons.Reports, label: "Informes", link: "/reports" },
            {
              icon: icons.Achievements,
              label: "Logros",
              link: "/achievements",
            },
            {
              icon: icons.Motivation,
              label: "Motivaciones",
              link: "/motivations",
            },
            { icon: icons.Notes, label: "Notas", link: "/notes-folder" },
          ].map(({ icon, label, link }) => (
            <NavCard key={label} icon={icon} label={label} link={link} />
          ))}
        </section>
      </div>

      <Nav />
    </>
  );
};

export default Profile;
