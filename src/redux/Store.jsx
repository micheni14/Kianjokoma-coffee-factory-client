import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./reducers/Auth";
import { errorReducer } from "./reducers/Errors";
import { paymentReducer } from "./reducers/payment";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    errors: errorReducer,
    payment: paymentReducer,
  },
});
