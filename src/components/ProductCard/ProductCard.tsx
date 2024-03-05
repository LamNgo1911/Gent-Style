import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Product } from "../../misc/types";
import "./ProductCard.scss";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../../redux/slices/productSlice";

type ProductProps = Product & {
  product: Product;
};

const ProductCard: React.FC<ProductProps> = ({
  id,
  title,
  description,
  price,
  category,
  images,
  product,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const ThumbnailHoverHandler = (index: number) => {
    setCurrentImageIndex(index);
  };

  const clickHandler = () => {
    navigate(`/products/${id}`);
  };

  const savedToWishlistHandler = () => {
    console.log("Hello");
    dispatch(addToWishlist(product));
  };

  return (
    <div className="product-card">
      <div className="product-card-container" onClick={clickHandler}>
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
              <img
                src={image}
                alt={`Thumbnail ${i}`}
                className={`thumbnail `}
              />
            </div>
          ))}
        </div>

        <div className="product-info">
          <h3 className="product-title">{title}</h3>
          <p className="product-price">${price}</p>
        </div>
      </div>

      <div
        aria-label="Add to Wishlist"
        className="wishlist-icon"
        onClick={savedToWishlistHandler}
      >
        <FaHeart />
      </div>
    </div>
  );
};

export default ProductCard;
