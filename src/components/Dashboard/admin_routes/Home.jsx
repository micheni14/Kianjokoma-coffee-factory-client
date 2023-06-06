import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  clearPayableFarmers,
  getAccDetails,
  getAllTransactions,
  getPayableFarmers,
  MakeSinglePayment,
} from "../../../redux/actions/payment";
import axios from "axios";
import toast from "react-hot-toast";
import { authToken, getAllStaff } from "../../../redux/actions/auth";

const Home = ({ farmers, balance }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // get  recent transactions
  useEffect(() => {
    dispatch(getAllTransactions());
  }, []);
  const Transactions = useSelector((state) => state?.payment?.transactions);
  let filterNum = Transactions?.length - 7; // filter from
  const recentTransactions = Transactions?.slice(
    filterNum,
    Transactions?.length
  );
  // get total amount paid
  const totalArr = Transactions?.map((Transaction) => {
    return Transaction?.amount;
  });
  const totalPaid = totalArr?.reduce((a, b) => {
    return a + b;
  });

  // console.log("total is", totalPaid);

  // load all payable farmers
  useEffect(() => {
    dispatch(getPayableFarmers());
  }, []);
  const payableFarmers = useSelector(
    (state) => state?.payment?.payable_farmers
  );
  // console.log("payableFarmers", payableFarmers);

  // get total staff
  useEffect(() => {
    dispatch(getAllStaff());
  }, []);
  const allStaff = useSelector((state) => state?.auth?.staff);

  // pay all farmers
  const [payButtonLoading, setPayButtonLoading] = useState(false);
  const handlePayment = async () => {
    setPayButtonLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:4000/payment/pay-all-mng",
        authToken()
      );
      const data = response.data;
      if (data) {
        toast.success(data.message);
        setPayButtonLoading(false);
        dispatch(clearPayableFarmers());
        dispatch(getAccDetails());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setPayButtonLoading(false);
    }
  };
  // pay single farmer
  const handleSinglePayment = async (farmerId) => {
    dispatch(MakeSinglePayment(farmerId));
  };
  const payment_msg = useSelector((state) => state?.payment?.msg);
  // console.log("payment_msg", payment_msg);
  // get total quantity submitted
  const [quantitySubmitted, setQuantitySubmitted] = useState(0);
  const getQuantitySubmitted = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/coffee/total-quantity-submitted",
        authToken()
      );
      const data = await response.data;
      setQuantitySubmitted(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getQuantitySubmitted();
  }, []);

  // get total quantity paid
  const [quantityPaid, setQuantityPaid] = useState(0);
  const getQuantityPaid = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/coffee/total-quantity-paid",
        authToken()
      );
      const data = await response.data;
      setQuantityPaid(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getQuantityPaid();
  }, []);
  return (
    <section className="space-y-5">
      <div className="grid grid-cols-3 gap-5">
        <div className="shadow bg-yellow-400 rounded text-white text-lg  p-2 text-center space-y-2">
          <div>Total quantity(Kgs)</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white rounded text-black">
              <h2>Submitted</h2>
              <p>{quantitySubmitted}</p>
            </div>
            <div className="bg-white rounded text-black">
              <h2>Paid</h2>
              <p>{quantityPaid}</p>
            </div>
          </div>
          {/* <div>
            <span className="text-xl font-bold">20,000 Kgs</span>
          </div> */}
        </div>
        <div className="shadow bg-orange rounded text-white text-lg  p-2 text-center space-y-2">
          <div>Total amount paid</div>
          <div>
            <span className="text-xl font-bold">
              {" "}
              Ksh {totalPaid?.toLocaleString()}
            </span>
          </div>
        </div>{" "}
        <div className="shadow bg-green-400 rounded text-white text-lg  p-2 text-center space-y-2">
          <div>Account balance</div>
          <div>
            <span className="text-xl font-bold">
              Ksh {balance?.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="shadow  rounded text-lg bg-white py-5 px-2 text-center space-y-4">
          <div>Total Farmers</div>
          <div>
            <span className="text-xl font-bold ">{farmers?.length || 0}</span>
          </div>
        </div>
        <div className="shadow  rounded text-lg bg-white py-5 px-2 text-center space-y-4">
          <div>Total Staff</div>
          <div>
            <span className="text-xl font-bold ">{allStaff?.length || 0}</span>
          </div>
        </div>{" "}
      </div>
      <div>
        <Accordion>
          <AccordionSummary
            sx={{ borderBottom: "1px solid gray" }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div>
              <p className="text-xl font-bold">Eligible farmers for payment.</p>
            </div>
          </AccordionSummary>
          {payableFarmers?.length == 0 ? (
            <div className="p-4">No farmers at the moment.</div>
          ) : (
            <AccordionDetails>
              <div>
                <div className="text-blue text-lg flex justify-between items-center my-5">
                  <p>Payable farmers list ({payableFarmers?.length})</p>
                  <button
                    onClick={handlePayment}
                    className="p-2 bg-orange text-white rounded"
                  >
                    {payButtonLoading ? (
                      <div className="flex justify-center items-center space-x-2">
                        <div className="border-2 border-r-3  border-r-gray-600 animate-spin rounded-full w-5 h-5"></div>
                        <span>Processing..</span>
                      </div>
                    ) : (
                      <div>Pay All Farmers</div>
                    )}
                  </button>
                </div>
                <table className=" w-full ">
                  <thead>
                    <tr>
                      <th className="text-start py-2">ID</th>
                      <th className="text-start py-2">Name</th>
                      <th className="text-start py-2">Email</th>
                      <th className="text-start py-2">Phone No</th>
                      <th className="text-start py-2">Gender</th>
                      <th className="text-start py-2">Kg(s)</th>
                      <th className="text-start py-2">Amount (Ksh)</th>
                      <th className="text-start py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-start">
                    {payableFarmers?.map((payableFarmer, index) => {
                      const even = index % 2 === 0;

                      const {
                        _id,
                        value,
                        firstname,
                        lastname,
                        farmerId,
                        email,
                        phone_number,
                        totalKilos,
                        gender,
                      } = payableFarmer;
                      const fullname = `${firstname} ${lastname}`;
                      return (
                        <tr
                          key={_id}
                          className={even ? "bg-gray-50 " : "bg-white"}
                        >
                          <td className="py-3 ">{farmerId}</td>
                          <td className="py-3 ">{fullname}</td>
                          <td className="py-3 ">{email}</td>
                          <td className="py-3">{phone_number}</td>
                          <td className="py-3">{gender}</td>
                          <td className="py-3">
                            {totalKilos?.toLocaleString()}
                          </td>
                          <td className="py-3">{value?.toLocaleString()}</td>
                          <td className="py-3">
                            <button
                              onClick={() => handleSinglePayment(_id)}
                              className={
                                value == 0
                                  ? "hidden"
                                  : "flex items-center space-x-1 bg-green-500 text-white  rounded p-1"
                              }
                            >
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
                                  d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                              <span>Pay</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </AccordionDetails>
          )}
        </Accordion>
      </div>
      <div className="bg-white shadow-sm p-3 rounded-lg">
        <h2 className="my-2 py-2  border-b-[1px] border-gray-200 text-xl font-bold">
          Recent Payments Made.
        </h2>

        <table className=" w-full ">
          <thead>
            <tr>
              <th className="text-start py-2">ID</th>
              <th className="text-start py-2">Name</th>
              <th className="text-start py-2">Phone No</th>
              <th className="text-start py-2">Quantity (Kgs)</th>
              <th className="text-start py-2">Amount(Ksh)</th>
              <th className="text-start py-2">Date Paid</th>
            </tr>
          </thead>
          <tbody className="text-start">
            {recentTransactions?.map((Transaction, index) => {
              const even = index % 2 === 0;
              // console.log("even is", even);
              const {
                _id,
                amount,
                createdAt,
                farmerId,
                name,
                phone,
                quantity,
              } = Transaction;
              return (
                <tr key={_id} className={even ? "bg-gray-50 " : "bg-white"}>
                  <td className="py-3 ">{_id}</td>
                  <td className="py-3 ">{name}</td>
                  <td className="py-3">0{phone}</td>
                  <td className="py-3">{quantity}</td>
                  <td className="py-3">{amount}</td>
                  <td className="py-3">
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
        <div className="text-end my-3 text-blue">
          <button
            onClick={() => navigate("/dashboard/admin/payment")}
            className="cursor-pointer"
          >
            Show more
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
