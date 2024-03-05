import erroImg from "../../assets/error-image.png";
import "./LoadingError.scss";

export default function LoadingError() {
  return (
    <div className="error">
      <img src={erroImg} alt="error" />
      <div className="error-content">
        <h1>Error</h1>
        <p>Oops! Something went wrong. Please try again later.</p>
      </div>
    </div>
  );
}
