import "./ProductCardSkeleton.scss";

export default function ProductCardSkeleton() {
  return (
    <div className="product-card-skeleton">
      <div className="main-image-skeleton" />

      <div className="thumbnail-list-skeleton">
        <div className="thumbnail-skeleton" />
        <div className="thumbnail-skeleton" />
        <div className="thumbnail-skeleton" />
      </div>

      <div className="product-info-skeleton">
        <div className="product-title-skeleton" />
        <div className="product-price-skeleton" />
      </div>
    </div>
  );
}
