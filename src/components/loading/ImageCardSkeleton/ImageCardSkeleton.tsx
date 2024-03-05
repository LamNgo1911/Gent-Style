import "./ImageCardSkeleton.scss";

export default function ImageCardSkeleton() {
  return (
    <div className="image-card-skeleton">
      <div className="thumbnails-skeleton">
        <div className={`thumbnail-skeleton `} />
        <div className={`thumbnail-skeleton `} />
        <div className={`thumbnail-skeleton `} />
      </div>

      <div className="main-image-skeleton" />
    </div>
  );
}
