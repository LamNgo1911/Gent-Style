import React from "react";
import { SizeOptions } from "../../misc/filterOptions";
import { TiTickOutline } from "react-icons/ti";

export default function SizeDropdown() {
  return (
    <div className="dropdown">
      <button className="btn-all">
        <TiTickOutline className="tick-icon" /> <span>ALL</span>
      </button>
      <div className="dropdown__content">
        {SizeOptions?.map(({ label }, i) => (
          <div className="dropdown__btn" key={i}>
            <p>{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
