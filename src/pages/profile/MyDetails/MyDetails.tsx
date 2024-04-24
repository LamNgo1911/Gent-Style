import { BsPersonFill } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./MyDetails.scss";
import { AppDispatch, RootState } from "../../../redux/store";
import { useMediaQueries } from "../../../hooks/useMediaQuery";
import { updatePassword, updateUser } from "../../../redux/slices/userSlice";
import { User } from "../../../misc/types";

export default function MyDetails() {
  const user = useSelector((state: RootState) => state.users.user) as User;
  const access_token = useSelector(
    (state: RootState) => state.users.access_token
  ) as string;
  const error = useSelector((state: RootState) => state.users.error) as string;

  console.log(error);

  const { isSmallScreen, isBigScreen } = useMediaQueries();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [editModeUserInfo, setEditModeUserInfo] = useState(false);
  const [editModePassword, setEditModePassword] = useState(false);
  const [editedUsername, setEditedUsername] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmitUserInfo = async () => {
    await dispatch(
      updateUser({
        username: editedUsername || user?.username,
        email: editedEmail || user?.email,
        access_token,
        userId: user.id,
      })
    );
    setEditModeUserInfo(false);
  };

  const handleSubmitPassword = async () => {
    await dispatch(
      updatePassword({
        oldPassword,
        newPassword,
        access_token,
        userId: user.id,
      })
    );

    console.log(
      await dispatch(
        updatePassword({
          oldPassword,
          newPassword,
          access_token,
          userId: user.id,
        })
      )
    );
    setEditModePassword(false);
  };

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
          <h2>Username</h2>
          {editModeUserInfo ? (
            <input
              type="text"
              value={editedUsername}
              onChange={(e) => setEditedUsername(e.target.value)}
            />
          ) : (
            <div
              className="credential"
              onClick={() => setEditModeUserInfo(true)}
            >
              <p>{user?.username}</p>
            </div>
          )}
        </div>

        <div className="my-details__info-container">
          <h2>Email</h2>
          {editModeUserInfo ? (
            <input
              type="email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
            />
          ) : (
            <div
              className="credential"
              onClick={() => setEditModeUserInfo(true)}
            >
              <p>{user?.email}</p>
            </div>
          )}
        </div>

        {error && editModeUserInfo && <span className="error">{error}</span>}

        {/* update info */}
        <div>
          {editModeUserInfo ? (
            <div>
              <button onClick={handleSubmitUserInfo}>Save</button>
              <button onClick={() => setEditModeUserInfo(false)}>Cancel</button>
            </div>
          ) : (
            <button onClick={() => setEditModeUserInfo(true)}>
              Update your information
            </button>
          )}
        </div>
      </section>

      {/* update password */}
      <div>
        {editModePassword ? (
          <div>
            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {error && editModePassword && (
              <span className="error">{error}</span>
            )}
            <button onClick={handleSubmitPassword}>Save</button>
            <button onClick={() => setEditModePassword(false)}>Cancel</button>
          </div>
        ) : (
          <button onClick={() => setEditModePassword(true)}>
            Change your password
          </button>
        )}
      </div>
    </main>
  );
}
