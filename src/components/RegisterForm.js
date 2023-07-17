import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const RegisterFormStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  label {
    font-size: 1.5rem;
    color: #bcb4b4;
  }
  p {
    margin: 0 auto;
    color: red;
  }
  input,
  textarea {
    width: 100%;
    font-size: 1rem;
    padding: 0.5rem;
    background-color: #1e1e1e;
    color: #bcb4b4;
    border: none;
    outline: none;
    border-radius: 8px;
    margin-top: 0.5rem;
  }
  button[type="submit"] {
    font-size: 2rem;
    color: #000000;
    background-color: #bcb4b4;
    display: inline-block;
    padding: 0.5rem 3rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 1rem;
    align-items: center;
  }
  .para-button-text {
    text-align: center !important ;
    margin-top: 1rem;
    font-size: 1.5rem;
  }
`;

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users",
        data
      );
      console.log("response:", response.data);
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then((res) => {
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <RegisterFormStyles>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Invalid phone number",
              },
            })}
          />
          {errors.phone && <p>{errors.phone.message}</p>}
        </div>

        <button type="submit">Register</button>
        {isSuccess && (
          <p className="para-button-text">Registration successful!.</p>
        )}
      </form>
    </RegisterFormStyles>
  );
};

export default RegisterForm;
