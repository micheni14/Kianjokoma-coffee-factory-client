import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../download-removebg-preview.png";
import coffeeImg from "../images/home.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { authUser, registerUser } from "../redux/actions/auth";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useEffect(() => {
  //   dispatch(authUser());
  // }, []);
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
  const auth = useSelector((state) => state?.auth);
  // console.log("current user is", auth);

  const onSubmit = (data) => {
    console.log(data);
    dispatch(registerUser(data));
  };
  return (
    <div
      className=" h-full py-10  bg-blend-multiply  "
      style={{
        backgroundImage: `url(${coffeeImg})`,
        backgroundColor: "rgba(0,0,0,0.4)",
      }}
    >
      <div className="flex flex-col h-full justify-center items-center ">
        <div
          className="space-y-5 bg-orange p-3 rounded-tl-lg rounded-tr-lg w-3/6"
          style={{ borderTop: "7px solid #fff" }}
        >
          <div className="flex flex-col items-center">
            <p className="h-20 w-20 ">
              <img src={logo} alt="" />
            </p>
            <p className="text-2xl text-center">Create Account</p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-4   "
          >
            <input
              type="text"
              className="border p-2 w-full"
              placeholder="Firstname"
              {...register("firstname", { required: true })}
            />
            {errors.firstname && (
              <p className="text-red"> Firstame is required </p>
            )}
            <input
              type="text"
              className="border p-2 w-full"
              placeholder="Lastname"
              {...register("lastname", { required: true })}
            />
            {errors.lastname && (
              <p className="text-red"> Lastame is required </p>
            )}
            <select
              className="border p-2 w-full bg-white hidden"
              {...register("role", {
                required: false,
              })}
              defaultValue="farmer"
            >
              <option value="farmer">Farmer</option>
              {/* <option value="Staff">Staff</option> */}
            </select>

            <input
              type="text"
              className="border p-2 w-full"
              placeholder="Email"
              {...register("email", {
                required: true,
              })}
            />
            {errors.email && <p className="text-red"> Email is required </p>}
            <input
              type="password"
              className="border p-2 w-full"
              placeholder="Password"
              {...register("password", {
                required: true,
              })}
            />
            {errors.password && (
              <p className="text-red"> Password is required </p>
            )}
            <input
              type="text"
              className="border p-2 w-full"
              placeholder="Phone number"
              {...register("phone_number", {
                required: true,
              })}
            />
            {errors.phone_number && (
              <p className="text-red"> Phone number is required </p>
            )}

            <input
              type="submit"
              className="border-0 p-2 w-full rounded bg-black text-white"
            />
          </form>
          <p className="text-center">
            Already have an account?
            <Link to="/login">
              <span className="text-blue mx-2">Login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
