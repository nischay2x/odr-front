import { auth } from "../config/action-config";

let tempUserData = {
  id: 1,
  uid: "US2321",
  email: "some@random.com",
  phone: "2565154878",
  firstname: "some",
  lastname: "smith",
  address: "5230, Newell Road",
  address2: "Palo Alto",
  city: "Palo Alto",
  state: "CA",
  country: "USA"
}

const initialUser = { isLoggedIn: true, suspense: false, err: "", data: tempUserData };

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
