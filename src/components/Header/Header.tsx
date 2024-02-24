import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
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
  // state for mobile version
  const [isOpenDropdownMenu, setIsOpenDropdownMenu] = useState(false);
  const [isOpenSearchBtn, setIsOpenSearchBtn] = useState(true);

  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.users
  );

  // screen responsive
  const isSmallScreen = useMediaQuery({ maxWidth: 576 });
  const isMediumScreen = useMediaQuery({ minWidth: 577, maxWidth: 992 });
  const isBigScreen = useMediaQuery({ minWidth: 993 });

  // keep menu-dropdown open when clicking outside of menu-dropdown ul
  const handleDropdownClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <header className={`header-container ${theme}`}>
      {/* ---logo and name--- */}
      <div className="header__logo-container">
        <img className="header__logo" src={image} alt="gentStyle-symbol" />
      </div>

      {/* nav - laptop version */}
      {isBigScreen && (
        <nav className="header-nav">
          <ul className="header-nav__wrapper">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/sale">Sale</Link>
            <Link to="/contact-us">ContactUs</Link>
          </ul>
        </nav>
      )}

      {/* search bar */}
      {(!isSmallScreen || (isSmallScreen && !isOpenSearchBtn)) && (
        <SearchBar
          setIsOpenSearchBtn={setIsOpenSearchBtn}
          isSmallScreen={isSmallScreen}
        />
      )}

      {/* hamburger btn */}
      <div className="header__right-side">
        {isSmallScreen && (
          <LuSearch
            className={`header-btn ${!isOpenSearchBtn && "hidden"}`}
            onClick={() => setIsOpenSearchBtn(!isOpenSearchBtn)}
          />
        )}
        {!isBigScreen && (
          <Hamburger
            toggled={isOpenDropdownMenu}
            toggle={setIsOpenDropdownMenu}
            size={22}
          />
        )}
      </div>

      {/* -------------- right-nav - laptop version --------------*/}
      {isBigScreen && (
        <div className="header__right-nav">
          {theme === "light-theme" ? (
            <IoIosMoon className="header-btn" onClick={() => toggleTheme()} />
          ) : (
            <IoIosSunny className="header-btn" onClick={() => toggleTheme()} />
          )}
          <Link to="/wishlist">
            <RiHeartFill className="header-btn" />
          </Link>
          <Link to="/shopping-cart">
            <AiOutlineShoppingCart className="header-btn" />
          </Link>
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
        </div>
      )}

      {/* -------------- Mobile/tablet version --------------*/}
      {/* menu dropdown */}
      {!isBigScreen && (
        <nav
          className={`menu ${isOpenDropdownMenu ? "open" : ""}`}
          onClick={() => setIsOpenDropdownMenu(false)}
        >
          <ul
            className={`menu-dropdown ${theme}`}
            onClick={handleDropdownClick}
          >
            <Link to={"/"} className="header__logo-container">
              <img
                className="header__logo"
                src={image}
                alt="gentStyle-symbol"
              />
            </Link>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/about-us">About Us</Link>
            <Link to="/contact-us">Contact Us</Link>
          </ul>
        </nav>
      )}

      {/* ---Profile, wishlist and, shopping cart--- */}
      {!isBigScreen && (
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
          {theme === "light-theme" ? (
            <IoIosMoon className="header-btn" onClick={() => toggleTheme()} />
          ) : (
            <IoIosSunny className="header-btn" onClick={() => toggleTheme()} />
          )}
          {/* -------------- laptop version --------------*/}
        </div>
      )}
    </header>
  );
}
