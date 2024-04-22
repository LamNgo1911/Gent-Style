import { useFetchAllCategoriesQuery } from "../../redux/productQuery";
import { useFilter } from "../../context/useFilter";

export default function CategoryDropdown() {
  const { data, isLoading, error } = useFetchAllCategoriesQuery();
  const { categoryName, setCategoryName } = useFilter();

  const filteByCategoryHandler = (name: string) => {
    if (categoryName === name) {
      setCategoryName("");
    } else {
      setCategoryName(name);
    }
  };

  return (
    <div className="dropdown">
      <div className="dropdown__content category">
        {data?.categories?.map(({ name, id }, i) => (
          <div
            className={`dropdown__btn ${categoryName === name && "active"}`}
            key={i}
            onClick={() => filteByCategoryHandler(name)}
          >
            <p>{name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
