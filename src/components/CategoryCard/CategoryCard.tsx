import "./CategoryCard.scss";
import { Category } from "../../misc/typesInRedux";

export default function CategoryCard({ id, image, name }: Category) {
  return (
    <div className="category-card">
      <img className="category-card__image" src={image} alt={name} />
      <h2 className="category-card__title">{name}</h2>
    </div>
  );
}
