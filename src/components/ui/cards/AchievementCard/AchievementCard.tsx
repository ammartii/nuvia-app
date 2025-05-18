import "./AchievementCard.scss";
import logroCompletado from "../../../../assets/images/achievement-completed.png";

interface AchievementCardProps {
  title: string;
  subtitle: string;
  achieved: boolean;
}

function AchievementCard({ title, subtitle, achieved }: AchievementCardProps) {
  return (
    <div className={`achievement-card ${achieved ? "" : "not-achieved"}`}>
      <img
        src={logroCompletado}
        alt="Logro completado"
        className="achievement-img"
      />

      <div className="achievement-text__container">
        <h3 className="achievement-title">{title}</h3>
        <p className="achievement-subtitle">{subtitle}</p>
      </div>
    </div>
  );
}

export default AchievementCard;
