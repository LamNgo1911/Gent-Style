import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import "./Header.scss";

export default function Header() {
  return (
    // for mobile
    <header>
      {/* ---logo and name--- */}
      <div>
        <span>GentStyle</span>
        <img src="" alt="" />
      </div>
      {/* search bar */}
      <SearchBar />
      {/* hambuger btn */}
      <button>hambuger btn</button>
      {/* menu modal */}
      <div>menu modal</div>

      {/* ---Profile, wishlist and, shopping cart--- */}
      <div>
        <button>profile</button>
        <button>wishlist</button>
        <button>cart</button>
      </div>
    </header>
  );
}
