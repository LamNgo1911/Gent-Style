import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useMediaQueries } from "../../../hooks/useMediaQuery";
import SearchBar from "../../../components/SearchBar";
import "./AdminHeader.scss";

export default function AdminHeader() {
  const { user } = useSelector((state: RootState) => state.users);
  const [isOpenSearchBtn, setIsOpenSearchBtn] = useState<boolean>(true);

  // media query
  const { isSmallScreen, isBigScreen } = useMediaQueries();

  return (
    <header className="header-container">
      <div className="header-greeting">
        <h1>Hello {user?.username}</h1>
        <p>Let's check your stats today</p>
      </div>

      {/* search bar */}
      {(!isSmallScreen || (isSmallScreen && !isOpenSearchBtn)) && (
        <SearchBar
          setIsOpenSearchBtn={setIsOpenSearchBtn}
          isSmallScreen={isSmallScreen}
        />
      )}

      <div className="header-avatar">
        <img src="###" alt="avatar" className="img-avatar" />
      </div>
    </header>
  );
}
