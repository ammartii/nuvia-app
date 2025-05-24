import activity01 from "../assets/activities/activity-01.png";
import activity02 from "../assets/activities/activity-02.png";
import activity03 from "../assets/activities/activity-03.png";
import activity04 from "../assets/activities/activity-04.png";
import activity05 from "../assets/activities/activity-05.png";
import activity06 from "../assets/activities/activity-06.png";
import activity07 from "../assets/activities/activity-07.png";
import activity08 from "../assets/activities/activity-08.png";
import activity09 from "../assets/activities/activity-09.png";
import activity10 from "../assets/activities/activity-10.png";
import activity11 from "../assets/activities/activity-11.png";
import activity12 from "../assets/activities/activity-12.png";
import activity13 from "../assets/activities/activity-13.png";
import activity14 from "../assets/activities/activity-14.png";
import activity15 from "../assets/activities/activity-15.png";

export interface ActivitiesList {
  text: string;
  image: string;
}

const activities: ActivitiesList[] = [
  { text: "Alimentación", image: activity01 },
  { text: "Amabilidad", image: activity02 },
  { text: "Aprendizaje", image: activity03 },
  { text: "Creatividad", image: activity04 },
  { text: "Descanso", image: activity05 },
  { text: "Desconexión", image: activity06 },
  { text: "Ejercicio", image: activity07 },
  { text: "Hidratación", image: activity08 },
  { text: "Luz natural", image: activity09 },
  { text: "Mascotas", image: activity10 },
  { text: "Meditación", image: activity11 },
  { text: "Música", image: activity12 },
  { text: "Organización", image: activity13 },
  { text: "Risa", image: activity14 },
  { text: "Socializar", image: activity15 },
];

export default activities;
