import { useState } from "react";
import instance from "../utils/axios";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate=useNavigate()
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const res = await instance.post("/user/signup", formData);
      if (res.data.success) {
        console.log(res.data.user);
        localStorage.setItem('messenger',JSON.stringify(res.data))
        toast.success(res.data.message);
        reset(); // reset form using react-hook-form
        navigate('/login')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 dark:bg-neutral flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-base-200 dark:bg-base-300 rounded-2xl shadow-md p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          🐾 Cat App Signup
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered w-full"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
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

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered w-full"
              {...register("confirmpassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            {errors.confirmpassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmpassword.message}
              </p>
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
                Signing up...
              </>
            ) : (
              "Signup"
            )}
          </button>
        </form>
        <p className=" text-sm font-light text-gray-400 mt-2">you have already account
        <Link to={'/login'} className="text-blue-600"> Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
