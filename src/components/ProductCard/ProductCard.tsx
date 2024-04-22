import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Product } from "../../misc/types";
import { addToWishlist } from "../../redux/slices/productSlice";
import "./ProductCard.scss";

type ProductProps = Product & {
  product: Product;
};

const ProductCard: React.FC<ProductProps> = ({
  id,
  name,
  price,
  description,
  category,
  variants,
  images,
  product,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const ThumbnailHoverHandler = (index: number) => {
    setCurrentImageIndex(index);
  };

  const clickHandler = () => {
    navigate(`/products/${id}`);
  };

  const savedToWishlistHandler = () => {
    dispatch(addToWishlist(product));
  };

  return (
    <div className="product-card">
      <div className="product-card-container" onClick={clickHandler}>
        <div className="image-container">
          <img
            src={images[currentImageIndex]}
            alt={name}
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
          <h3 className="product-title">{name}</h3>
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
