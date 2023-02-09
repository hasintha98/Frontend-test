import AppConfigData from "../hooks/AppConfigData";
import axios from "axios";
import Api from "./Api";



const getPermissionList = async (page_name) => {
    //console.log(" create new Sales Order calling.. by ", page_name);
    if (page_name === "user_page") {
      const response = await axios.post(
        AppConfigData.Backend_Url + "/pageaccess/getAllPageAccess"
      );
  
      return response;
    } else {
      const response = Api.post("/pageaccess/getAllPageAccess");
  
      return response;
    }
  };

  
  const updatePermissions = async (
    page_name,
    page_pin,
    create_admin,
    create_mod,
    edit_admin,
    edit_mod,
    update_admin,
    update_mod,
    delete_admin,
    delete_mod,
    users_added,
  ) => {

    const data = {
        page_name,
        page_pin,
        create_admin,
        create_mod,
        edit_admin,
        edit_mod,
        update_admin,
        update_mod,
        delete_admin,
        delete_mod,
        users_added,
    }

    console.log(data)

    if (page_name === "user_page") {
      const response = await axios.post(
        AppConfigData.Backend_Url + "/pageaccess/updatePageAccess", data
      );
  
      return response;
    } else {
      const response = Api.post("/pageaccess/updatePageAccess", data);
  
      return response;
    }
  };

  
  const pagePinCodeAuth = async (
    user_name, page_name, pin
  ) => {

    const data = {
      user_name, page_name, pin
    }

    if (page_name === "user_page") {
      const response = await axios.post(
        AppConfigData.Backend_Url + "/pageaccess/pagePinCodeAccess", data
      );
  
      return response;
    } else {
      const response = Api.post("/pageaccess/pagePinCodeAccess", data);
  
      return response;
    }
  };

  const actionPinCodeAuth = async (
    page_authorities, pin
  ) => {

    const data = {
      page_authorities, pin
    }
      const response = Api.post("/auth/authPinCode", data);
  
      return response;
    
  };



const PermissionsService = {
    getPermissionList,
    updatePermissions,
    pagePinCodeAuth,
    actionPinCodeAuth
};

export default PermissionsService;