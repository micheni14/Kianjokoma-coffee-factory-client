import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rejectedRequest } from "../../../redux/actions/payment";
const RejectedRequests = ({
  approvePayment,
  notification,
  approvalAmount,
  approveMultiplePayment,
}) => {
  console.log("notification is", notification);
  const dispatch = useDispatch();
  //   get rejected requests
  useEffect(() => {
    dispatch(rejectedRequest());
  }, []);
  const rejectedRequests = useSelector(
    (state) => state?.payment?.rejected_requests
  );
  //   console.log("rejectedReq are", rejectedReq);
  return (
    <section className="space-y-4">
      <div
        className={
          notification === "rejected"
            ? "flex flex-col bg-black text-white p-2 rounded space-y-2"
            : "hidden"
        }
      >
        <p className="text-lg">Bulk disbursment</p>
        <p>
          {" "}
          {notification} approval of Ksh {approvalAmount}
        </p>
        <div className="flex space-x-3">
          <button
            onClick={approveMultiplePayment}
            className="p-1.5 px-5 bg-green-500 text-white rounded"
          >
            Approve
          </button>
          {/* <button
            onClick={rejectMultiple}
            className="p-1.5 px-5 bg-red text-white rounded"
          >
            Reject
          </button> */}
        </div>
      </div>
      {rejectedRequests?.map((rejectedRequest) => {
        const { _id, request_amount, sender_name, status, createdAt } =
          rejectedRequest;
        return (
          <div key={_id} className="bg-white p-2 rounded space-y-2">
            <p>
              From: <span className="font-bold">{sender_name}</span>
            </p>
            <p>
              Request amount:{" "}
              <span className="font-bold">
                Ksh {request_amount?.toLocaleString()}
              </span>
            </p>
            <p>
              Status: <span className="text-red">{status}</span>
            </p>
            <button
              onClick={() => approvePayment(_id)}
              className="p-1.5 px-4 bg-green-500 rounded text-white "
            >
              Approve
            </button>
          </div>
        );
      })}
    </section>
  );
};

export default RejectedRequests;
