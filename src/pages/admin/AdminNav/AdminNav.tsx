import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RiLogoutBoxRLine } from "react-icons/ri";

import "./AdminNav.scss";
import { RootState } from "../../../redux/store";
import { useMediaQueries } from "../../../hooks/useMediaQuery";
import { adminLinks } from "../../../data/navLinks";
import React from "react";
import { useTheme } from "../../../context/useTheme";
import logo from "../../../assets/gentStyle-symbol.png";
import { clearAccessToken } from "../../../redux/slices/userSlice";

export default function AdminNav() {
  const { user } = useSelector((state: RootState) => state.users);
  const { theme } = useTheme();
  const { isSmallScreen } = useMediaQueries();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clickOnLogoHandler = () => {
    if (!isSmallScreen) {
      navigate("/admin");
    }
  };

  const logoutHandler = async () => {
    dispatch(clearAccessToken());
    navigate("/login");
  };

  return (
    <div className={`adminNav ${theme}`}>
      {/* logo */}
      <div className="adminNav-header__logo" onClick={clickOnLogoHandler}>
        <img src={logo} alt="logo" className="img-logo" />
      </div>

      {/* content */}
      <nav className="adminNav-list">
        <ul className="adminNav-list__container">
          {adminLinks.map((link, index) => (
            <Link to={link.path} className="list-link" key={index}>
              {React.createElement(link.icon)}
              {link.name}
            </Link>
          ))}
          <span onClick={logoutHandler} className="list-link btn">
            <RiLogoutBoxRLine className="list-icon" /> Sign out
          </span>
        </ul>
      </nav>
    </div>
  );
}
