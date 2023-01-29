//import CryptoJS from "crypto-js";

import axios from "axios";

import Api from "./Api";


import AppConfigData from "../hooks/AppConfigData";

//!==== NEW APIs FOR PRODUCTION

const getRawMaterialListAll = async (page_name, role) => {
  //console.log(" get raw material list All  Calling... by ", page_name, role);

  var data = { role:role };

  if (page_name === "user_page") {
    const response = await axios.post(
      AppConfigData.Backend_Url + "/rawMaterials/getRawMaterialListAll",
      data
    );

    return response;
  } else {
    const response = Api.post("/rawMaterials/getRawMaterialListAll", data);

    return response;
  }
};

const getRawMaterialList = async (page_name, page, size, title) => {
  //console.log(" get raw material list Calling... by ", page_name);


  var data = { page: page, size: size, title: title };

  if (page_name === "user_page") {
    const response = await axios.post(
      AppConfigData.Backend_Url + "/rawMaterials/getRawMaterialList",
      data
    );

    return response;
  } else {
    const response = Api.post(
      "/rawMaterials/getRawMaterialList",
      data
    );

    return response;
  }
};

const createNewRawMaterialRecord = async (page_name, type, stock, limit) => {
  //console.log(" new raw material  record Calling... by ", page_name);

  
  //console.log(typeof stock);

  var data = { stock: stock, type: type, limit: limit };

  if (page_name === "user_page") {
    const response = await axios.post(
      AppConfigData.Backend_Url + "/rawMaterials/createRawMaterial",
      data
    );

    return response;
  } else {
    const response = Api.post("/rawMaterials/createRawMaterial", data);

    return response;
  }
};


const updateRawMaterialRecord = async (page_name, id ,type, stock, limit) => {
  //console.log(" update material  record Calling... by ", page_name);

  var data = { id: id, stock: stock, type: type, limit: limit };

  if (page_name === "user_page") {
    const response = await axios.post(
      AppConfigData.Backend_Url + "/rawMaterials/updateRawMaterial",
      data
    );

    return response;
  } else {
    const response = Api.post("/rawMaterials/updateRawMaterial", data);

    return response;
  }
};


const addRawMaterialRecord = async (page_name, id, stock, date, inOutNew) => {
  //console.log(" add material  record Calling... by ", page_name);

  var data = { id: id, stock: stock, date: date, inOutNew: inOutNew };

  if (page_name === "user_page") {
    const response = await axios.post(
      AppConfigData.Backend_Url + "/rawMaterials/addStockRawMaterial",
      data
    );

    return response;
  } else {
    const response = Api.post("/rawMaterials/addStockRawMaterial", data);

    return response;
  }
};



const deleteRawMaterialRecord = async (page_name, id) => {
  //console.log(" delete material  record Calling... by ", page_name , id);

  var data = { ids: id };


  if (page_name === "user_page") {
    const response = await axios.post(
      AppConfigData.Backend_Url + "/rawMaterials/deleteRawMaterialByIds",
      data
    );

    return response;
  } else {
    const response = Api.post("/rawMaterials/deleteRawMaterialByIds", data);

    return response;
  }
};



const getRawMatsRecordsDataInfo = async (
  page_name,
  page,
  size,
  title_fil_type,

  startTime,
  endTime
) => {
  //console.log(" get production records list Calling... by ", page_name);

  var data = {
    page: page,
    size: size,
    title_fil_type: title_fil_type,
    startTime: startTime,
    endTime: endTime,
  };

  if (page_name === "user_page") {
    const response = await axios.post(
      "http://localhost:3000/api/rawMaterials/getRawMatsRecordsDataInfo",
      data
    );

    return response;
  } else {
    const response = Api.post("/rawMaterials/getRawMatsRecordsDataInfo", data);

    return response;
  }
};





const RawMaterialService = {
  getRawMaterialListAll,
  getRawMaterialList,
  createNewRawMaterialRecord,
  updateRawMaterialRecord,
  addRawMaterialRecord,
  deleteRawMaterialRecord,
  getRawMatsRecordsDataInfo,
};

export default RawMaterialService;
