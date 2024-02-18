import React from "react";
import { useForm } from "react-hook-form";
import "./Register.scss";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const password = watch("password");

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="register-container">
      <h2 className="register__title">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
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
          <input
            type="checkbox"
            id="terms"
            {...register("terms", { required: true })}
          />
          <label htmlFor="terms">I agree to the terms and conditions</label>
          {errors.terms && (
            <span className="error">Please accept the terms</span>
          )}
        </div>
        <button type="submit" className="submit-btn">
          Register
        </button>
      </form>

      <div className="register__small-text">
        <span>-------------</span>
        <small>& Register with</small>
        <span>-------------</span>
      </div>
      {/*fb and google register */}
    </div>
  );
}
