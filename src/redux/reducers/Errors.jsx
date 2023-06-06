import * as types from "../Types";
const initialState = {
  msg: null,
};

export const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ERRORS:
      return {
        ...state,
        msg: action.payload,
      };
    case types.CLEAR_ERRORS:
      return {
        ...state,
        msg: null,
      };

    default:
      return state;
  }
};
