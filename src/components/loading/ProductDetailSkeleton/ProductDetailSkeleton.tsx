import "./ProductDetailSkeleton.scss";

export default function ProductDetailSkeleton() {
  return (
    <div className="product-detail__infor-skeleton">
      <div className="product-detail__title-skeleton" />
      <div className="product-detail__price-skeleton" />
      <div className="product-detail__description-skeleton">
        <div className="description-btn-skeleton" />
        <div className={`description-content-skeleton`} />
      </div>
      <div className="product-detail__btns-skeleton">
        <div className="add-btn-skeleton" />
        <div className="heart-btn-skeleton" />
      </div>
    </div>
  );
}
