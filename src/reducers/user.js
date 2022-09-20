import { auth } from "../config/action-config";

const initialUser = { isLoggedIn: true, suspense: false, err: "", data: {} };

const userReducer = (user = initialUser, action) => {
  const { payload, type } = action;
  switch (type) {
    case auth.SUSPENSE:
      return { ...user, suspense: true };

    case auth.FETCH_SUCCESS:
      return { ...user, isLoggedIn: true, suspense: false, data: payload };

    case auth.FETCH_FAILURE:
      return {
        isLoggedIn: false,
        suspense: false,
        err: payload.message,
        data: {}
      };

    case auth.LOGIN_SUCCESS:
      return { data: payload, isLoggedIn: true, suspense: false, err: "" };

    case auth.LOGIN_FAILURE:
      return {
        isLoggedIn: false,
        suspense: false,
        err: payload.message,
        data: {}
      };

    case auth.LOGOUT:
      return initialUser;

    default:
      return user;
  }
};

export default userReducer;
