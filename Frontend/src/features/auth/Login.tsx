import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom"; 
import { useLoginMutation } from "./authApi";

interface FormData {
  email: string;
  password: string;
  remember?: boolean;
}

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const [loginUser] = useLoginMutation();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await loginUser(data).unwrap();
      const token = response.result.token;

      localStorage.setItem("token", token);
      localStorage.setItem("is_admin", response.is_admin.toString()); 
      
      if (response.is_admin) {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center font-medium text-xl">LOGIN</div>
        <div className="text-3 font-bold text-gray-900 mt-2 text-center">
          Welcome back!
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
          <div className="flex item-center justify-between">
            <div className="flex item-center">
              <input
                {...register("remember")}
                type="checkbox"
                className="h-4 w-4 text-blue-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 text-sm text-gray-600"
              >
                Remember Me
              </label>
            </div>
            <div>
              <a href="#" className="font-medium text-sm text-blue-500">
                Forgot Password?
              </a>
            </div>
          </div>
          <div>
            <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-sm text-white text-sm">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
