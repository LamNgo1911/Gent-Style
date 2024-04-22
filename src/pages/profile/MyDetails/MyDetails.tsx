import "./MyDetails.scss";
import { BsPersonFill } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { useMediaQueries } from "../../../hooks/useMediaQuery";

export default function MyDetails() {
  const { user } = useSelector((state: RootState) => state.users);
  const { isSmallScreen, isBigScreen } = useMediaQueries();
  const navigate = useNavigate();

  return (
    <main className="my-details">
      {/* detail header */}
      <section className="my-details__header">
        <div
          aria-label="Return to profile"
          className={`my-details__btn ${!isSmallScreen && "hidden"}`}
          onClick={() => navigate("/profile")}
        >
          <IoIosArrowBack className="my-details__icon" />
          <BsPersonFill className="my-details__icon" />
        </div>
        <h1 className="my-details__title">My Details</h1>
        <div />
      </section>

      {/* details info */}
      <section className="my-details__info">
        <div className="my-details__info-container">
          <h2>Name</h2>
          <div className="credential">
            <p>{user?.username}</p>
          </div>
        </div>

        <div className="my-details__info-container">
          <h2>Email</h2>
          <div className="credential">
            <p>{user?.email}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
