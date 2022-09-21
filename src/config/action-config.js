import { errorAlert } from "../actions/alert.js";

export const auth = {
  SUSPENSE: "SUSPENSE",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_FAILURE: "FETCH_FAILURE",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  UPDATE_SUCCESS: "UPDATE_SUCCESS",
  LOGOUT: "LOGOUT"
};

export const alertActions = {
  SHOW: "SHOW",
  HIDE: "HIDE",
  ERROR: "ERROR"
};

export const projects = {
  LIST: "LIST"
};

export function handleAxiosError(error, dispatch) {
  const res = error.response?.data;
  if (dispatch) {
    dispatch(errorAlert(res?.error || error.message));
  } else {
    alert(res?.error || error.message);
  }
}
