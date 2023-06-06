import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/actions/auth";
import { useLocation } from "react-router-dom";
const Profile = ({ currentUser, setprofileModal }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location?.pathname;
  console.log(path);
  const [userValues, setUserValues] = useState({
    firstname: "",
    lastname: "",
    phone_number: "",
    gender: "",
  });
  //   append current admin data as default values
  useEffect(() => {
    setUserValues({
      firstname: currentUser?.firstname,
      lastname: currentUser?.lastname,
      phone_number: currentUser?.phone_number,
      gender: currentUser?.gender,
    });
  }, [currentUser]);
  // capture input values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserValues({ ...userValues, [name]: value });
  };
  //   handle submit
  const [buttonLoading, setbuttonLoading] = useState(false);
  const handleSubmit = (e) => {
    setbuttonLoading(true);
    e.preventDefault();
    // console.log("userValues are", userValues);

    dispatch(updateUser(currentUser?._id, userValues));
  };
  const successMsg = useSelector((state) => state?.auth?.msg);
  //   console.log("success message is", successMsg);
  useEffect(() => {
    if (successMsg == "User successfully updated") {
      setbuttonLoading(false);
    }
  }, [successMsg]);
  return (
    <section>
      <div
        className={
          path == "/dashboard/farmer"
            ? "bg-white w-[700px]  px-3 py-6 rounded-lg"
            : "bg-white px-3 py-6 rounded-lg"
        }
      >
        <h2 className="text-xl text-orange my-2">Account Details</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col">
              <label>Firstname</label>
              <input
                type="text"
                className="border focus:outline-orange p-2 rounded border-gray-200 "
                defaultValue={userValues?.firstname}
                name="firstname"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label>Lastname</label>
              <input
                type="text"
                defaultValue={userValues?.lastname}
                name="lastname"
                className="border focus:outline-orange p-2 rounded border-gray-200 "
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col">
              <label>Email</label>
              <input
                disabled
                type="email"
                defaultValue={currentUser?.email}
                className="  border p-2 rounded border-gray-200 cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col">
              <label>User ID</label>
              <input
                disabled
                type="text"
                defaultValue={currentUser?.farmerId}
                className="border p-2 rounded border-gray-200 cursor-not-allowed"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col">
              <label>Phone Number</label>
              <input
                type="numbers"
                defaultValue={userValues?.phone_number}
                name="phone_number"
                className="border focus:outline-orange p-2 rounded border-gray-200 "
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label>Gender</label>
              <input
                type="text"
                defaultValue={userValues?.gender}
                name="gender"
                className="border focus:outline-orange p-2 rounded border-gray-200 "
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <div className="space-x-3 flex">
              {path == "/dashboard/farmer" && (
                <span
                  onClick={() => setprofileModal(false)}
                  className="bg-gray-200 hover:bg-gray-300 cursor-pointer text-black px-8 py-2 rounded-lg"
                >
                  Close
                </span>
              )}

              <button
                type="submit"
                className="bg-orange text-white px-8 py-2 rounded-lg"
              >
                {buttonLoading ? (
                  <div className="flex justify-center items-center space-x-2">
                    <div className="border-2 border-r-3  border-r-gray-600 animate-spin rounded-full w-5 h-5"></div>
                    <span>Processing..</span>
                  </div>
                ) : (
                  <div>EDIT</div>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;
