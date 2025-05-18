import "./AchievementPopup.scss";
import logroCompletado from "../../../../assets/images/achievement-completed.png";
import { Achievement } from "../../../../constants/achievements";
import useBodyScrollLock from "../../../../utils/bodyScrollLock";

interface AchievementPopupProps {
  achievement: Achievement;
  onClose: () => void;
}

const AchievementPopup = ({ achievement, onClose }: AchievementPopupProps) => {
  // Bloquear scrolld del fondo
  useBodyScrollLock();

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <span
          className="material-symbols-rounded popup-close"
          onClick={onClose}
        >
          close
        </span>

        <h2 className="achievement-tittle">{achievement.title}</h2>
        <img src={logroCompletado} alt="Logro" className="popup-icon" />
        <p className="achievement-subtittle">{achievement.subtitle}</p>
        <div className="achievement-date">
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
