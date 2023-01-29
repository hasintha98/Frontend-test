//import CryptoJS from "crypto-js";

import axios from "axios";

import Api from "./Api";

import AppConfigData from "../hooks/AppConfigData";

const createNewCustomerRecord = async (
  page_name,
  name,
  email,
  address,
  phone
) => {
  //console.log(" update ply wood types Calling... by ", page_name);

  var data = {
    name: name,
    emailNew: email,
    address: address,
    phone: phone,

  };

  if (page_name === "user_page") {
    const response = await axios.post(
      AppConfigData.Backend_Url + "/customer/createCustomer",
      data
    );

    return response;
  } else {
    const response = Api.post("/customer/createCustomer", data);

    return response;
  }
};


const updateCustomerRecord = async (
  page_name,
  id,
  name,
  email,
  address,
  phone
) => {
  //console.log(" update ply wood types Calling... by ", page_name);

  var data = {
    id:id,
    name: name,
    emailNew: email,
    address: address,
    phone: phone,
  };

  if (page_name === "user_page") {
    const response = await axios.post(
      AppConfigData.Backend_Url + "/customer/updateCustomer",
      data
    );

    return response;
  } else {
    const response = Api.post("/customer/updateCustomer", data);

    return response;
  }
};


const getAllCustomersInfo = async (
  page_name,
  page,
  size,
  title,

) => {
  //console.log(" get production records list Calling... by ", page_name);

  var data = {
    page: page,
    size: size,
    title: title,

  };

  if (page_name === "user_page") {
    const response = await axios.post(
      AppConfigData.Backend_Url + "/customer/getCustomerList",
      data
    );

    return response;
  } else {
    const response = Api.post("/customer/getCustomerList", data);

    return response;
  }
};

const deleteCustomerRecord = async (page_name, ids,) => {
  //console.log(" get production records list Calling... by ", page_name);

  var data = {
    ids: ids,
  };

  if (page_name === "user_page") {
    const response = await axios.post(
      AppConfigData.Backend_Url + "/customer/deleteCustomerByIds",
      data
    );

    return response;
  } else {
    const response = Api.post("/customer/deleteCustomerByIds", data);

    return response;
  }
};

const CustomersServices = {
  createNewCustomerRecord,
  updateCustomerRecord,
  getAllCustomersInfo,
  deleteCustomerRecord,
};

export default CustomersServices;