import * as types from "../Types";
const initialState = {
  isAuthenticated: !!localStorage.getItem("userToken"),
  msg: null,
  loading: true,
  farmers: null,
  farmer: null,
  user: null,
  staff: null,
  current_user: null,
  updateLoading: true,
  isSucessful: false,
  search_result: null,
};
export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTER_SUCCESS:
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        msg: action.msg,
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };
    case types.AUTH_USER:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        current_user: action.payload,
      };

    case types.GET_ALL_FARMERS:
      return {
        ...state,
        loading: false,
        farmers: action.payload,
      };
    case types.GET_ALL_STAFFS:
      return {
        ...state,
        loading: false,
        staff: action.payload,
      };
    case types.GET_SPECIFIC_FARMER:
      return {
        ...state,
        loading: false,
        farmer: action.payload,
      };
    case types.UPDATE_USER:
    case types.DELETE_USER:
    case types.COFFEE_UPLOAD:
      return {
        ...state,
        msg: action.payload,
      };
    case types.CLEAR_SUCCESS_MSG:
      return {
        ...state,
        msg: null,
      };
    case types.SEARCH_USER:
      return {
        ...state,
        search_result: action.payload,
      };
    case types.CLEAR_USER_SEARCH:
      return {
        ...state,
        search_result: null,
      };
    default:
      return state;
  }
};
