import AppConfigData from "../hooks/AppConfigData";
import axios from "axios";
import Api from "./Api";



const getLogsList = async (
    page_name,
    page,
    size,
    title,
    startDate,
    endDate
  ) => {
    //console.log(" create new Sales Order calling.. by ", page_name);
  
    var date = {
      start: startDate,
      end: endDate,
    };
  
    var data = {
      page: page,
      size: size,
      title: title,
      date: date,
    };
  
    if (page_name === "user_page") {
      const response = await axios.post(
        AppConfigData.Backend_Url + "/activities/getListActivities",
        data
      );
  
      return response;
    } else {
      const response = Api.post("/activities/getListActivities", data);
  
      return response;
    }
  };

  
const createLog = async (page_name, user_name, action_name, action_status) => {
  
    var data = { page_name: page_name, user_name: user_name, action_name: action_name, action_status: action_status };

    console.log(data)
  
    if (page_name === "user_page") {
      const response = await axios.post(
        AppConfigData.Backend_Url + "/activities/createNewActivityLog",
        data
      );
  
      return response;
    } else {
      const response = Api.post("/activities/createNewActivityLog", data);
  
      return response;
    }
  };
  




const ActivityLogsService = {
    getLogsList,
    createLog
};

export default ActivityLogsService;