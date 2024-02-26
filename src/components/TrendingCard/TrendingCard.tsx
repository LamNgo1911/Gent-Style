import React from "react";
import "./TrendingCard.scss";
import { TrendingCategory } from "../../misc/types";

export default function TrendingCard({
  id,
  title,
  description,
  image,
}: TrendingCategory) {
  return (
    <div className="trending-container">
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
