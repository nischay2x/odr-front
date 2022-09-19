import axios from "axios";
import { baseUrl } from "../config/api-config";

const base = `${baseUrl}/auth`;

export function fetchTokenUser(token) {
  return axios.get(base + "/user", {
    headers: {
      Authorization: token
    }
  });
}

export function emailLogin(email, password) {
  return axios.post(base + "/login", { email, password });
}

export function forgetPassword(email) {
  return axios.post(base + "/forget-password", { email });
}

export function resetPassword(email, otp, newPassword) {
  return axios.post(base + "/reset-password", { email, otp, newPassword });
}
