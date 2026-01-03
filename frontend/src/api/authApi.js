import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000", // adjust if needed
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginNumberVerify = (phone) => {
  return API.post("api/auth/login-number-verify", { phone });
};

export const loginOtpVerify = (phone, otp) => {
  return API.post("api/auth/login-otp-verify", { phone, otp });
};
