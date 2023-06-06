import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const navigate = useNavigate();
  // getting input values using react hook form
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    shouldUnregister: true,
    shouldFocusError: true,
  });
  const onSubmit = async (data) => {
    setLoading(true);
    const { email, password } = data;

    try {
      // set headers
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({
        email,
        password,
      });
      if (email) {
        const response = await axios.post(
          "http://localhost:4000/user/forgot-password",
          body,
          config
        );
        const data = await response.data;
        if (data) {
          setLoading(false);
          navigate("/login");
          toast.success(data?.message);
        }
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
      // console.log(error);
    }
  };
  // set loading state
  const [loading, setLoading] = useState(false);
  return (
    <section className="bg-black  h-screen flex flex-col justify-center items-center">
      <div className="space-y-5 bg-white  w-[350px] rounded">
        <div className="bg-blue text-white py-9 rounded-tr rounded-tl">
          <p className="text-2xl text-center">Reset password</p>
        </div>
        <div className="p-3 ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <div>
              <label>Enter email address</label>
              <input
                type="text"
                className="border p-2 mt-2 w-full rounded"
                placeholder="johndoe@gmail.com"
                {...register("email", {
                  required: true,
                })}
              />
              {errors.email && <p className="text-red"> Email is required </p>}
            </div>
            <div>
              <label>Enter new password</label>
              <input
                type="password"
                className="border p-2 mt-2 w-full rounded"
                placeholder="123456..."
                {...register("password", {
                  required: true,
                })}
              />
              {errors.password && (
                <p className="text-red"> Password is required </p>
              )}
            </div>
            <div
              className="text-orange cursor-pointer"
              onClick={() => navigate("/login")}
            >
              <p>Back to login</p>
            </div>
            <button
              type="submit"
              className="flex justify-center items-center space-x-3 border-0 rounded p-2 w-full bg-blue text-white"
            >
              <div
                className={
                  loading
                    ? "border-2 border-r-3  border-r-gray-600 animate-spin rounded-full w-6 h-6"
                    : "hidden"
                }
              ></div>
              <div>RESET</div>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
