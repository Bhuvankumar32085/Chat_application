import { useState } from "react";
import instance from "../utils/axios";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setIsLoggedIn, SetLoginUser } from "../features/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const res = await instance.post("/user/login", formData);
      if (res.data.success) {
        dispatch(setIsLoggedIn(true));
        dispatch(SetLoginUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
        reset();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 dark:bg-neutral flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-base-200 dark:bg-base-300 rounded-2xl shadow-md p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          🐾 Cat App Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Login...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p className=" text-sm font-light text-gray-400 mt-2">Create Account 
        <Link to={'/signup'} className="text-blue-600"> Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
