import React, { useEffect, useState } from "react";
import { RiHeartFill } from "react-icons/ri";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosSunny, IoIosMoon } from "react-icons/io";
import { IoPerson } from "react-icons/io5";

import "./Header.scss";
import Hamburger from "hamburger-react";
import SearchBar from "../SearchBar/SearchBar";
import image from "../../assets/gentStyle-symbol.png";
import { LuSearch } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/useTheme";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useMediaQueries } from "../../hooks/useMediaQuery";
import { navLinks } from "../../data/navLinks";
import { getAllCartItemsByUserId } from "../../redux/slices/cartSlice";

export default function Header() {
  // state for mobile version
  const [isOpenDropdownMenu, setIsOpenDropdownMenu] = useState<boolean>(false);
  const [isOpenSearchBtn, setIsOpenSearchBtn] = useState<boolean>(true);
  const [scroll, setScroll] = useState<boolean>(true);

  const pathname = useLocation().pathname;
  const dispatch: AppDispatch = useDispatch();
  // media query
  const { isSmallScreen, isBigScreen } = useMediaQueries();
  const { theme, toggleTheme } = useTheme();
  const { user, access_token } = useSelector((state: RootState) => state.users);
  const { items } = useSelector((state: RootState) => state.carts);

  // keep menu-dropdown open when clicking outside of menu-dropdown ul
  const handleDropdownClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  // change color when users scroll down
  useEffect(() => {
    const handleScroll = () => {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 70) {
          setScroll(true);
        } else {
          setScroll(false);
        }
      });
    };
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Todo: Fetch all cartItems count.
  useEffect(() => {
    if (access_token) {
      const fetchCartItems = async () => {
        await dispatch(getAllCartItemsByUserId(access_token));
      };
      fetchCartItems();
    }
  }, [dispatch, access_token]);

  return (
    <header
      className={`header-container ${theme} ${
        !scroll && pathname === "/" && "bg-transparent"
      }`}
    >
      {/* ---logo and name--- */}
      <Link to="/" className="header__logo-container">
        <img className="header__logo" src={image} alt="gentStyle-symbol" />
      </Link>

      {/* nav - laptop version */}
      {isBigScreen && (
        <nav className="header-nav">
          <ul className="header-nav__wrapper">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={pathname === link.path ? "active-link" : ""}
              >
                {link.name}
              </Link>
            ))}
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
            size={20}
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
          <Link to="/cart" className="cart-btn">
            <AiOutlineShoppingCart className="header-btn" />
            <small className="small-number">
              {items?.length > 0 && items?.length}
            </small>
          </Link>
          <Link
            to={`${
              access_token && user
                ? user?.role === "ADMIN"
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
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={pathname === link.path ? "active-link" : ""}
              >
                {link.name}
              </Link>
            ))}
          </ul>
        </nav>
      )}

      {/* ---Profile, wishlist and, shopping cart--- */}
      {!isBigScreen && (
        <div className={`header-down ${theme}`}>
          <Link
            to={`${
              access_token && user
                ? user?.role === "ADMIN"
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
          <Link to="/cart" className="cart-btn">
            <AiOutlineShoppingCart className="header-btn" />

            <small className="small-number">
              {items?.length > 0 && items?.length}
            </small>
          </Link>
          {theme === "light-theme" ? (
            <IoIosMoon className="header-btn" onClick={() => toggleTheme()} />
          ) : (
            <IoIosSunny className="header-btn" onClick={() => toggleTheme()} />
          )}
        </div>
      )}
    </header>
  );
}
