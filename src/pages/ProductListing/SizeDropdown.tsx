import { useFilter } from "../../context/useFilter";
import { SizeOptions } from "../../misc/filterOptions";

export default function SizeDropdown() {
  const { size, setSize } = useFilter();
  const filteByColorHandler = (label: string) => {
    size === label ? setSize("") : setSize(label);
  };

  return (
    <div className="dropdown">
      <div className="dropdown__content">
        {SizeOptions?.map(({ label }, i) => (
          <div
            className={`dropdown__btn ${label === size && "active"}`}
            key={i}
            onClick={() => filteByColorHandler(label)}
          >
            <p>{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
