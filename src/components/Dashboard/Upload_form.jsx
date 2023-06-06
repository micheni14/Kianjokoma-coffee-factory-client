import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { coffeeUpload } from "../../redux/actions/auth";
import { clearErrors } from "../../redux/actions/errors";
import { getPayableFarmers } from "../../redux/actions/payment";

const Upload_form = ({ farmerInfo, closeUploadModal }) => {
  const dispatch = useDispatch();
  // initialize react hook form
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    shouldUnregister: true,
    shouldFocusError: true,
  });
  const [buttonLoading, setbuttonLoading] = useState(false); //set loading state
  // upload farmers data
  const onSubmit = async (data) => {
    setbuttonLoading(true);
    dispatch(coffeeUpload(farmerInfo?._id, data));
  };
  // stop button loading
  const success_msg = useSelector((state) => state?.auth?.msg);
  const error = useSelector((state) => state?.errors?.msg?.typeId);
  useEffect(() => {
    if (error === "COFFEE_UPLOAD_FAIL") {
      setbuttonLoading(false);
      dispatch(clearErrors());
      reset();
    } else {
      setbuttonLoading(false);
    }
  }, [error]);
  console.log("error is", error);
  useEffect(() => {
    if (success_msg == "Succesfully uploaded") {
      setbuttonLoading(false);
      closeUploadModal(false);
      reset();
    }
  }, [success_msg]);
  return (
    <section className="grid grid-cols-2  gap-3 bg-white shadow w-mobile md:w-[70%] ">
      <div className="bg-blue p-3 text-white space-y-2">
        <h2 className="uppercase text-center bg-white text-black rounded p-2 font-bold">
          {`${farmerInfo?.firstname} ${farmerInfo?.lastname}`}
        </h2>
        <div>
          <h2 className="text-lg text-orange">Weight and value</h2>
          <h2>Total kgs: {farmerInfo?.totalKilos?.toLocaleString()}</h2>
          <h2>Total Amount: Ksh {farmerInfo?.value?.toLocaleString()}</h2>
        </div>
        <div>
          <h2 className="text-lg text-orange">Delivery records</h2>
        </div>
        {farmerInfo?.coffeeDetails?.length == 0 ? (
          <div className="h-[220px]">
            {" "}
            <h2>No deliveries yet</h2>
          </div>
        ) : (
          <div className="h-[300px] relative overflow-auto">
            <table className=" w-full ">
              <thead>
                <tr className="bg-black  ">
                  <th className="text-start py-3 px-1.5">Type</th>
                  <th className="text-start py-3 px-1.5">Quantity(Kgs)</th>
                  <th className="text-start py-3 px-1.5">Date submitted</th>
                </tr>
              </thead>
              <tbody className="text-start">
                {farmerInfo?.coffeeDetails?.map((coffeeDetail, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-3 text-center ">
                        {coffeeDetail?.coffee_type}
                      </td>
                      <td className="py-3 text-center ">
                        {coffeeDetail?.quantity}
                      </td>
                      <td className="py-3 text-center">
                        {coffeeDetail?.createdAt}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="p-3 space-y-5">
        <h2>UPLOAD FARMERS COFFEE</h2>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
            <div className="flex flex-col">
              <label>Type of coffee</label>
              {/* <input
                  type="text"
                  className="border p-2 focus:outline-blue rounded"
                /> */}
              <select
                className=" p-2 bg-white border rounded "
                {...register("coffee_type", {
                  required: true,
                })}
                defaultValue=""
              >
                <option value="" disabled hidden>
                  Select type of coffee
                </option>

                <option value="SL_28">SL 28</option>
                <option value="SL_34">SL 34</option>
                <option value="K7">K7</option>
                <option value="ruiru_11">Ruiru 11</option>
                <option value="batian">Batian</option>
              </select>
              {errors?.coffee_type && (
                <p className="text-red"> Type of coffee is required </p>
              )}
            </div>
            <div className="flex flex-col">
              <label>Quantity(kg)</label>
              <input
                type="number"
                className="border p-2 focus:outline-blue rounded"
                {...register("quantity", { required: true })}
              />
              {errors?.quantity && (
                <p className="text-red">Quantity is required</p>
              )}
            </div>
            <div className="flex justify-end space-x-4">
              <span
                onClick={() => closeUploadModal(false)}
                className="bg-gray-200 cursor-pointer hover:bg-gray-300 text-black p-2 rounded"
              >
                Close
              </span>
              <button
                type="submit"
                disabled={buttonLoading ? true : false}
                className={
                  buttonLoading
                    ? "bg-blue opacity-50 text-white p-2 rounded "
                    : "bg-blue  text-white p-2 rounded "
                }
                // className="bg-blue  text-white p-2 rounded-lg"
              >
                {buttonLoading ? (
                  <div className="flex justify-center items-center space-x-2">
                    <div className="border-2 border-r-3  border-r-gray-600 animate-spin rounded-full w-5 h-5"></div>
                    <span>Processing..</span>
                  </div>
                ) : (
                  <div>Upload</div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Upload_form;
const loop = [1, 2, 3, 4, 5];
