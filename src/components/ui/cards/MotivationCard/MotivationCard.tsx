import "./MotivationCard.scss";

interface MotivationCardProps {
  image: string;
  text: string;
  isSelected: boolean;
  onClick?: () => void;
  readonly?: boolean;
}

const MotivationCard = ({
  image,
  text,
  isSelected,
  onClick,
  readonly = false,
}: MotivationCardProps) => {
  return (
    <div
      className={`motivation-card ${
        !readonly && isSelected ? "selected" : ""
      } ${readonly ? "readonly" : ""}`}
      onClick={readonly ? undefined : onClick}
    >
      <img className="img-motivation-card" src={image} alt={text} />
      <p className="text-motivation-card">{text}</p>
    </div>
  );
};

export default MotivationCard;
