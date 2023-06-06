import React from "react";

function WaitingRequests({
  approveMultiplePayment,
  notification,
  requests,
  approvePayment,
  rejectMultiple,
  rejectSinglePayment,
  approvalAmount,
}) {
  return (
    <section>
      <div
        className={
          notification !== "waiting"
            ? "hidden"
            : "flex flex-col bg-black text-white p-2 rounded space-y-2"
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
          <button
            onClick={rejectMultiple}
            className="p-1.5 px-5 bg-red text-white rounded"
          >
            Reject
          </button>
        </div>
      </div>
      <div className="space-y-5">
        {requests?.length == 0
          ? ""
          : requests?.map((request) => {
              const { _id, request_amount, sender_name, status, createdAt } =
                request;
              return (
                <div
                  key={_id}
                  className="shadow p-2 space-y-2 rounded bg-white"
                >
                  <div>
                    <p>
                      From:<span>{sender_name}</span>
                    </p>
                    <p>
                      Request amount:<span>Ksh {request_amount}</span>
                    </p>
                    <p>
                      Status: <span>{status}</span>{" "}
                    </p>
                  </div>
                  <div className="space-x-5">
                    <button
                      onClick={() => approvePayment(_id)}
                      className="p-1.5 px-5 bg-green-500 text-white rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => rejectSinglePayment(_id)}
                      className="p-1.5 px-5 bg-red text-white rounded"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              );
            })}
      </div>
    </section>
  );
}

export default WaitingRequests;
