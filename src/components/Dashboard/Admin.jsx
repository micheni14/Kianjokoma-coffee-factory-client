import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  authToken,
  authUser,
  getAllFarmers,
  logout,
} from "../../redux/actions/auth";
import Farmers from "./admin_routes/Farmers";
import Home from "./admin_routes/Home";
import Staff from "./admin_routes/Staff";
import Payment from "./admin_routes/Payment";
import { Modal } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import Profile from "./Profile";
import { getAccDetails, rejectedRequest } from "../../redux/actions/payment";
import WaitingRequests from "./admin_routes/WaitingRequests";
import RejectedRequests from "./admin_routes/RejectedRequests";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location?.pathname;
  // get account details
  // acc balance
  const balance = useSelector(
    (state) => state?.payment?.account_details?.account_balance
  );
  useEffect(() => {
    dispatch(getAccDetails());
  }, []);
  // payment status
  const notification = useSelector(
    (state) => state?.payment?.account_details?.paymentApproval
  );
  // approval amoun
  const approvalAmount = useSelector(
    (state) => state?.payment?.account_details?.approvalAmount
  );
  console.log("approvalAmount is", approvalAmount);
  // console.log("notification is", notification);
  // notification sidebar
  const [sideBar, setSideBar] = useState(false);

  // console.log("Location is", path);
  // current logged in admin
  const admin = useSelector((state) => state?.auth?.current_user);
  const fullname = `${admin?.firstname} ${admin?.lastname}`;

  useEffect(() => {
    dispatch(authUser());
  }, []);
  // logout if not admin
  // console.log("admin is", admin);
  // useEffect(() => {
  //   if (admin?.role !== "admin") {
  //     dispatch(logout());
  //     navigate("/login");
  //   }
  // }, [admin]);
  // load farmers
  useEffect(() => {
    dispatch(getAllFarmers());
  }, []);
  const farmers = useSelector((state) => state?.auth?.farmers);
  // handle logout
  const auth = useSelector((state) => state?.auth?.isAuthenticated);
  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!auth) {
      return navigate("/login");
    }
  }, [auth]);

  // handle deposit
  const [depositModal, setDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [payBtnLoading, setPayBtnLoading] = useState(false);
  // close Modal
  const handleModalClose = () => {
    setDepositModal(false);
    setDepositAmount("");
  };
  // get value from the field
  const handleChange = (e) => {
    setDepositAmount(e.target.value);
    console.log(e.target.value);
  };
  const handleDeposit = async (e) => {
    setPayBtnLoading(true);
    e.preventDefault();
    // body
    const body = {
      deposit_amount: depositAmount,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/account/deposit",
        body,
        authToken()
      );
      const data = await response.data;

      setPayBtnLoading(false);
      setDepositModal(false);
      setDepositAmount("");
      toast.success(data.message);
      console.log(data);
      dispatch(getAccDetails());
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setPayBtnLoading(false);

      setDepositAmount("");
    }
  };
  // approve multiple payment
  const approveMultiplePayment = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/payment/approve-multiple-payments"
      );
      const data = response.data;
      // console.log("approval data is ", data);
      toast.success(data?.message);
      dispatch(getAccDetails());
    } catch (error) {
      console.log(error);

      toast.error(error.response.data.message);
    }
  };

  // approve payment
  const approvePayment = async (requestId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/payment/approve-payment/${requestId}`
      );
      const data = await response.data;
      if (data) {
        toast.success(data.message);
        getRequests();
        dispatch(rejectedRequest());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  // reject multiple payments
  const rejectMultiple = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/payment/reject-multiple-payment",
        authToken()
      );
      const data = await response.data;
      if (data) {
        toast.success(data.message);
        dispatch(getAccDetails());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  // reject single payment
  const rejectSinglePayment = async (requestId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/payment/reject-single-payment/${requestId}`
      );
      const data = await response.data;
      if (data) {
        toast.error(data.message);
        getRequests();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  // get pending requests
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    getRequests();
  }, []);

  const getRequests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/payment/requests",
        authToken()
      );
      const data = await response.data;
      if (data) {
        setRequests(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="">
      <div
        //   className="left bg-blue fixed h-screen text-white p-3"
        className="w-[20%] bg-blue fixed h-screen text-white p-3 "
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl p-2 text-orange">KIANJOKOMA COFFEE FACTORY</p>
          </div>
          {/* <div className="menu " onClick={() => setResize(!resize)}>
            <div></div>
            <div></div>
            <div></div>
          </div> */}
        </div>
        <ul className="mt-5">
          <Link to="/dashboard/admin">
            <li
              // className="flex items-center  space-x-2 rounded px-3 py-2 hover:bg-gray-50 hover:text-black"
              className={
                path == "/dashboard/admin" ||
                path == "/dashboard/admin/rejected"
                  ? "flex items-center  space-x-2 rounded px-3 py-2 my-1.5  hover:bg-gray-50 bg-gray-50 hover:text-black text-black"
                  : "flex items-center  space-x-2 rounded px-3 py-2 my-1.5 hover:bg-gray-50 hover:text-black"
              }
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
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              <span>Home</span>
            </li>
          </Link>
          <Link to="/dashboard/admin/staff">
            <li
              // className=" flex items-center space-x-2 rounded px-3 py-2 hover:bg-gray-50 hover:text-black"
              className={
                path == "/dashboard/admin/staff"
                  ? "flex items-center  space-x-2 rounded px-3 py-2 my-1.5  hover:bg-gray-50 bg-gray-50 hover:text-black text-black"
                  : "flex items-center  space-x-2 rounded px-3 py-2 my-1.5 hover:bg-gray-50 hover:text-black"
              }
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
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
              <span>Staff</span>
            </li>
          </Link>
          <Link to="/dashboard/admin/farmers">
            <li
              // className=" flex items-center space-x-2 rounded px-3 py-2 hover:bg-gray-50 hover:text-black"
              className={
                path == "/dashboard/admin/farmers"
                  ? "flex items-center  space-x-2 rounded px-3 py-2 my-1.5  hover:bg-gray-50 bg-gray-50 hover:text-black text-black"
                  : "flex items-center  space-x-2 rounded px-3 py-2 my-1.5 hover:bg-gray-50 hover:text-black"
              }
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
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
              <span>Farmers</span>
            </li>
          </Link>
          <Link to="/dashboard/admin/payment">
            <li
              // className=" flex items-center space-x-2 rounded px-3 py-2 hover:bg-gray-50 hover:text-black"
              className={
                path == "/dashboard/admin/payment"
                  ? "flex items-center  space-x-2 rounded px-3 py-2 my-1.5  hover:bg-gray-50 bg-gray-50 hover:text-black text-black"
                  : "flex items-center  space-x-2 rounded px-3 py-2 my-1.5 hover:bg-gray-50 hover:text-black"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Payments</span>
            </li>
          </Link>
          <Link to="/dashboard/admin/profile">
            <li
              // className=" flex  items-center space-x-2  cursor-pointer rounded px-3 py-2 hover:bg-gray-50 hover:text-black"
              className={
                path == "/dashboard/admin/profile"
                  ? "flex items-center  space-x-2 rounded px-3 py-2 my-1.5  hover:bg-gray-50 bg-gray-50 hover:text-black text-black"
                  : "flex items-center  space-x-2 rounded px-3 py-2 my-1.5 hover:bg-gray-50 hover:text-black"
              }
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
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>profile</span>
            </li>
          </Link>
        </ul>
      </div>
      <div className="w-[80%] bg-gray-50 absolute right-0 min-h-screen pb-16">
        <main className="w-mobile mx-auto py-5">
          <div className="flex justify-between items-center  border-b py-3">
            <h2 className="text-xl font-bold">Admin Dashboard.</h2>
            <div className="flex space-x-3">
              <button
                onClick={handleLogout}
                className="p-2 flex justify-center bg-blue text-white rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
                <span>Logout</span>
              </button>
              <button
                onClick={() => setDepositModal(true)}
                className="p-2 flex justify-center bg-gray-200 rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Deposit Cash</span>
              </button>
              <button className="relative" onClick={() => setSideBar(true)}>
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
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
                {/* <span className="absolute p-2 -top-1.5 -right-2 bg-red text-white shadow-lg w-5 h-5 rounded-full flex justify-center items-center ">
                  <p>
                    {requests?.length || notification !== "approved" ? 1 : 0}
                  </p>
                </span> */}
              </button>
            </div>
          </div>
          <div className="text-lg py-3 italic">
            <h2>Logged in as {fullname}</h2>
          </div>
          <Routes>
            <Route
              path="/*"
              element={<Home farmers={farmers} balance={balance} />}
            />
            <Route path="/staff" element={<Staff />} />
            <Route
              path="/farmers"
              element={<Farmers farmers={farmers} currentUser={fullname} />}
            />
            <Route path="/payment" element={<Payment />} />
            <Route path="/profile" element={<Profile currentUser={admin} />} />
          </Routes>
        </main>
      </div>
      {/* notification */}
      <div
        className={
          sideBar
            ? "absolute shadow p-2 space-y-5 flex flex-col right-0 translate-x-[0rem]  transition-all top-[85px] bg-gray-100 h-full overflow-auto   w-[300px]"
            : "fixed shadow p-2 space-y-5 flex flex-col right-0 translate-x-[20rem] transition-all top-[85px] bg-white h-screen  w-[300px]"
        }
      >
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold">Payment Requests</div>
          <div
            onClick={() => setSideBar(false)}
            className=" cursor-pointer bg-white hover:shadow-lg w-8 h-8 flex justify-center items-center rounded-full"
          >
            X
          </div>
        </div>
        <div className="bg-white rounded-full flex justify-evenly items-center">
          <Link
            to="/dashboard/admin"
            className={
              path == "/dashboard/admin"
                ? "bg-gray-300 w-full p-2  rounded-full text-center"
                : " w-full p-2  rounded-full text-center"
            }
          >
            <button>Waiting</button>
          </Link>
          <Link
            to="/dashboard/admin/rejected"
            className={
              path == "/dashboard/admin/rejected"
                ? "bg-gray-300 w-full p-2  rounded-full text-center"
                : " w-full p-2  rounded-full text-center"
            }
          >
            <button>Rejected</button>
          </Link>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <WaitingRequests
                approvalAmount={approvalAmount}
                notification={notification}
                approveMultiplePayment={approveMultiplePayment}
                requests={requests}
                approvePayment={approvePayment}
                rejectMultiple={rejectMultiple}
                rejectSinglePayment={rejectSinglePayment}
              />
            }
          />
          <Route
            path="/rejected"
            element={
              <RejectedRequests
                approveMultiplePayment={approveMultiplePayment}
                approvePayment={approvePayment}
                notification={notification}
                approvalAmount={approvalAmount}
                rejectMultiple={rejectMultiple}
              />
            }
          />
        </Routes>
      </div>
      {/*deposit modal */}
      <div
        className={
          depositModal
            ? "fixed h-full bg-[rgba(0,0,0,0.25)] flex flex-col   items-center  left-0 right-0 top-0 bottom-0 pt-24"
            : "hidden"
        }
      >
        <div className="bg-white space-y-4 p-4 w-mobile md:w-[450px]  rounded shadow">
          <h2 className="text-xl font-bold">Enter the amount to deposit.</h2>
          <form onSubmit={handleDeposit} className="space-y-6">
            <input
              type="number"
              onChange={handleChange}
              value={depositAmount}
              className="border w-full p-2 rounded border-blue outline-blue"
              placeholder="100,200,300 etc.."
            />
            <div className="flex justify-end space-x-5">
              <button
                type="submit"
                disabled={depositAmount == 0 ? true : false}
                className={
                  depositAmount == 0
                    ? "bg-blue opacity-50 text-white p-2 rounded-lg"
                    : "bg-blue  text-white p-2 rounded-lg"
                }
                // className="bg-blue  text-white p-2 rounded-lg"
              >
                {payBtnLoading ? (
                  <div className="flex justify-center items-center space-x-2">
                    <div className="border-2 border-r-3  border-r-gray-600 animate-spin rounded-full w-5 h-5"></div>
                    <span>Processing..</span>
                  </div>
                ) : (
                  <div>Continue</div>
                )}
              </button>
              <div
                onClick={handleModalClose}
                className="bg-red text-white p-2 rounded-lg cursor-pointer"
              >
                Close
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Admin;
