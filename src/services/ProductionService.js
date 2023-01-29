//import CryptoJS from "crypto-js";

import axios from "axios";

import Api from "./Api";


import AppConfigData from "../hooks/AppConfigData";

//!==== NEW APIs FOR PRODUCTION

const getLastProductionRecord = async (page_name, role) => {
  //console.log(" new production record Calling... by ", page_name);

  var data = { role: role };

  if (page_name === "user_page") {
    const response = await axios.post(
      AppConfigData.Backend_Url + "/productionPlyWood/getPlyWoodProductionInfoLast",
      data
    );

    return response;
  } else {
    const response = Api.post(
      "/productionPlyWood/getPlyWoodProductionInfoLast",
      data
    );

    return response;
  }
};

const createNewProductionRecord = async (page_name, date, size, type, qty) => {
  //console.log(" new production record Calling... by ", page_name);

  var data = { date: date, size: size, type: type, qty: qty };
  console.log(data)
  // if (page_name !== "user_page") {
    const response = await axios.post(
      AppConfigData.Backend_Url + "/productionPlyWood/createPlyWoodProduction",
      data
    );

    return response;
  // } else {
  //   const response = Api.post(
  //     "/productionPlyWood/createPlyWoodProduction",
  //     data
  //   );

  //   return response;
  // }
};



const updateProductionRecord = async (page_name,id, date, size, type, qty ,restock) => {
  //console.log(" update production record Calling... by ", page_name);

  var data = {
    id: id,
    date: date,
    size: size,
    type: type,
    qty: qty,
    restock: restock,
  };

 if (page_name === "user_page") {
  const response = await axios.post(
    "http://localhost:3000/api/productionPlyWood/updatePlyWoodProduction",
    data
  );

  return response;
  } else {
    const response = Api.post(
      "/productionPlyWood/updatePlyWoodProduction",
      data
    );

    return response;
  }
};


const deleteProductionRecord = async (page_name, id, restock) => {
  //console.log(" delete Production   record Calling... by ", page_name, id);

  var data = { ids: id, restock: restock };

  if (page_name === "user_page") {
    const response = await axios.post(
      "http://localhost:3000/api/productionPlyWood/deletePlyWoodProductionByIds",
      data
    );

    return response;
  } else {
    const response = Api.post("/productionPlyWood/deletePlyWoodProductionByIds", data);

    return response;
  }
};


const getAllProductionRecordsList = async (
  page_name,
  page,
  size,
  title_fil_type,
  title_fil_size,
  startTime,
  endTime
) => {
  //console.log(" get production records list Calling... by ", page_name);

  var data = {
    page: page,
    size: size,
    title_fil_type: title_fil_type,
    title_fil_size: title_fil_size,
    startTime: startTime,
    endTime: endTime,
  };

  console.log(data)

  if (page_name === "user_page") {
    const response = await axios.post(
      "http://localhost:5000/api/productionPlyWood/getPlyWoodProductionListInfo",
      data
    );

    return response;
  } else {
    const response = Api.post(
      "/productionPlyWood/getPlyWoodProductionListInfo",
      data
    );

    return response;
  }
};



const exportProductionsTimePeriod = async (
  page_name,

  startTime,
  endTime
) => {
  //console.log(" get production records list Calling... by ", page_name);

  var data = {
    startTime: startTime,
    endTime: endTime,
  };

  if (page_name === "user_page") {
    const response = await axios.post(
      "http://localhost:3000/api/productionPlyWood/getPlyWoodProductionListInfoExport",
      data
    );

    return response;
  } else {
    const response = Api.post(
      "/productionPlyWood/getPlyWoodProductionListInfoExport",
      data
    );

    return response;
  }
};



const ProductionService = {
  createNewProductionRecord,
  updateProductionRecord,
  deleteProductionRecord,
  getLastProductionRecord,
  getAllProductionRecordsList,
  exportProductionsTimePeriod,
};

export default ProductionService;
