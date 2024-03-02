import "./CategoryCard.scss";
import { Category } from "../../misc/types";
import { useNavigate } from "react-router-dom";

export default function CategoryCard({ id, image, name }: Category) {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`/products`);
  };
  return (
    <div className="category-card" onClick={clickHandler}>
      <img className="category-card__image" src={image} alt={name} />
      <h2 className="category-card__title">{name}</h2>
    </div>
  );
}
