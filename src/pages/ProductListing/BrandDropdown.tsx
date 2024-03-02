import React from "react";
import { TiTickOutline } from "react-icons/ti";

import { BrandOptions } from "../../misc/filterOptions";

export default function BrandDropdown() {
  return (
    <div className="dropdown">
      <button className="btn-all">
        <TiTickOutline className="tick-icon" /> <span>ALL</span>
      </button>
      <div className="dropdown__content">
        {BrandOptions?.map(({ label }, i) => (
          <div className="dropdown__btn" key={i}>
            <p>{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
