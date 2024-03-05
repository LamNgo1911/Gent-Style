import "./Profile.scss";
import { FaShoppingCart } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import { FiCreditCard } from "react-icons/fi";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export default function Profile() {
  const { user } = useSelector((state: RootState) => state.users);
  const newName = user?.name?.split(" ");
  const firstNameLetter = newName?.[0]?.[0];
  const firstSurNameLetter = newName?.[1]?.[0];

  return (
    <main className="profile">
      {/* avatar */}
      <section className="profile-header">
        <div className="profile-header__container">
          {(firstNameLetter && firstSurNameLetter) || firstNameLetter ? (
            <h1 className="profile-header__avatar text">
              {firstNameLetter + firstSurNameLetter}
            </h1>
          ) : (
            <div className="profile-header__avatar">
              <BsPersonFill className="profile-header__icon" />
            </div>
          )}
          {/* <div className="profile-header__avatar">
            <BsPersonFill className="profile-header__icon" />
          </div> */}
          <div className="profile-header__greetings">
            <p>Hello,</p>
            <h2>{user?.name}</h2>
          </div>
        </div>
      </section>

      {/* content */}
      <section className="profile-list">
        <ul className="profile-list__container">
          <li>
            <FaShoppingCart className="list-icon" /> My orders
          </li>
          <li>
            <BsPersonFill className="list-icon" /> My details
          </li>
          <li>
            <FiCreditCard className="list-icon" /> Payment methods
          </li>
          <li>
            <RiLogoutBoxRLine className="list-icon" /> Sign out
          </li>
        </ul>
      </section>
    </main>
  );
}
