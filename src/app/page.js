"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import SocialLogin from "@/components/SocialLogin";
import { doCredentialsLogin } from "./actions";
import Swal from "sweetalert2";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await doCredentialsLogin(data);
      router.push("/home");
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.message.split(".")[0]
          ? error.message.split(".")[0]
          : "Something went wrong",
      });
    }
  };

  return (
    <div className="w-50 mx-auto mt-4">
      <h1 className="text-center mb-4">Login Page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter your email address"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Provide valid email address",
              },
            })}
          />
          {errors.email && (
            <div style={{ color: "red", marginTop: "0.5rem" }}>
              {errors.email.message}
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter your password"
            maxLength={12}
            {...register("password", {
              required: "Password is required",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password contains at least one upper case, lower case, number and special character",
              },
            })}
          />
          <span
            style={{
              position: "relative",
              bottom: "2rem",
              right: "0.6rem",
              cursor: "pointer",
              fontSize: "1.2rem",
              float: "right",
            }}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
          </span>
          {errors.password && (
            <div style={{ color: "red", marginTop: "0.5rem" }}>
              {errors.password.message}
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <SocialLogin />
      <div className="d-flex mt-2">
        <div className="me-2">Don't you have an account?</div>
        <Link href="/registration">Register</Link>
      </div>
    </div>
  );
};

export default Login;
