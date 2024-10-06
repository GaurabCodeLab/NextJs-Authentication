"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const Registration = () => {
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { name, email, password } = data;
      const response = await fetch("http://localhost:3000/api/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        router.push("/");
      } else if (response.status === 409) {
        setMessage(result.error);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="w-50 mx-auto mt-4">
      <h1 className="text-center mb-4">Registration Page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter your name"
            maxLength={12}
            {...register("name", {
              required: "Name is required",

              onChange: (e) => {
                setValue("name", e.target.value.replace(/[^a-zA-Z\s]/g, ""));
                setMessage("");
              },
            })}
          />
          {errors.name ? (
            <div style={{ color: "red", marginTop: "0.3rem" }}>
              {errors.name.message}
            </div>
          ) : (
            ""
          )}
          <div style={{ color: "red", marginTop: "0.3rem" }}>{message}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter your email address"
            aria-describedby="emailHelp"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Provide valid email address",
              },
              onChange: () => setMessage(""),
            })}
          />
          {errors.email ? (
            <div style={{ color: "red", marginTop: "0.3rem" }}>
              {errors.email.message}
            </div>
          ) : (
            ""
          )}
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
            <div style={{ color: "red", marginTop: "0.3rem" }}>
              {errors.password.message}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter confirm password"
            maxLength={12}
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) => {
                if (value === watch("password")) {
                  return true;
                } else {
                  return "Password and confirm password does not match";
                }
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
          {errors.confirmPassword ? (
            <div style={{ color: "red", marginTop: "0.3rem" }}>
              {errors.confirmPassword.message}
            </div>
          ) : (
            ""
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
      <Link href="/">
        <div className="mt-2">Alraedy a user click here to Login</div>
      </Link>
    </div>
  );
};

export default Registration;
