import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "./Register.scss";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    navigate("/login");
  };
  console.log(errors.email);

  const clientId =
    "775960901268-sqpvtimc7vdd13u2uafrrst6cpj8cj34.apps.googleusercontent.com";

  const [googleLoginSuccess, setGoogleLoginSuccess] = useState(false);
  const [googleLoginError, setGoogleLoginError] = useState(false);

  const handleSuccess = (credentialResponse: any) => {
    if (credentialResponse.credential) {
      const credentialResponseDecode = jwtDecode(credentialResponse.credential);
      
      console.log(credentialResponseDecode);
    }
    setGoogleLoginSuccess(true);
    setGoogleLoginError(false);
 
  };

  const handleFailure = (error: any) => {
    console.log("Login failure:", error);
    setGoogleLoginSuccess(false);
    setGoogleLoginError(true);
   
  };

  const emailInputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   emailInputRef.current?.focus();
  // }, []);

  console.log("Email value:", watch("email"));
  console.log("password value:", watch("password"));

  return (
    <div className="register-container">
      <h2 className="register__title">Create your account</h2>
      <small className="register__welcome">
        Welcome to GentStyle. Lets create your account
      </small>
      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            {...register("email", { required: true })}
            type="email"
            id="email"
            placeholder="Enter your email"
            // ref={emailInputRef}
          />
          {errors.email && (
            <span className="error">
              {errors.email.type === "required" ? "Email is required" : ""}
            </span>
          )}
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            {...register("confirmPassword", {
              required: true,
              validate: (value) => value === password,
            })}
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <span className="error">Passwords do not match</span>
          )}
        </div>
        <div className="form-terms">
          <div className="form-terms__input">
            <input
              type="checkbox"
              id="terms"
              {...register("terms", { required: true })}
            />
            <label htmlFor="terms">I agree to the terms and conditions</label>
          </div>
          {errors.terms && (
            <span className="error">Please accept the terms</span>
          )}
        </div>
        <button type="submit" className="submit-btn">
          Create account
        </button>
      </form>
      <div className="register__small-text">
        <span className="register__small-decor"></span>
        <small>& Create account with</small>
        <span className="register__small-decor"></span>
      </div>
      {/* Google register */}
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          text="signup_with"
          onSuccess={() => handleSuccess}
          onError={() => handleFailure}
        />
      </GoogleOAuthProvider>
    </div>
  );
}
