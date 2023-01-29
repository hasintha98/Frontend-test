

import axios from "axios";

import Api from "./Api";


import AppConfigData from "../hooks/AppConfigData";

const getAllUsersInfo = async (page_name, page, size, title) => {
  //console.log(" get production records list Calling... by ", page_name);

  var data = {
    page: page,
    size: size,
    title: title,
  };

  if (page_name === "user_page") {
    const response = await axios.post(
      AppConfigData.Backend_Url + "/user/getUsersListInfo",
      data
    );

    return response;
  } else {
    const response = Api.post("/user/getUsersListInfo", data);

    return response;
  }
};

const createUsersInfo = async (
  page_name,
  name,
  email,
  password,
  roles,
  active
) => {
  //console.log(" create new users  Calling... by ", page_name);

  var data = {
    name: name,
    email: email,
    password: password,
    roles: roles,
    active: active,
  };

  if (page_name === "user_page") {
    const response = await axios.post(
      AppConfigData.Backend_Url + "/auth/signUp",
      data
    );

    return response;
  } else {
    const response = Api.post("/auth/signUp", data);

    return response;
  }
};

const updateUsersInfo = async (
  page_name,
  id,
  name,
  email,
  password,
  roles,
  active
) => {
  //console.log(" create new users  Calling... by ", page_name);

  var data = {
    id: id,
    name: name,
    email: email,
    password: password,
    roles: roles,
    active: active,
  };

  if (page_name === "user_page") {
    const response = await axios.post(
      AppConfigData.Backend_Url + "/user/updateUser",
      data
    );

    return response;
  } else {
    const response = Api.post("/user/updateUser", data);

    return response;
  }
};

const deleteUsersInfo = async (page_name, ids) => {
  //console.log(" delete User  list Calling... by ", page_name);

  var data = {
    ids: ids,
  };

  if (page_name === "user_page") {
    const response = await axios.post(
      AppConfigData.Backend_Url + "/user/deleteUser",
      data
    );

    return response;
  } else {
    const response = Api.post("/user/deleteUser", data);

    return response;
  }
};

const modAdminAuthPin = async (page_roles, pin) => {
  var data = { page_authorities: page_roles, pin: pin };

  // const response = await axios.post(
  //   AppConfigData.Backend_Url + "/auth/authPinCode",
  //   data
  // );

  //console.log(" response update from auth ->", response);
  //return response;



    const response = Api.post("/auth/authPinCode", data);

    return response;
  

};

const updatePinCodesInfo = async (page_name, pinProfile) => {
  //console.log(" delete User  list Calling... by ", page_name);

  var data = {
    pinProfile: pinProfile,
  };

  if (page_name === "user_page") {
    const response = await axios.post(
      AppConfigData.Backend_Url + "/auth/updatePinCodes",
      data
    );

    return response;
  } else {
    const response = Api.post("/user/updatePinCodes", data);

    return response;
  }
};

//!======================

const UserService = {
  modAdminAuthPin,

  //!===
  getAllUsersInfo,
  createUsersInfo,
  updateUsersInfo,
  deleteUsersInfo,
  updatePinCodesInfo,
};

export default UserService;
