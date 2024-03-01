import { useState } from "react";
import { FaHeart } from "react-icons/fa6";

import { Product } from "../../misc/types";
import "./ProductCard.scss";
import { useNavigate } from "react-router";

export default function ProductCard({
  id,
  title,
  description,
  price,
  category,
  images,
}: Product) {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const ThumbnailHoverHandler = (index: number) => {
    setCurrentImageIndex(index);
  };

  const clickHandler = () => {
    navigate(`${id}`);
  };

  return (
    <div className="product-card" onClick={clickHandler}>
      <div className="image-container">
        <img
          src={images[currentImageIndex]}
          alt={title}
          className="main-image"
        />
      </div>

      <div className="thumbnail-list">
        {images?.map((image, i) => (
          <div
            key={i}
            onMouseEnter={() => ThumbnailHoverHandler(i)}
            className={`thumbnail-container ${
              currentImageIndex === i ? "active" : ""
            }`}
          >
            <img src={image} alt={`Thumbnail ${i}`} className={`thumbnail `} />
          </div>
        ))}
      </div>

      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <p className="product-price">${price}</p>
      </div>

      <div className="wishlist-icon">
        <FaHeart />
      </div>
    </div>
  );
}
