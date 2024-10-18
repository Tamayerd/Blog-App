import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRegisterMutation } from "./authApi";

interface FormData {
  email: string;
  password: string;
  name: string;
  lastname: string;
  username: string;
}

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  name: yup.string().required("Name is required"),
  lastname: yup.string().required("Lastname is required"),
  username: yup
    .string()
    .required("Username is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
      "Username must contain both letters and numbers"
    ),
});

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const [registerUser, { isLoading, isError, error }] = useRegisterMutation();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await registerUser(data).unwrap();
      console.log("User registered successfully");
    } catch (err) {
      console.error("Registration failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center font-medium text-xl">REGISTER</div>
        <div className="text-3 font-bold text-gray-900 mt-2 text-center">
          Let's sign up
        </div>
      </div>
      <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-bold text-gray-600 block"
            >
              Email
            </label>
            <input
              {...register("email")}
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.email && (
              <span className="text-red-600">{errors.email.message}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-bold text-gray-600 block"
            >
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.password && (
              <span className="text-red-600">{errors.password.message}</span>
            )}
          </div>

          <div>
            <label
              htmlFor="name"
              className="text-sm font-bold text-gray-600 block"
            >
              Name
            </label>
            <input
              {...register("name")}
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.name && (
              <span className="text-red-600">{errors.name.message}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="text-sm font-bold text-gray-600 block"
            >
              Lastname
            </label>
            <input
              {...register("lastname")}
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.lastname && (
              <span className="text-red-600">{errors.lastname.message}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="username"
              className="text-sm font-bold text-gray-600 block"
            >
              Username
            </label>
            <input
              {...register("username")}
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.username && (
              <span className="text-red-600">{errors.username.message}</span>
            )}
          </div>
          <div>
            <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-sm text-white text-sm">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
