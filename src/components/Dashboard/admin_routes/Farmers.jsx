import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearUserSearched,
  deleteUser,
  getAllFarmers,
  getSpecificFarmer,
  searchUser,
} from "../../../redux/actions/auth";
// import { makePayment } from "../../../redux/actions/payment";
import RegisterForm from "../../Staff_routes/RegisterForm";
import Upload_form from "../Upload_form";
import { format } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import UpdateModal from "../UpdateModal";
import { clearErrors } from "../../../redux/actions/errors";
const Farmers = ({ farmers, currentUser }) => {
  const dispatch = useDispatch();
  const [registerModal, setRegisterModal] = useState(false);
  // set upload form states
  const [isUploadFormOpen, setisUploadFormOpen] = useState(false);
  const [farmerObj, setFarmerObj] = useState({});
  const openUploadModal = (farmer_info) => {
    setisUploadFormOpen(true);
    setFarmerObj(farmer_info);
  };
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
  // console.log(" userDetails are", userDetails);
  // search farmer
  const [searchValue, setSearchValue] = useState("");
  const [searchBtnLoading, setSearchBtnLoading] = useState(false);
  const getSearchValue = (e) => {
    // console.log(e.target.value);
    setSearchValue(e.target.value);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchBtnLoading(true);
    dispatch(searchUser(searchValue));
  };
  // disable search button loading
  const results = useSelector((state) => state?.auth?.search_result);
  const error = useSelector((state) => state?.errors?.msg?.typeId);
  console.log("errors are", error);
  useEffect(() => {
    if (results?.length > 0 || error === "SEARCH_USER_FAIL") {
      setSearchBtnLoading(false);
      dispatch(clearErrors());
    } else {
      setSearchBtnLoading(false);
    }
  }, [results, error]);
  // handle back
  const handleBack = () => {
    dispatch(clearUserSearched());
    // dispatch(getAllFarmers());
  };
  return (
    <section className="space-y-5">
      <div>
        <form onSubmit={handleSearch} className="my-3 flex w-1/2">
          <input
            type="text"
            required
            onChange={getSearchValue}
            placeholder="Search farmers by name or farmer ID here..."
            className=" rounded-tl-full rounded-bl-full border border-blue focus:outline-none   p-2 rounded w-full border-r-transparent"
          />
          <button
            type="submit"
            className="bg-blue  p-2 text-white rounded-tr-full rounded-br-full"
          >
            {searchBtnLoading ? (
              <div className="w-6 h-6 border-[2px] border-l-black border-dotted animate-spin rounded-full "></div>
            ) : (
              <span>Search</span>
            )}
          </button>
        </form>
      </div>
      <div className="flex justify-between items-center my-7">
        <div className="text-xl text-blue py-3">
          {results?.length > 0 ? (
            <div>
              <button
                onClick={handleBack}
                className="flex items-center space-x-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                  />
                </svg>
                <span>back to farmers</span>
              </button>
              {/* <p>Search results</p> */}
            </div>
          ) : (
            <p>Farmers List</p>
          )}
        </div>
        {/* <h2 className="text-2xl">Farmers List</h2> */}
        <div className="space-x-4">
          <button
            onClick={() => setRegisterModal(true)}
            className="p-2 rounded bg-orange text-white"
          >
            Create farmer
          </button>
        </div>
      </div>
      <div className="bg-white shadow-sm p-3 rounded-lg">
        {/* <h1 className="text-xl text-blue py-3">Farmers</h1> */}

        <table className="w-full">
          <thead>
            <tr>
              <th className="text-start py-2">Name</th>
              <th className="text-start py-2">Farmer ID</th>
              <th className="text-start py-2">Email</th>
              {/* <th className="text-start py-2">Phone Number</th> */}
              <th className="text-start py-2">Quantity (Kgs)</th>
              <th className="text-start py-2">Registered Date </th>
              {/* <th className="text-start py-2">Pay status</th> */}
              <th className="text-start py-2">Action</th>
            </tr>
          </thead>
          {results?.length > 0 ? (
            <tbody className="text-start">
              {results?.map((result, index) => {
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
                  totalKilos,
                  paid,
                } = result;
                const fullName = firstname.concat(" ", lastname);
                return (
                  <tr key={_id} className={even ? "bg-gray-50 " : "bg-white"}>
                    <td className="py-3 ">{fullName}</td>
                    <td className="py-3 ">{farmerId}</td>
                    <td className="py-3 ">{email}</td>
                    {/* <td className="py-3">{phone_number}</td> */}
                    <td className="py-3">{totalKilos}</td>
                    <td className="py-3">
                      {/* {format(new Date(createdAt), "yyyy-MM-dd")} */}
                      {format(
                        new Date(createdAt),
                        "do MMM yyyy HH:mm:ss aaaaa'm'"
                      )}
                    </td>

                    <td className="py-3 space-x-2 ">
                      <button onClick={() => openUploadModal(result)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-blue"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                          />
                        </svg>
                      </button>
                      <button onClick={() => showUpdateModal(result)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 "
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </button>

                      <button onClick={() => showDeleteModal(farmer)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-red"
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
          ) : (
            <tbody className="text-start">
              {farmers?.map((farmer, index) => {
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
                  totalKilos,
                  paid,
                } = farmer;
                const fullName = firstname.concat(" ", lastname);
                return (
                  <tr key={_id} className={even ? "bg-gray-50 " : "bg-white"}>
                    <td className="py-3 ">{fullName}</td>
                    <td className="py-3 ">{farmerId}</td>
                    <td className="py-3 ">{email}</td>
                    {/* <td className="py-3">{phone_number}</td> */}
                    <td className="py-3">{totalKilos}</td>
                    <td className="py-3">
                      {/* {format(new Date(createdAt), "yyyy-MM-dd")} */}
                      {format(
                        new Date(createdAt),
                        "do MMM yyyy HH:mm:ss aaaaa'm'"
                      )}
                    </td>

                    <td className="py-3 space-x-2 ">
                      <button onClick={() => openUploadModal(farmer)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-blue"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                          />
                        </svg>
                      </button>
                      <button onClick={() => showUpdateModal(farmer)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 "
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </button>

                      <button onClick={() => showDeleteModal(farmer)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-red"
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
          )}
        </table>
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
      {/* coffee upload form */}
      <div
        className={
          isUploadFormOpen
            ? "bg-[rgba(0,0,0,0.5)] bg-blend-multiply  flex  justify-center items-center fixed left-0 right-0 h-full  top-0 "
            : "hidden"
        }
      >
        {/* <div className="absolute top-10 right-16">
          <button
            // onClick={() => setisUploadFormOpen(false)}
            onClick={closeUploadModal}
            className="bg-white w-16 h-16 rounded-full p-2 text-black text-bold text-4xl"
          >
            X
          </button>
        </div> */}
        {
          <Upload_form
            farmerInfo={farmerObj}
            closeUploadModal={setisUploadFormOpen}
          />
        }
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

export default Farmers;
