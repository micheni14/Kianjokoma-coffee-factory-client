import axios from "axios";
import toast from "react-hot-toast";
import * as types from "../Types";
import { authToken, getAllFarmers } from "./auth";
import { getErrors } from "./errors";
const PAYMENT_API = "http://localhost:4000/payment";

// get payable farmers
export const getPayableFarmers = () => async (dispatch) => {
  try {
    const response = await axios.get(`${PAYMENT_API}/payable-farmers`);
    const data = await response.data;
    if (data) {
      dispatch({
        type: types.GET_PAYABLE_FARMERS,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const clearPayableFarmers = () => {
  return {
    type: types.CLEAR_PAYABLE_FARMERS,
  };
};
// make single payment
export const MakeSinglePayment = (farmerId) => async (dispatch) => {
  try {
    const response = await axios.get(`${PAYMENT_API}/pay/${farmerId}`);
    const data = await response.data;
    if (data) {
      dispatch({
        type: types.SINGLE_PAYMENT,
        payload: data,
      });
      toast.success(data.message);
      dispatch(getAccDetails());
      dispatch(getPayableFarmers());
    }
  } catch (error) {
    // dispatch(getErrors(error.response.data.message, types.PAYMENT_FAIL));
    toast.error(error.response.data.message);
    console.log(error);
  }
};
// pay all after approval
export const payAllAfterApproval = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:4000/payment/pay-all",
      authToken()
    );
    const data = await response.data;
    if (data) {
      dispatch({
        type: types.PAY_ALL_APPROVED,
        payload: data,
      });
      toast.success(data.message);
      dispatch(clearPayableFarmers());
      dispatch(getAllFarmers());
      dispatch(getAccDetails());
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
// get all transactions
export const getAllTransactions = () => async (dispatch) => {
  try {
    const response = await axios.get(`${PAYMENT_API}/transactions`);
    const data = await response.data;
    if (data) {
      dispatch({
        type: types.GET_TRANSACTIONS,
        payload: data,
      });
    }
  } catch (error) {
    // console.log(error);
  }
};
// get single transaction
export const getSingleTransaction = (farmerId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${PAYMENT_API}/farmer-transaction/${farmerId}`
    );
    const data = await response.data;
    if (data) {
      dispatch({
        type: types.GET_SINGLE_TRANSACTION,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// get account details
export const getAccDetails = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:4000/account/details");
    const data = response.data;
    if (data) {
      dispatch({
        type: types.GET_ACC_DETAILS,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
// get rejected requests
export const rejectedRequest = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:4000/payment/rejected-requests",
      authToken()
    );
    const data = await response.data;
    if (data) {
      dispatch({
        type: types.GET_REJECTED_REQUESTS,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
