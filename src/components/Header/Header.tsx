import React, { useEffect, useRef, useState } from "react";
import { RiHeartFill } from "react-icons/ri";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosSunny, IoIosMoon } from "react-icons/io";
import { IoPerson } from "react-icons/io5";

import "./Header.scss";
import Hamburger from "hamburger-react";
import SearchBar from "../SearchBar/SearchBar";
import image from "../../assets/gentStyle-symbol.png";
import { LuSearch } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/useTheme";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function Header() {
  const [isOpenDropdownMenu, setIsOpenDropdownMenu] = useState(false);
  const [isOpenSearchBtn, setIsOpenSearchBtn] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.users
  );

  const toggleMenu = () => {
    setIsOpenDropdownMenu(!isOpenDropdownMenu);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !isOpenDropdownMenu
      ) {
        setIsOpenDropdownMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenDropdownMenu]);

  const handleDropdownClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    // for mobile
    <header className={`header-container ${theme}`}>
      {/* ---logo and name--- */}
      <div className="header__logo-container">
        <img className="header__logo" src={image} alt="gentStyle-symbol" />
      </div>

      {/* search bar */}
      {!isOpenSearchBtn && (
        <SearchBar setIsOpenSearchBtn={setIsOpenSearchBtn} />
      )}

      {/* hamburger btn */}
      <div className="header__right-side">
        <LuSearch
          className={`header-btn ${!isOpenSearchBtn && "hidden"}`}
          onClick={() => setIsOpenSearchBtn(!isOpenSearchBtn)}
        />
        <Hamburger
          toggled={isOpenDropdownMenu}
          toggle={setIsOpenDropdownMenu}
          size={22}
        />
      </div>

      {/* menu dropdown */}
      <nav
        ref={menuRef}
        className={`menu ${isOpenDropdownMenu ? "open" : ""}`}
        onClick={() => setIsOpenDropdownMenu(false)}
      >
        <ul className={`menu-dropdown ${theme}`} onClick={handleDropdownClick}>
          <Link to={"/"} className="header__logo-container">
            <img className="header__logo" src={image} alt="gentStyle-symbol" />
          </Link>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about-us">About Us</Link>
          <Link to="/contact-us">Contact Us</Link>
        </ul>
      </nav>

      {/* ---Profile, wishlist and, shopping cart--- */}
      <div className={`header-down ${theme}`}>
        <Link
          to={`${
            isAuthenticated
              ? user?.role === "admin"
                ? "/admin"
                : "/profile"
              : "/login"
          }`}
        >
          <IoPerson className="header-btn" />
        </Link>
        <Link to="/wishlist">
          <RiHeartFill className="header-btn" />
        </Link>
        <Link to="/shopping-cart">
          <AiOutlineShoppingCart className="header-btn" />
        </Link>
        <IoIosSunny className="header-btn" />
        {/* <IoIosMoon className="header-btn" /> */}
      </div>
    </header>
  );
}
