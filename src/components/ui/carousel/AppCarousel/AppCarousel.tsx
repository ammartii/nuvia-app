import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import "./AppCarousel.scss";

import app01 from "../../../../assets/app/01.png";
import app02 from "../../../../assets/app/02.png";
import app03 from "../../../../assets/app/03.png";
import app04 from "../../../../assets/app/04.png";
import app05 from "../../../../assets/app/05.png";
import app06 from "../../../../assets/app/06.png";
import app07 from "../../../../assets/app/07.png";
import app08 from "../../../../assets/app/08.png";
import app09 from "../../../../assets/app/09.png";

const images = [app01, app02, app03, app04, app05, app06, app07, app08, app09];

export const AppCarousel: React.FC = () => {
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
  });

  return (
    <div className="app-carousel" ref={emblaRef}>
      <div className="app-carousel__container">
        {images.map((src, index) => (
          <div className="app-carousel__slide" key={index}>
            <img
              src={src}
              alt={`App ${index + 1}`}
              className="app-carousel__img"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
