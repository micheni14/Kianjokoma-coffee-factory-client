import React from "react";
import { format } from "date-fns";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllTransactions } from "../../../redux/actions/payment";
const Payment = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTransactions());
  }, []);

  const Transactions = useSelector((state) => state?.payment?.transactions);
  console.log("Transactions are", Transactions);
  return (
    <section>
      <div className="flex justify-between items-center my-7">
        <h2 className="text-2xl">Payment List</h2>
        <button className="p-2 bg-gray-200 rounded"></button>
      </div>
      <div className="bg-white shadow-sm p-3 rounded-lg">
        <table className=" w-full ">
          <thead>
            <tr>
              <th className="text-start py-2">ID</th>
              <th className="text-start py-2">Name</th>
              <th className="text-start py-2">Phone No</th>
              <th className="text-start py-2">Quantity (Kgs)</th>
              <th className="text-start py-2">Amount</th>
              <th className="text-start py-2">Date paid</th>
            </tr>
          </thead>
          <tbody className="text-start">
            {Transactions?.map((Transaction, index) => {
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
                  <td className="py-3">{phone}</td>

                  <td className="py-3 ">{quantity?.toLocaleString()}</td>

                  <td className="py-3">{amount?.toLocaleString()}</td>

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
    </section>
  );
};

export default Payment;
