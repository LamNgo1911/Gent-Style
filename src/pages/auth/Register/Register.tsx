import { useEffect, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import "./Register.scss";
import { axiosApi } from "../../../config/axiosApi";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");
  const navigate = useNavigate();
  const { ref } = register("username");
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const [isExistingEmail, setIsExistingEmail] = useState(false);

  // check and store current user
  const onSubmit = async (data: FieldValues) => {
    const { username, email, password } = data;
    console.log(email);
    try {
      // check existing email from api
      const emailCheckingRes = await axiosApi.post("users/is-available", {
        email,
      });
      setIsExistingEmail(emailCheckingRes.data.isAvailable);
      console.log(emailCheckingRes.data);
      // store new user in api
      if (!emailCheckingRes.data.isAvailable) {
        await axiosApi.post("users", {
          name: username,
          email,
          password,
          avatar: "https://picsum.photos/800",
        });
      }
    } catch (error: any) {
      console.log(error);
    }

    navigate("/login");
  };

  // focus on username input when users navigate the register page
  useEffect(() => {
    usernameRef.current?.focus();
  }, []);
  console.log(errors);
  return (
    <div className="register-container">
      <h2 className="register__title">Create your account</h2>
      <small className="register__welcome">
        Welcome to GentStyle. Lets create your account
      </small>
      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            {...register("username", { required: true })}
            type="text"
            id="username"
            placeholder="Enter your username"
            ref={(e) => {
              ref(e);
              usernameRef.current = e; // you can still assign to ref
            }}
          />
          {errors.username && (
            <span className="error">
              {errors.username.type === "required" && "Username is required"}
            </span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            {...register("email", { required: true })}
            type="email"
            id="email"
            placeholder="Enter your email"
          />
          {errors.email && (
            <span className="error">
              {errors.email.type === "required" && "Email is required"}
            </span>
          )}
          {isExistingEmail && (
            <span className="error">Email already exists</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            {...register("password", {
              required: true,
              minLength: 4,
              maxLength: 15,
            })}
            type="password"
            id="password"
            placeholder="Enter your password"
          />
          {errors.password?.type === "required" && (
            <span className="error">Password is required</span>
          )}
          {errors.password?.type === "minLength" && (
            <span className="error">
              Password must be longer or equal to 4 characters
            </span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            {...register("confirmPassword", {
              required: true,
              validate: (value) => value === password,
              minLength: 4,
              maxLength: 15,
            })}
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
          />
          {errors.confirmPassword?.type === "validate" && (
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
      <p>
        Already have an account?{" "}
        <Link to="/login" className="form-link">
          Login here
        </Link>
      </p>
    </div>
  );
}
