import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import GoogleClientId from "../../../config/googleOAuth";
import { useTheme } from "../../../context/useTheme";
import { dataCredential } from "../../../misc/dataCredential";
import {
  checkAvailableEmail,
  fetchAccessToken,
  fetchLogin,
  fetchRegister,
  setError,
} from "../../../redux/slices/userSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import "./Login.scss";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { ref } = register("email");
  const emailRef = useRef<HTMLInputElement | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const { error, user, isAvailableEmail, access_token } = useSelector(
    (state: RootState) => state.users
  );
  const { theme } = useTheme();

  const onSubmit = async (data: FieldValues) => {
    // Validate credentials and handle login
    const { email, password } = data;
    await dispatch(fetchAccessToken({ email, password }));
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (access_token) {
        await dispatch(fetchLogin(access_token));
      }
    };
    fetchUserInfo();
  }, [access_token, dispatch]);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const googleLoginSuccessHandler = async (credentialResponse: any) => {
    if (credentialResponse.credential) {
      const credentialResponseDecode: dataCredential = jwtDecode(
        credentialResponse.credential
      );
      const { name, email, picture } = credentialResponseDecode;

      //  create a new user with google oauth 2.0
      try {
        // check existing email from api
        await dispatch(checkAvailableEmail(email));

        // checking email if already exist, we can let user login intead creating a new user
        if (!isAvailableEmail) {
          await dispatch(
            fetchRegister({
              name,
              email,
              password: "1234",
              avatar: picture,
            })
          );
        }

        await dispatch(fetchAccessToken({ email, password: "1234" }));
      } catch (error) {}
    }
  };

  const handleFailure = (error: any) => {
    setError(error.message);
  };

  // focus on email input when users navigate the register page
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

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
