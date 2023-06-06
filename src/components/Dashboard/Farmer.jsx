import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authUser, logout } from "../../redux/actions/auth";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { format } from "date-fns";
import Test from "./Test";
import Profile from "./Profile";
const Farmer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // get the current logged in farmer using the token

  useEffect(() => {
    let subscribed = true;
    if (subscribed) {
      loadCurrentFarmer();
    }
    return () => (subscribed = false);
  }, []);
  const loadCurrentFarmer = useCallback(() => {
    dispatch(authUser());
  }, []);

  const currentFarmer = useSelector((state) => state?.auth?.current_user);
  // console.log("currentFarmer is", currentFarmer);
  const fullname = ` ${currentFarmer?.firstname} ${currentFarmer?.lastname} `;
  // handle logout
  const auth = useSelector((state) => state?.auth?.isAuthenticated);
  // console.log(" isAuth", auth);
  const handleLogout = () => {
    dispatch(logout());
  };
  useEffect(() => {
    if (!auth) {
      return navigate("/login");
    }
  }, [auth]);
  // set modal state
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const handleModalClose = (e) => {
    e.preventDefault();
    setWithdrawModal(false);
  };
  // withdrawal functionality
  const handleChange = (e) => {
    setAmount(e.target.value);
  };
  const handleWithdraw = async (e) => {
    e.preventDefault();
    setButtonLoading(true);
    try {
      // config
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      //   body
      const body = {
        withdrawalAmount: amount,
      };
      const response = await axios.post(
        `http://localhost:4000/payment/withdraw/${currentFarmer?._id}`,
        body,
        config
      );
      const data = await response.data;
      if (data) {
        toast.success(data?.message);
        dispatch(authUser());
        setWithdrawModal(false);
        setButtonLoading(false);
        setAmount("");
      }
      // console.log("withdraw data is ", data);
    } catch (error) {
      toast.error(error.response.data.message);
      setButtonLoading(false);
      // console.log(error);
    }
  };
  // profile modal
  const [profileModal, setprofileModal] = useState(false);
  return (
    <section className="bg-gray-50  min-h-screen h-full pb-20">
      <nav className="bg-blue text-white h-[80px]">
        <div className="w-mobile md:w-container_width mx-auto flex justify-between items-center h-full  ">
          <div>
            <h2 className="text-xl">Kianjokoma coffee factory</h2>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleLogout}
              className="p-2 flex space-x-1 justify-center bg-orange text-white rounded"
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
            {currentFarmer?.wallet === 0 ? (
              ""
            ) : (
              <button
                onClick={() => setWithdrawModal(true)}
                className="p-2 flex space-x-1 justify-center bg-gray-200 text-black rounded"
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
                    d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <span>Withdraw</span>
              </button>
            )}

            <button
              onClick={() => setprofileModal(true)}
              className="p-2 flex space-x-1 justify-center bg-white text-black rounded"
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
              <span>Account</span>
            </button>
          </div>
        </div>
      </nav>
      <div className="w-mobile md:w-container_width mx-auto">
        <div className="text-2xl font-bold my-5">Welcome {fullname},</div>
        {/* <div className=" grid sm:grid-cols-2 gap-5 py-16"> */}
        <div className="space-y-14 pt-6">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white shadow rounded-lg py-4 px-2 text-center space-y-3">
              <h2 className="text-lg">Coffee quantity(Kgs)</h2>

              <p className="text-2xl font-bold">
                {currentFarmer?.totalKilos?.toLocaleString()}
              </p>
            </div>
            <div className="bg-white shadow rounded-lg py-4 px-2 text-center space-y-3">
              <h2 className="text-lg">Value(Ksh)</h2>

              <p className="text-2xl font-bold ">
                {currentFarmer?.value?.toLocaleString() || 0}
              </p>
            </div>
            <div className="bg-black text-yellow-500 shadow rounded-lg py-4 px-2 text-center space-y-3">
              <h2 className="text-lg ">Wallet(Ksh)</h2>

              <p className="text-2xl font-bold ">
                {currentFarmer?.wallet?.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="bg-white p-3 rounded shadow">
            <h2 className="text-blue text-2xl my-2">My Delivery</h2>
            {currentFarmer?.coffeeDetails == 0 ? (
              <h2>No deliveries at the moment</h2>
            ) : (
              <div>
                <table className=" w-full overflow-auto">
                  <thead>
                    <tr>
                      <th className="text-start py-2">Type</th>
                      <th className="text-start py-2">Quantity(Kgs)</th>
                      <th className="text-start py-2">Date submitted</th>
                    </tr>
                  </thead>
                  <tbody className="text-start">
                    {currentFarmer?.coffeeDetails?.map(
                      (coffeDetails, index) => {
                        return (
                          <tr key={coffeDetails?._id}>
                            <td className="py-3 ">
                              {coffeDetails?.coffee_type}
                            </td>
                            <td className="py-3 ">
                              {coffeDetails?.quantity?.toLocaleString()}
                            </td>
                            <td className="py-3">
                              {format(
                                new Date(coffeDetails?.createdAt),
                                "do MMM yyyy HH:mm:ss aaaaa'm'"
                              )}
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {currentFarmer?.paymentRecord == 0 ? (
            ""
          ) : (
            <div className="bg-white p-3 shadow rounded">
              <h2 className="text-blue text-2xl my-2">Payment record</h2>
              <table className=" w-full overflow-auto ">
                <thead>
                  <tr>
                    {/* <th className="text-start py-2">Name</th> */}
                    <th className="text-start py-2">ID</th>
                    <th className="text-start py-2">Phone</th>
                    <th className="text-start py-2">Quantity(Kgs)</th>
                    <th className="text-start py-2">Amount(Ksh)</th>
                    <th className="text-start py-2">Date paid</th>
                  </tr>
                </thead>
                <tbody className="text-start">
                  {currentFarmer?.paymentRecord?.map((pymntRecord, index) => {
                    const even = index % 2 === 0;
                    const {
                      _id,
                      farmerId,
                      name,
                      amount,
                      createdAt,
                      phone,
                      quantity,
                    } = pymntRecord;
                    return (
                      <tr
                        key={_id}
                        className={even ? "bg-gray-50 " : "bg-white"}
                      >
                        {/* <td className="py-3 ">{name}</td> */}
                        <td className="py-3 ">{farmerId}</td>
                        <td className="py-3 ">{phone}</td>
                        <td className="py-3 ">{quantity?.toLocaleString()}</td>
                        <td className="py-3 ">{amount?.toLocaleString()}</td>
                        <td className="py-3">
                          {" "}
                          {format(
                            new Date(createdAt),
                            "do MMM yyyy HH:mm:ss aaaaa'm'"
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div>
          {/* <Routes>
            <Route path="/profile" element={<Test />} />
          </Routes> */}
        </div>
      </div>
      <div
        className={
          profileModal
            ? "fixed h-full bg-[rgba(0,0,0,0.23)] flex flex-col   items-center  left-0 right-0 top-0 bottom-0 pt-24"
            : "hidden"
        }
      >
        <Profile
          currentUser={currentFarmer}
          setprofileModal={setprofileModal}
        />
      </div>
      {/* modal */}
      <div
        className={
          withdrawModal
            ? "fixed h-full bg-[rgba(0,0,0,0.23)] flex flex-col   items-center  left-0 right-0 top-0 bottom-0 pt-24"
            : "hidden"
        }
      >
        <div className="bg-white space-y-4 p-4 w-mobile md:w-[450px]  rounded shadow">
          <h2 className="text-xl font-bold">
            Input the amount you want to withdraw.
          </h2>
          <form onSubmit={handleWithdraw} className="space-y-6">
            <input
              type="number"
              onChange={handleChange}
              value={amount}
              className="border w-full p-2 rounded border-blue outline-blue"
              placeholder="100,200,300 etc.."
            />
            <div className="flex justify-end space-x-5">
              <button
                type="submit"
                disabled={amount == "" ? true : false}
                className={
                  amount == ""
                    ? "bg-blue opacity-50 text-white p-2 rounded-lg"
                    : "bg-blue  text-white p-2 rounded-lg"
                }
              >
                {buttonLoading ? (
                  <div className="flex justify-center items-center space-x-2">
                    <div className="border-2 border-r-3  border-r-gray-600 animate-spin rounded-full w-5 h-5"></div>
                    <span>Processing..</span>
                  </div>
                ) : (
                  <div>Withdraw</div>
                )}
              </button>
              <button
                onClick={handleModalClose}
                className="bg-red text-white p-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Farmer;

const loop = [1, 2, 3];
