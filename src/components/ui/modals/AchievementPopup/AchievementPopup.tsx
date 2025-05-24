import "./AchievementPopup.scss";
import logroCompletado from "../../../../assets/images/achievement-completed.png";
import { Achievement } from "../../../../constants/achievements";
import useBodyScrollLock from "../../../../hooks/useBodyScrollLock";

// Props que recibe el componente
interface AchievementPopupProps {
  achievement: Achievement;
  onClose: () => void;
}

const AchievementPopup = ({ achievement, onClose }: AchievementPopupProps) => {
  // Bloquea el scroll del fondo cuando se muestra el popup
  useBodyScrollLock();

  return (
    // Capa de fondo del popup, cierra al hacer clic fuera del contenido
    <div className="popup-overlay" onClick={onClose}>
      {/* Contenido del popup, detiene la propagación para evitar cerrar al hacer clic dentro */}
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        {/* Botón de cierre */}
        <span
          className="material-symbols-rounded popup-close"
          onClick={onClose}
        >
          close
        </span>

        {/* Título del logro */}
        <h2 className="achievement-popup__tittle">{achievement.title}</h2>

        {/* Imagen del logro */}
        <img
          src={logroCompletado}
          alt="Logro"
          className="achievement-popup__img"
        />

        {/* Subtítulo o descripción corta */}
        <p className="achievement-popup__subtittle">{achievement.subtitle}</p>

        {/* Fecha del logro o mensaje si no se ha logrado */}
        <div className="achievement-popup__date">
          {achievement.achieved ? (
            <p>
              <strong>Fecha lograda:</strong> {achievement.dateAchieved}
            </p>
          ) : (
            <p>
              <em>Logro no obtenido</em>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AchievementPopup;
