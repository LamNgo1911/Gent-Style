import { useFilter } from "../../context/useFilter";
import { ColourOptions } from "../../misc/filterOptions";

export default function ColourDropdown() {
  const { color, setColor } = useFilter();
  const filteByColorHandler = (label: string) => {
    color === label ? setColor("") : setColor(label);
  };

  return (
    <div className="dropdown">
      <div className="dropdown__content">
        {ColourOptions?.map(({ label }, i) => (
          <div
            className={`dropdown__btn ${label === color && "active"}`}
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
