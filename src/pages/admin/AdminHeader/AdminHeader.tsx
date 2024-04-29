import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useMediaQueries } from "../../../hooks/useMediaQuery";
import SearchBar from "../../../components/SearchBar";
import "./AdminHeader.scss";
import Hamburger from "hamburger-react";
import { User } from "../../../misc/types";

export default function AdminHeader() {
  const user = useSelector((state: RootState) => state.users.user) as User;
  const [isOpenSearchBtn, setIsOpenSearchBtn] = useState<boolean>(true);

  // media query
  const { isSmallScreen, isBigScreen } = useMediaQueries();

  return (
    <header className="header-container">
      <div className="header-greeting">
        <h1>Hello {user?.username}</h1>
        <p>Let's check your stats today</p>
      </div>
    </header>
  );
}
