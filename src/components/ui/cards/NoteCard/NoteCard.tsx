// Importaciones necesarias
import "./NoteCard.scss";

// Tipado de props
type NoteCardProps = {
  title: string;
  content: string;
  image?: string; // (Opcional) imagen asociada a la nota
};

// Tarjeta que muestra una nota con título y contenido
export const NoteCard = ({ title, content }: NoteCardProps) => {
  return (
    <div className="note-card">
      {/* Título de la nota */}
      <h3 className="note-card__name">{title}</h3>

      {/* Contenido de la nota */}
      <p className="note-card__content">{content}</p>
    </div>
  );
};
