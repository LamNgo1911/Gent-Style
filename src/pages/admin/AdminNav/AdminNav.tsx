import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./AdminNav.scss";
import { RootState } from "../../../redux/store";
import { useMediaQueries } from "../../../hooks/useMediaQuery";
import { adminLinks } from "../../../data/navLinks";
import React from "react";
import { useTheme } from "../../../context/useTheme";
import logo from "../../../assets/gentStyle-symbol.png";

export default function AdminNav() {
  const { user } = useSelector((state: RootState) => state.users);
  const { theme } = useTheme();
  const { isSmallScreen } = useMediaQueries();
  const navigate = useNavigate();

  const clickOnLogoHandler = () => {
    if (!isSmallScreen) {
      navigate("/admin");
    }
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
        </ul>
      </nav>
    </div>
  );
}
