import { sortOptions } from "../../misc/filterOptions";
import { useFilter } from "../../context/useFilter";

export default function SortDropdown() {
  const { setSort, sort } = useFilter();

  return (
    <div className="dropdown">
      <div className="dropdown__content">
        {sortOptions?.map(({ label }, i) => (
          <div
            className={`dropdown__btn ${label === sort && "active"}`}
            key={i}
            onClick={() => setSort(label === sort ? "" : label)}
          >
            <p>{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
