import React from "react";
import "./NoteCard.scss";

type NoteCardProps = {
  title: string;
  content: string;
  image?: string;
};

export const NoteCard: React.FC<NoteCardProps> = ({ title, content }) => {
  return (
    <div className="note-card">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};
