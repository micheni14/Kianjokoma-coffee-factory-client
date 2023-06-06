import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../download-removebg-preview.png";
import { set, useForm } from "react-hook-form";
import { authUser, loginUser } from "../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import coffeeImg from "../images/home.jpeg";
const Login = () => {
  const dispatch = useDispatch();
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
  // set loading state
  const [loading, setLoading] = useState(false);

  // dipatch errors
  const error = useSelector((state) => state?.errors);
  console.log("errors are", error);
  const onSubmit = (data) => {
    setLoading(true);
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (error.typeId === "LOGIN_FAIL") {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [error]);

  // check if user is authenticated & his/her role
  const role = useSelector((state) => state?.auth?.user?.existingUser?.role);
  const auth = useSelector((state) => state?.auth?.isAuthenticated);

  // console.log("auth is", auth);

  useEffect(() => {
    if (auth) {
      switch (role) {
        case "Staff":
          return navigate("/dashboard/staff");
        case "farmer":
          return navigate("/dashboard/farmer");
        case "admin":
          return navigate("/dashboard/admin");
        default:
          return navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [role, auth]);

  return (
    <div
      className="h-full py-10  bg-blend-multiply  "
      style={{
        backgroundImage: `url(${coffeeImg})`,
        backgroundColor: "rgba(0,0,0,0.4)",
      }}
    >
      {" "}
      <div className="flex flex-col h-screen w-full justify-center items-center">
        <div className="space-y-5 bg-white  w-[350px] rounded">
          <div className="bg-orange text-white py-9 rounded-tr rounded-tl">
            <p className="text-2xl text-center">Login to your account</p>
          </div>
          <div className="p-3 ">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col space-y-4"
            >
              <div>
                <label>
                  Enter email address <span className="text-red">*</span>
                </label>
                <input
                  type="text"
                  className="border p-2 mt-2 w-full rounded"
                  placeholder="johndoe@gmail.com"
                  {...register("email", {
                    required: true,
                  })}
                />
                {errors.email && (
                  <p className="text-red"> Email is required </p>
                )}
              </div>
              <div>
                <label>
                  Enter password <span className="text-red">*</span>
                </label>
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
                className="text-blue cursor-pointer"
                onClick={() => navigate("/forgot-password")}
              >
                <p>Forgot password?</p>
              </div>
              <button
                type="submit"
                className="flex justify-center items-center space-x-3 border-0 rounded p-2 w-full bg-orange text-white"
              >
                <div
                  className={
                    loading
                      ? "border-2 border-r-3  border-r-gray-600 animate-spin rounded-full w-6 h-6"
                      : "hidden"
                  }
                ></div>
                <div>LOGIN</div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
