import { FaShoppingCart } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import { FiCreditCard } from "react-icons/fi";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useSelector } from "react-redux";

import "./ProfileNav.scss";
import { RootState } from "../../../redux/store";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQueries } from "../../../hooks/useMediaQuery";

export default function ProfileNav() {
  const { user } = useSelector((state: RootState) => state.users);
  const { isSmallScreen } = useMediaQueries();
  const navigate = useNavigate();
  const newName = user?.name?.split(" ");
  const firstNameLetter = newName?.[0]?.[0];
  const firstSurNameLetter = newName?.[1]?.[0];

  const clickOnAvatarHandler = () => {
    if (!isSmallScreen) {
      navigate("/profile");
    }
  };

  return (
    <section className="profileNav">
      {/* avatar */}
      <div className="profileNav-header">
        <div className="profileNav-header__container">
          {(firstNameLetter && firstSurNameLetter) || firstNameLetter ? (
            <h1
              className="profileNav-header__avatar text"
              onClick={clickOnAvatarHandler}
            >
              {firstNameLetter + firstSurNameLetter}
            </h1>
          ) : (
            <div
              className="profileNav-header__avatar"
              onClick={clickOnAvatarHandler}
            >
              <BsPersonFill className="profileNav-header__icon" />
            </div>
          )}
          <div className="profileNav-header__greetings">
            <p>Hello,</p>
            <h2>{user?.name}</h2>
          </div>
        </div>
      </div>

      {/* content */}
      <nav className="profileNav-list">
        <ul className="profileNav-list__container">
          <Link to="/profile/my-orders" className="list-link">
            <FaShoppingCart className="list-icon" /> My orders
          </Link>
          <Link to="/profile/my-details" className="list-link">
            <BsPersonFill className="list-icon" /> My details
          </Link>
          <Link to="/profile/my-orders" className="list-link">
            <FiCreditCard className="list-icon" /> Payment methods
          </Link>
          <Link to="/profile/my-orders" className="list-link">
            <RiLogoutBoxRLine className="list-icon" /> Sign out
          </Link>
        </ul>
      </nav>
    </section>
  );
}
