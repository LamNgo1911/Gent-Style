import { useState } from "react";
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./ImageCard.scss";

type ImageCardProps = {
  images: string[];
};

export default function ImageCard({ images }: ImageCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevClick = () => {
    if (activeIndex > 0) setActiveIndex((prevIndex) => prevIndex - 1);
  };

  const handleNextClick = () => {
    if (activeIndex < images.length - 1)
      setActiveIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="image-card">
      <div className="thumbnails">
        {images?.map((image, index) => (
          <div
            className={`thumbnail ${index === activeIndex ? "active" : ""}`}
            key={index}
            onClick={() => setActiveIndex(index)}
          >
            <img src={image} alt={`Thumbnail ${index}`} />
          </div>
        ))}
      </div>

      <div className="main-image">
        <Carousel
          selectedItem={activeIndex}
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          showArrows={false} // Remove the previous and next arrows
          onChange={setActiveIndex}
        >
          {images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Image ${index}`} />
            </div>
          ))}
        </Carousel>

        <button className="prev-button" onClick={handlePrevClick}>
          <MdKeyboardDoubleArrowLeft />
        </button>
        <button className="next-button" onClick={handleNextClick}>
          <MdKeyboardDoubleArrowRight />
        </button>
      </div>
    </div>
  );
}
