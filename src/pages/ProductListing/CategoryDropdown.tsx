import { useFetchAllCategoriesQuery } from "../../redux/productQuery";
import { TiTickOutline } from "react-icons/ti";

export default function CategoryDropdown() {
  const { data: category, isLoading, error } = useFetchAllCategoriesQuery();

  return (
    <div className="dropdown">
      <button className="btn-all">
        <TiTickOutline className="tick-icon" /> <span>ALL</span>
      </button>
      <div className="dropdown__content">
        {category?.map(({ name }, i) => (
          <div className="dropdown__btn" key={i}>
            <p>{name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
