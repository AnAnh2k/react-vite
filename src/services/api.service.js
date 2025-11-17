// import axios from "axios";
import axios from "./axios.customize.js";

const createUserApi = (fullName, email, password, phoneNumber) => {
  const URL_BACKEND = `/api/v1/user`;
  const data = {
    fullName,
    email,
    password,
    phone: phoneNumber,
  };
  return axios.post(URL_BACKEND, data);
};

const updateUserApi = () => {};

const fetchAllUserApi = () => {
  const URL_BACKEND = `/api/v1/user`;
  return axios.get(URL_BACKEND);
};

export { createUserApi, updateUserApi, fetchAllUserApi };
