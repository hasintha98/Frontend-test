//import CryptoJS from "crypto-js";

import axios from "axios";

import Api from "./Api";

import AppConfigData from "../hooks/AppConfigData";

const getDashBoardInfo = async (page_name, role, startTime, endTime) => {
  //console.log(" get production records list Calling... by ", page_name);

  var data = {
    role: role,
    startTime: startTime,
    endTime: endTime,
  };

  if (page_name === "user_page") {
    const response = await axios.post(
      AppConfigData.Backend_Url +"/summary/getDashBoardData",
      data
    );

    return response;
  } else {
    const response = Api.post(
      "/summary/getDashBoardData",
      data
    );

    return response;
  }
};

const DashBoardServices = {
  getDashBoardInfo,
};

export default DashBoardServices;
