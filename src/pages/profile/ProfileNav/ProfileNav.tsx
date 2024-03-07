import { FaShoppingCart } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import { FiCreditCard } from "react-icons/fi";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

import "./ProfileNav.scss";
import { RootState } from "../../../redux/store";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQueries } from "../../../hooks/useMediaQuery";
import { clearAccessToken } from "../../../redux/slices/userSlice";

export default function ProfileNav() {
  const { user } = useSelector((state: RootState) => state.users);
  const { isSmallScreen } = useMediaQueries();
  const navigate = useNavigate();
  const newName = user?.name?.[0].toLocaleUpperCase();

  const dispatch = useDispatch();

  const clickOnAvatarHandler = () => {
    if (!isSmallScreen) {
      navigate("/profile");
    }
  };

  const logoutHandler = async () => {
    dispatch(clearAccessToken());
    navigate("/login");
  };

  return (
    <section className="profileNav">
      {/* avatar */}
      <div className="profileNav-header">
        <div className="profileNav-header__container">
          {newName ? (
            <div
              className="profileNav-header__avatar img-avatar"
              onClick={clickOnAvatarHandler}
            >
              <img src={user?.avatar} alt="avatar" />
            </div>
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
          <button onClick={logoutHandler} className="list-link btn">
            <RiLogoutBoxRLine className="list-icon" /> Sign out
          </button>
        </ul>
      </nav>
    </section>
  );
}
