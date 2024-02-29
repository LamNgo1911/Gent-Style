import React from "react";
import { sortOptions } from "../../misc/filterOptions";

export default function SortDropdown() {
  return (
    <div className="dropdown">
      <div className="dropdown__content">
        {sortOptions?.map(({ label }, i) => (
          <div className="dropdown__btn" key={i}>
            <p>{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
