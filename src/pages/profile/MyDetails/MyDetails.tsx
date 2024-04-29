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

  const { isSmallScreen } = useMediaQueries();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [editModeUserInfo, setEditModeUserInfo] = useState(false);
  const [editModePassword, setEditModePassword] = useState(false);
  const [editedUsername, setEditedUsername] = useState(user?.username || "");
  const [editedEmail, setEditedEmail] = useState(user?.email || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmitUserInfo = async () => {
    const data = await dispatch(
      updateUser({
        username: editedUsername || user?.username,
        email: editedEmail || user?.email,
        access_token,
        userId: user.id,
      })
    );
    if (data.type === "user/updateUser/fulfilled") {
      setEditModeUserInfo(false);
    }
  };

  const handleSubmitPassword = async () => {
    const data = await dispatch(
      updatePassword({
        oldPassword,
        newPassword,
        access_token,
        userId: user.id,
      })
    );
    if (data.type === "user/updatePassword/fulfilled") {
      alert("Password updated successufully!");
      setEditModePassword(false);
    }
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
              className="credential"
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
              className="credential"
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
            <div className="save-cancel-btns">
              <button className="btn" onClick={handleSubmitUserInfo}>
                Save
              </button>
              <button
                className="btn"
                onClick={() => setEditModeUserInfo(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button className="btn" onClick={() => setEditModeUserInfo(true)}>
              Update your information
            </button>
          )}
        </div>
      </section>

      {/* update password */}
      <div>
        {editModePassword ? (
          <div className="password-update">
            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="credential"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="credential"
            />
            {error && editModePassword && (
              <span className="error">{error}</span>
            )}
            <div className="save-cancel-btns">
              <button className="btn" onClick={handleSubmitPassword}>
                Save
              </button>
              <button
                className="btn"
                onClick={() => setEditModePassword(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button className="btn" onClick={() => setEditModePassword(true)}>
            Change your password
          </button>
        )}
      </div>
    </main>
  );
}
