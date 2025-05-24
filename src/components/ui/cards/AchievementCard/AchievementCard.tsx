import "./AchievementCard.scss";
import logroCompletado from "../../../../assets/images/achievement-completed.png";

// Props que recibe el componente
interface AchievementCardProps {
  title: string;
  subtitle: string;
  achieved: boolean;
}

function AchievementCard({ title, subtitle, achieved }: AchievementCardProps) {
  return (
    // Clase condicional para indicar si el logro no ha sido conseguido
    <div className={`achievement-card ${achieved ? "" : "not-achieved"}`}>
      {/* Imagen del logro (se muestra siempre, pero se puede cambiar según estado si lo deseas) */}
      <img
        src={logroCompletado}
        alt="Logro completado"
        className="achievement-card__img"
      />

      {/* Contenedor de textos del logro */}
      <div className="achievement-card__text-container">
        <h3 className="achievement-card__title">{title}</h3>
        <p className="achievement-card__subtitle">{subtitle}</p>
      </div>
    </div>
  );
}

export default AchievementCard;
