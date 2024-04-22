import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect, useRef } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import GoogleClientId from "../../../config/googleOAuth";
import { useTheme } from "../../../context/useTheme";
import {
  clearError,
  fetchLogin,
  fetchLoginGoogle,
  setError,
} from "../../../redux/slices/userSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import "./Login.scss";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const email = watch("email");
  const password = watch("password");

  const navigate = useNavigate();
  const { ref } = register("email");
  const emailRef = useRef<HTMLInputElement | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const dispatchAction = useDispatch();

  const { error, user, access_token } = useSelector(
    (state: RootState) => state.users
  );
  const { theme } = useTheme();

  const onSubmit = async (data: FieldValues) => {
    // Validate credentials and handle login
    const { email, password } = data;
    const userData = await dispatch(fetchLogin({ email, password }));

    if (userData.type === "user/fetchLogin/fulfilled") {
      navigate("/");
    }
  };

  const googleLoginSuccessHandler = async (credentialResponse: any) => {
    if (credentialResponse.credential) {
      await dispatch(fetchLoginGoogle());
    }
  };

  const handleFailure = (error: any) => {
    setError(error.message);
  };

  // focus on email input when users navigate the register page
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    dispatchAction(clearError());
  }, [email, password]);

  return (
    <div className="login-container">
      <h2 className="login__title">Welcome back</h2>
      <p className="login__subtitle">
        Enter your email and password to access your account
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            {...register("email", { required: true })}
            type="email"
            id="email"
            placeholder="Enter your email"
            ref={(e) => {
              ref(e);
              emailRef.current = e; // you can still assign to ref
            }}
          />
          {errors.email && <span className="error">Email is required</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            {...register("password", { required: true })}
            type="password"
            id="password"
            placeholder="Enter your password"
          />
          {errors.password && (
            <span className="error">Password is required</span>
          )}
        </div>
        <div className="form-check">
          <div className="form-check__input">
            <input
              type="checkbox"
              id="remember-me"
              {...register("rememberMe")}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <small className="forgot-password">Forgot password?</small>
        </div>
        {error && <span className="error">{error}</span>}
        <button type="submit" className={`submit-btn ${theme}`}>
          Log in
        </button>
      </form>
      <div className="google-login">
        <GoogleOAuthProvider clientId={GoogleClientId.clientId}>
          <GoogleLogin
            text="signin_with"
            onSuccess={googleLoginSuccessHandler}
            onError={() => handleFailure}
          />
        </GoogleOAuthProvider>
      </div>
      <p>
        Doesn't have an account yet?{" "}
        <Link to="/register" className="form-link">
          Create an account
        </Link>
      </p>
    </div>
  );
}
