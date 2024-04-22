import "./CategoryCard.scss";
import { Category } from "../../misc/types";
import { useNavigate } from "react-router-dom";
import { useFilter } from "../../context/useFilter";

export default function CategoryCard({ id, image, name }: Category) {
  const navigate = useNavigate();
  const { setCategoryName } = useFilter();

  const clickHandler = () => {
    setCategoryName(name);
    navigate(`/products`);
  };
  return (
    <div className="category-card" onClick={clickHandler}>
      <img className="category-card__image" src={image} alt={name} />
      <h2 className="category-card__title">{name}</h2>
    </div>
  );
}
