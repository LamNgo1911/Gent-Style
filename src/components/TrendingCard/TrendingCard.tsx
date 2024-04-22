import React from "react";
import "./TrendingCard.scss";
import { TrendingCategory } from "../../misc/types";
import { useNavigate } from "react-router-dom";
import { useFilter } from "../../context/useFilter";

export default function TrendingCard({
  id,
  title,
  category,
  description,
  image,
}: TrendingCategory) {
  const navigate = useNavigate();
  const { setCategoryName } = useFilter();

  const handleClick = () => {
    setCategoryName(category);
    navigate("/products");
  };
  return (
    <div className="trending-container" onClick={handleClick}>
      <div className="image-container">
        <img src={image} alt={title} className="trending-img" />
      </div>
      <div className="trending-info">
        <h1>{title.toUpperCase()}</h1>
        <p>{description}</p>
      </div>
      <button className="trending-btn">SHOP NOW</button>
    </div>
  );
}
