import { TiTickOutline } from "react-icons/ti";
import { ColourOptions } from "../../misc/filterOptions";

export default function ColourDropdown() {
  return (
    <div className="dropdown">
      <button className="btn-all">
        <TiTickOutline className="tick-icon" /> <span>ALL</span>
      </button>
      <div className="dropdown__content">
        {ColourOptions?.map(({ label }, i) => (
          <div className="dropdown__btn" key={i}>
            <p>{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
