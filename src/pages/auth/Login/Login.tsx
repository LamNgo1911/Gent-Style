import { useEffect, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/store";

import GoogleClientId from "../../../config/googleOAuth";
import "./Login.scss";
import { axiosApi } from "../../../config/axiosApi";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../redux/slices/userSlice";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { ref } = register("email");
  const emailRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: FieldValues) => {
    // Validate credentials and handle login
    const { email, password } = data;

    try {
      // get access_token
      const tokenData = await axiosApi.post("auth/login", {
        email,
        password,
      });
      console.log(tokenData.data.access_token);
      // get user infor
      const userData = await axiosApi.get("auth/profile", {
        headers: {
          Authorization: `Bearer ${tokenData.data.access_token}`,
        },
      });

      console.log(userData);
      dispatch(setUser(userData.data));
      navigate("/");
    } catch (error: any) {
      if (error.response.status === 400) {
        setErrorMessage("Invalid username or password");
      } else if (error.response.status === 401) {
        setErrorMessage("Invalid credentials");
      } else if (error.response.status === 403) {
        setErrorMessage("Access denied");
      } else if (error.response.status === 404) {
        setErrorMessage("Not found");
      } else if (error.response.status === 500) {
        setErrorMessage("Temporary server issue, please try again later");
      }
    }
  };

  const handleSuccess = (credentialResponse: any) => {
    if (credentialResponse.credential) {
      const credentialResponseDecode = jwtDecode(credentialResponse.credential);
      console.log(credentialResponseDecode);
    }
  };

  const handleFailure = (error: any) => {
    console.log("Google login failure:", error);
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
        {errorMessage && <span className="error">{errorMessage}</span>}
        <button type="submit" className="submit-btn">
          Log in
        </button>
      </form>
      <div className="google-login">
        <GoogleOAuthProvider clientId={GoogleClientId.clientId}>
          <GoogleLogin
            text="signin_with"
            onSuccess={handleSuccess}
            onError={() => handleFailure}
          />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}
