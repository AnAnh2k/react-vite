// import axios from "axios";
import axios from "./axios.customize.js";

const updateUserApi = (_id, fullName, phoneNumber) => {
  const URL_BACKEND = `/api/v1/user`;
  const data = {
    _id,
    fullName,
    phone: phoneNumber,
  };
  return axios.put(URL_BACKEND, data);
};

const updateUserAvatarApi = (_id, avatar, fullName, phoneNumber) => {
  const URL_BACKEND = `/api/v1/user`;
  const data = {
    _id: _id,
    avatar: avatar,
    fullName: fullName,
    phone: phoneNumber,
  };
  return axios.put(URL_BACKEND, data);
};

const fetchAllUserApi = (current, pageSize) => {
  const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
  return axios.get(URL_BACKEND);
};

const deleteUserApi = (id) => {
  const URL_BACKEND = `/api/v1/user/${id}`;
  return axios.delete(URL_BACKEND);
};

const handleUploadFile = (file, folder) => {
  const URL_BACKEND = `/api/v1/file/upload`;
  let config = {
    headers: {
      "upload-type": folder,
      "Content-Type": "multipart/form-data",
    },
  };
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", file);

  return axios.post(URL_BACKEND, bodyFormData, config);
};

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

const registerUserApi = (fullName, email, password, phoneNumber) => {
  const URL_BACKEND = `/api/v1/user/register`;
  const data = {
    fullName,
    email,
    password,
    phone: phoneNumber,
  };
  return axios.post(URL_BACKEND, data);
};

const loginUserApi = (email, password) => {
  const URL_BACKEND = `/api/v1/auth/login`;
  const data = {
    username: email,
    password,
    delay: 2000,
  };
  return axios.post(URL_BACKEND, data);
};

export {
  registerUserApi,
  createUserApi,
  updateUserApi,
  fetchAllUserApi,
  deleteUserApi,
  handleUploadFile,
  updateUserAvatarApi,
  loginUserApi,
};
