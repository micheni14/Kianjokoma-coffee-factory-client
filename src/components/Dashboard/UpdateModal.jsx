import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/actions/auth";

const UpdateModal = ({ userDetails, setUpdateModal }) => {
  const dispatch = useDispatch();
  // destructure userDetails
  const { _id, firstname, lastname, phone_number, gender } = userDetails;
  //   console.log(userDetails);
  //   handle update
  const [buttonLoading, setButtonLoading] = useState(false);
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    phone_number: "",
    gender: "",
  });
  //   set default values
  useEffect(() => {
    if (userDetails) {
      setUserData({
        firstname,
        lastname,
        phone_number,
        gender,
      });
    }
  }, [userDetails]);
  //   get input values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  //   console.log("data is", userData);

  //   submit values
  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonLoading(true);
    e.target.reset();
    dispatch(updateUser(_id, userData));
  };
  const successMsg = useSelector((state) => state?.auth?.msg);
  //   console.log("success message is", successMsg);
  useEffect(() => {
    if (successMsg == "User successfully updated") {
      setButtonLoading(false);
      setUpdateModal(false);
    }
  }, [successMsg]);
  //   close modal
  const closeModal = (e) => {
    setUpdateModal(false);
  };
  return (
    <div className="bg-white w-[400px] p-2 py-5 rounded">
      <div className="flex justify-between items-center">
        <h2 className="text-blue text-xl my-2">Update User</h2>
        <p
          onClick={closeModal}
          className="cursor-pointer bg-gray-200 w-10 h-10 rounded-full flex justify-center items-center"
        >
          X
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col">
          <label>Firstname</label>
          <input
            type="text"
            onChange={handleChange}
            name="firstname"
            defaultValue={userData?.firstname}
            className="border p-2 rounded"
          />
        </div>{" "}
        <div className="flex flex-col">
          <label>Lastname</label>
          <input
            type="text"
            onChange={handleChange}
            name="lastname"
            defaultValue={userData?.lastname}
            className="border p-2 rounded"
          />
        </div>{" "}
        <div className="flex flex-col">
          <label>Phone number</label>
          <input
            type="number"
            onChange={handleChange}
            name="phone_number"
            defaultValue={userData?.phone_number}
            className="border p-2 rounded"
          />
        </div>{" "}
        <div className="flex flex-col">
          <label>Gender</label>
          <input
            type="text"
            onChange={handleChange}
            name="gender"
            defaultValue={userData?.gender}
            className="border p-2 rounded"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue w-full p-2 rounded text-white"
          >
            {buttonLoading ? (
              <div className="flex justify-center items-center space-x-2">
                <div className="border-2 border-r-3  border-r-gray-600 animate-spin rounded-full w-5 h-5"></div>
                <span>Processing..</span>
              </div>
            ) : (
              <div>Update</div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateModal;
