import activity01 from "../assets/activity-images/activity-image.png";

export interface ActivitiesList {
  text: string;
  image: string;
}

const activities: ActivitiesList[] = [
  { text: "Amabilidad", image: activity01 },
  { text: "Alimentación saludable", image: activity01 },
  { text: "Aprendendizaje", image: activity01 },
  { text: "Desconexión digital", image: activity01 },
  { text: "Descanso adecuado", image: activity01 },
  { text: "Ejercicio físico", image: activity01 },
  { text: "Hidratación", image: activity01 },
  { text: "Meditación", image: activity01 },
  { text: "Organización", image: activity01 },
];

export default activities;
