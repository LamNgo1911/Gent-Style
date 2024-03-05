import "./NotFound.scss";
import notFoundImg from "../../assets/404-error.jpg";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="not-found-error">
      <img src={notFoundImg} alt="notFound" className="not-found-error__img" />

      <div className="not-found-error__content">
        <h1>404</h1>
        <h2>It seems you got a little bit lost</h2>
        <button onClick={() => navigate("/")}>Go back to homepage</button>
      </div>
    </div>
  );
}
