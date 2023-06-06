import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/actions/auth";
import { useLocation } from "react-router-dom";
const RegisterForm = ({ setRegisterModal }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  // console.log("location is", location?.pathname);
  //   initialize react hook form
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

  //   set button loading
  const [buttonLoading, setbuttonLoading] = useState(false);
  // getting input values using react hook form
  const onSubmit = (data) => {
    setbuttonLoading(true);
    dispatch(registerUser(data));
  };
  //   console.log("Register error", error);

  //   get error msg from the state
  const error = useSelector((state) => state?.errors);
  // console.log("error is", error);
  useEffect(() => {
    if (error.typeId === "REGISTER_FAIL") {
      setbuttonLoading(false);
      setRegisterModal(false);
    } else {
      setbuttonLoading(false);
      setRegisterModal(false);
    }
  }, [error]);
  // get  success msg from the state
  // const success = useSelector((state) => state?.auth?.msg);
  // console.log("Register success", success);
  // useEffect(() => {
  //   if (success == "Succesfully registered") {
  //     setbuttonLoading(false);
  //     setRegisterModal(false);
  //     // window.location.reload(false);
  //   } else {
  //     setbuttonLoading(false);
  //     setRegisterModal(false);
  //   }
  // }, [success]);
  return (
    <div>
      <div className="flex justify-between my-3 items-center">
        <h2 className="text-center  text-xl text-blue">
          {" "}
          {location?.pathname === "/dashboard/admin/staff"
            ? "Create New Staff"
            : "Create New Farmer"}
        </h2>
        <p
          onClick={() => setRegisterModal(false)}
          className="bg-blue text-white w-9 h-9  flex justify-center items-center rounded-full cursor-pointer"
        >
          X
        </p>
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
          <p className="text-red"> Firstname is required </p>
        )}
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="Lastname"
          {...register("lastname", { required: true })}
        />
        {errors.lastname && <p className="text-red"> Lastname is required </p>}
        <select
          className="border p-2 w-full bg-white hidden"
          {...register("role", {
            required: false,
          })}
          defaultValue="farmer"
        >
          <option
            value={
              location?.pathname === "/dashboard/admin/staff"
                ? "Staff"
                : "farmer"
            }
          >
            Farmer
          </option>
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
        {errors.password && <p className="text-red"> Password is required </p>}
        <select
          className="border p-2 w-full bg-white "
          {...register("gender", {
            required: true,
          })}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && <p className="text-red"> Gender is required </p>}
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
        <div>
          <button
            type="submit"
            className="border-0 p-2 w-full rounded bg-blue text-white"
          >
            {buttonLoading ? (
              <div className="flex justify-center items-center  space-x-2">
                <div className="border-2 border-r-3  border-r-gray-600 animate-spin rounded-full w-6 h-6"></div>
                <span>Please wait..</span>
              </div>
            ) : (
              <div>REGISTER</div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
