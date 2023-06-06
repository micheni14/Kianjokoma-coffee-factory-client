import * as types from "../Types";

export const getErrors = (msg, typeId) => {
  return {
    type: types.GET_ERRORS,
    payload: {
      msg,
      typeId,
    },
  };
};
export const clearErrors = () => {
  return {
    type: types.CLEAR_ERRORS,
    // payload: {
    //   msg: null,
    //   typeId: null,
    // },
  };
};
export const loginFail = () => {
  return {
    type: types.LOGIN_FAIL,
  };
};
export const registerFail = () => {
  return {
    type: types.REGISTER_FAIL,
  };
};

export const coffeeUploadFail = () => {
  return {
    type: types.COFFEE_UPLOAD_FAIL,
  };
};
export const searchUserFail = () => {
  return {
    type: types.SEARCH_USER_FAIL,
  };
};
