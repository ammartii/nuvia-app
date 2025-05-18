import Girl from "../../../assets/images/nuvia-girl.png";
import "./SideImage.scss";

const SideImage = () => {
  return (
    <div className="side-image">
      <img src={Girl} alt="Girl" className="side-girl" />
    </div>
  );
};

export default SideImage;
