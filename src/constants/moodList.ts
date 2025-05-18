import mood01 from "../assets/mood-images/mood-01.png";
import mood02 from "../assets/mood-images/mood-02.png";
import mood03 from "../assets/mood-images/mood-03.png";
import mood04 from "../assets/mood-images/mood-04.png";
import mood05 from "../assets/mood-images/mood-05.png";

export interface MoodList {
  text: string;
  image: string;
}

const moodList: MoodList[] = [
  { text: "Me siento optimista", image: mood01 },
  { text: "Me siento alegre", image: mood02 },
  { text: "Me siento en calma", image: mood03 },
  { text: "Me siento reflexivo", image: mood04 },
  { text: "Me siento triste", image: mood05 },
];

export default moodList;
