import React from "react";
import "./CategoryCardSkeleton.scss";

export default function CategoryCardSkeleton() {
  return (
    <div className="category-card-skeleton">
      <div className="category-card__image-skeleton" />
      <div className="category-card__title-skeleton" />
    </div>
  );
}
