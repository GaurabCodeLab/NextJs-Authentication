"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [pswMessage, setPswMessage] = useState("");
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:1634/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("token", result.token);
        alert("Login successfully");
        router.push("/protected");
      } else if (response.status === 404) {
        setMessage(result.error);
      } else if (response.status === 401) {
        setPswMessage(result.error);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      alert(error);
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
              onChange: () => setMessage(""),
            })}
          />
          <div style={{ color: "red", marginTop: "0.5rem" }}>{message}</div>
          {errors.email ? (
            <div style={{ color: "red", marginTop: "0.5rem" }}>
              {errors.email.message}
            </div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
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
              onChange: () => setMessage(""),
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
          {errors.password ? (
            <div style={{ color: "red", marginTop: "0.5rem" }}>
              {errors.password.message}
            </div>
          ) : null}
          <div style={{ color: "red", marginTop: "0.5rem" }}>{pswMessage}</div>
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <Link href="/registration">
        <div className="mt-2">Not a user click here to Registration</div>
      </Link>
    </div>
  );
};

export default Login;
