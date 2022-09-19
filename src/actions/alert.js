import { alertActions as actionTypes } from "../config/action-config.js";

export const showAlert = (message, onClose) => async (dispatch) => {
  dispatch({ type: actionTypes.SHOW, payload: { message, onClose } });
};

export const errorAlert = (message, onClose) => async (dispatch) => {
  dispatch({ type: actionTypes.ERROR, payload: { message, onClose } });
};

export const hideAlert = () => async (dispatch) => {
  dispatch({ type: actionTypes.HIDE });
};
