import React, { useState, useEffect, useCallback } from "react";

import { useSelector, useDispatch } from "react-redux";
import { deleteUser, getAllStaff } from "../../../redux/actions/auth";
import RegisterForm from "../../Staff_routes/RegisterForm";
import { format } from "date-fns";
import UpdateModal from "../UpdateModal";
const Staff = () => {
  const dispatch = useDispatch();
  const [registerModal, setRegisterModal] = useState(false);
  // get all staff
  useEffect(() => {
    let subscribed = true;
    if (subscribed) {
      loadStaff();
    }
    return () => (subscribed = false);
  }, []);
  const loadStaff = useCallback(() => {
    dispatch(getAllStaff());
  });
  const allStaff = useSelector((state) => state?.auth?.staff);
  // console.log("staff are", allStaff);
  // delete modal
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [user, setUser] = useState({});
  const { _id, firstname, lastname } = user;
  const showDeleteModal = (user) => {
    setdeleteModal(true);
    setUser(user);
  };
  // console.log(firstname);

  // delete functionality
  const handleDelete = () => {
    setDeleteLoading(true);
    dispatch(deleteUser(_id));
  };
  const success_msg = useSelector((state) => state?.auth?.msg);
  // console.log(" success_msg is", success_msg);
  useEffect(() => {
    if (success_msg == "User succesfully deleted") {
      setDeleteLoading(false);
      setdeleteModal(false);
    }
  }, [success_msg]);
  // update modal
  const [updateModal, setUpdateModal] = useState(false);
  const [userDetails, setuserDetails] = useState({});
  // console.log("updateModal", updateModal);
  const showUpdateModal = (user) => {
    setUpdateModal(true);
    setuserDetails(user);
  };
  console.log(" userDetails are", userDetails);
  return (
    <section>
      <div className="flex justify-between items-center my-7">
        <h2 className="text-2xl">Staff List</h2>
        <button
          onClick={() => setRegisterModal(true)}
          className="p-2 rounded bg-orange text-white"
        >
          Create staff
        </button>
      </div>
      <div className="bg-white shadow-sm p-3 rounded-lg">
        {/* <h1 className="text-xl text-blue py-3">Farmers</h1> */}

        <table className=" w-full ">
          <thead>
            <tr>
              <th className="text-start py-2">Name</th>
              <th className="text-start py-2">Staff ID</th>
              <th className="text-start py-2">Email</th>
              <th className="text-start py-2">Phone Number</th>
              <th className="text-start py-2">Gender</th>

              <th className="text-start py-2">Registered Date</th>
              <th className="text-start py-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-start">
            {allStaff?.map((staf, index) => {
              const even = index % 2 === 0;
              // console.log("even is", even);
              const {
                _id,
                firstname,
                lastname,
                phone_number,
                email,
                createdAt,
                farmerId,
                gender,
              } = staf;
              const fullName = firstname.concat(" ", lastname);
              return (
                <tr key={_id} className={even ? "bg-gray-50 " : "bg-white"}>
                  <td className="py-3 ">{`${firstname + " " + lastname}`}</td>
                  {/* <td className="py-3 ">Kelvin Mati</td> */}

                  <td className="py-3 ">{farmerId}</td>
                  {/* <td className="py-3 ">549023</td> */}

                  <td className="py-3 ">{email}</td>
                  {/* <td className="py-3 ">staff@gmail.com</td> */}

                  <td className="py-3">{phone_number}</td>
                  {/* <td className="py-3">0759761904</td> */}
                  <td className="py-3">{gender}</td>

                  <td className="py-3">
                    {format(
                      new Date(createdAt),
                      "do MMM yyyy HH:mm:ss aaaaa'm'"
                    )}
                  </td>

                  <td className="py-3 flex justify-evenly">
                    <button onClick={() => showUpdateModal(staf)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-7 h-7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                    <button onClick={() => showDeleteModal(staf)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-7 h-7 text-red"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* delete modal */}
      <div
        className={
          deleteModal
            ? "fixed h-full bg-[rgba(0,0,0,0.34)] flex flex-col   items-center  left-0 right-0 top-0 bottom-0 pt-24"
            : "hidden"
        }
      >
        <div className="bg-white space-y-3 p-4 w-mobile md:w-[450px]  rounded shadow">
          <h2 className="text-lg font-bold ">
            Are you sure you want to delete {firstname?.concat(" ", lastname)}?
          </h2>
          <p>This action cannot be undone!</p>

          <div className="flex justify-end space-x-2">
            <div
              onClick={() => setdeleteModal(false)}
              className="cursor-pointer bg-gray-200  p-2 rounded-lg"
            >
              Cancel
            </div>
            <button
              className="bg-red  text-white p-2 rounded-lg"
              onClick={handleDelete}
            >
              {deleteLoading ? (
                <div className="flex justify-center items-center space-x-2">
                  <div className="border-2 border-r-3  border-r-gray-600 animate-spin rounded-full w-5 h-5"></div>
                  <span>Deleting..</span>
                </div>
              ) : (
                <div>Yes,delete</div>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Farmer register form */}
      <div
        className={
          registerModal
            ? "fixed h-full bg-[rgba(0,0,0,0.5)] flex flex-col justify-center items-center  left-0 right-0 top-0 bottom-0"
            : "hidden"
        }
      >
        <div className="bg-white space-y-4 p-3 w-mobile md:w-[500px]  rounded shadow">
          {<RegisterForm setRegisterModal={setRegisterModal} />}
        </div>
      </div>
      {/* update modal */}
      <div
        className={
          updateModal
            ? "fixed h-full bg-[rgba(0,0,0,0.34)] flex flex-col justify-center  items-center  left-0 right-0 top-0 bottom-0 pt-24"
            : "hidden"
        }
      >
        <UpdateModal
          userDetails={userDetails}
          setUpdateModal={setUpdateModal}
        />
      </div>
    </section>
  );
};

export default Staff;
