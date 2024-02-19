import React, { useState } from "react";
import "./Login.scss";
import { useForm } from "react-hook-form";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    // Validate credentials and handle login
    navigate("/dashboard");
  };

  const clientId =
    "775960901268-sqpvtimc7vdd13u2uafrrst6cpj8cj34.apps.googleusercontent.com";

  const handleSuccess = (credentialResponse: any) => {
    if (credentialResponse.credential) {
      const credentialResponseDecode = jwtDecode(credentialResponse.credential);
      console.log(credentialResponseDecode);
    }
  };

  const handleFailure = (error: any) => {
    console.log("Google login failure:", error);
  };

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
        <button type="submit" className="submit-btn">
          Log in
        </button>
      </form>
      <div className="google-login">
        <GoogleOAuthProvider clientId={clientId}>
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
