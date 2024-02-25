import React from "react";

import { Product } from "../../misc/typesInRedux";
import "./ProductCard.scss";

export default function ProductCard({
  id,
  title,
  description,
  price,
  category,
  images,
}: Product) {
  return (
    <div className="product-card">
      <div className="image-container">
        <img src={images[0]} alt={title} />
      </div>
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <p className="product-price">${price}</p>
      </div>
      <div className="wishlist-icon">
        <i className="fas fa-heart"></i>
      </div>
      <button className="add-to-cart-btn">Add to Cart</button>
    </div>
  );
}
