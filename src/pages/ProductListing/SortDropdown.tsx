import { useDispatch } from "react-redux";
import { sortOptions } from "../../misc/filterOptions";
import { sortProductsbyPrice } from "../../redux/slices/productSlice";

export default function SortDropdown() {
  const dispatch = useDispatch();
  const sortPriceHandler = (label: string) => {
    dispatch(sortProductsbyPrice(label));
  };
  return (
    <div className="dropdown">
      <div className="dropdown__content">
        {sortOptions?.map(({ label }, i) => (
          <div
            className="dropdown__btn"
            key={i}
            onClick={() => sortPriceHandler(label)}
          >
            <p>{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
