import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import "./ImageCarousel.scss";

import nuvia01 from "../../../../assets/carousel/01.png";
import nuvia02 from "../../../../assets/carousel/02.png";
import nuvia03 from "../../../../assets/carousel/03.png";
import nuvia04 from "../../../../assets/carousel/04.png";
import nuvia05 from "../../../../assets/carousel/05.png";

const images = [nuvia01, nuvia02, nuvia03, nuvia04, nuvia05];

export const ImageCarousel: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
  });
  const [visibleIndex, setVisibleIndex] = useState(0);

  const autoplay = useCallback(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    // obtiene la posición visual real (incluso en loop)
    const index = emblaApi.selectedScrollSnap() % images.length;
    setVisibleIndex(index);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect(); // inicial
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const stop = autoplay();
    return stop;
  }, [autoplay]);

  return (
    <div className="image-carousel" ref={emblaRef}>
      <div className="image-carousel__container">
        {images.map((src, index) => (
          <div
            className={`image-carousel__slide ${
              index === visibleIndex ? "is-active" : ""
            }`}
            key={index}
          >
            <img
              src={src}
              alt={`Mockup ${index + 1}`}
              className="image-carousel__img"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
