/* import React, { useState } from "react";
import { useForm } from "react-hook-form";


interface IFormData {
  errors: {
    email: {
      message: string;
    };
  };
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  password1: string;
  extraError?: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormData>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: IFormData) => {
    if (data.password !== data.password1) {
      setError(
        "password1",
        { message: "Password are not the same" },
        { shouldFocus: true }
      );
    }
    // setError("extraError", { message: "Server offline" });
  };
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "Email required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed",
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("firstName", {
            required: "firstName required",
            validate: {
              noDojo: (value) =>
                value.includes("dojo") ? "no Dojo allowed" : true,
              noSs: (value) => (value.includes("ss") ? "no ss allowed" : true),
            },
          })}
          placeholder="First Name"
        />
        <span>{errors?.firstName?.message}</span>

        <input
          {...register("lastName", { required: "lastName required" })}
          placeholder="Last Name"
        />
        <span>{errors?.lastName?.message}</span>

        <input
          {...register("username", {
            required: "username required",
            minLength: 5,
          })}
          placeholder="Username"
        />
        <span>{errors?.username?.message}</span>

        <input
          {...register("password", {
            required: "password required",
            minLength: {
              value: 5,
              message: "Password is too short",
            },
          })}
          placeholder="Password"
        />
        <span>{errors?.password?.message}</span>

        <input
          {...register("password1", {
            required: "Password is Required",
            minLength: 5,
          })}
          placeholder="Password1"
        />
        <span>{errors?.password1?.message}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}

export default ToDoList;
 */

export default null;
