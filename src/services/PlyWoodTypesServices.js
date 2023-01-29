//import CryptoJS from "crypto-js";

import axios from "axios";

import Api from "./Api";


import AppConfigData from "../hooks/AppConfigData";


const createNewPlyWoodTypeRecord = async (
  page_name,
  size,
  type,
  stock,
  limit,
  profile
) => {
  //console.log(" update ply wood types Calling... by ", page_name, profile);

  var data = {
    size: size,
    type: type,
    stock: stock,
    limit: limit,
    profile: profile,
  };

  if (page_name === "user_page") {
    const response = await axios.post(
      AppConfigData.Backend_Url + "/plyWoodTypes/createPlyWoodType",
      data
    );

    return response;
  } else {
    const response = Api.post("/plyWoodTypes/createPlyWoodType", data);

    return response;
  }
};



const getPlyWoodTypesList = async (
  page_name,
  page,
  size,
  title_fil_type,
  title_fil_size
) => {
  //console.log(" get ply wood types list Calling... by ", page_name);

  var data = {
    page: page,
    size: size,
    title_fil_type: title_fil_type,
    title_fil_size: title_fil_size,
  };

  if (page_name === "user_page") {
    const response = await axios.post(
      AppConfigData.Backend_Url + "/plyWoodTypes/getPlyWoodTypeListInfo",
      data
    );

    return response;
  } else {
    const response = Api.post("/plyWoodTypes/getPlyWoodTypeListInfo", data);

    return response;
  }
};



const updatePlyWoodTypeRecord = async (
  page_name,
  id,
  size,
  type,
  stock,
  limit,
  active,
  profile
) => {
  //console.log(" update ply wood types Calling... by ", page_name, profile);

  var data = {
    id:id,
    size: size,
    type: type,
    stock: stock,
    limit: limit,
    active:active,
    profile: profile,
  };

  if (page_name === "user_page") {
    const response = await axios.post(
      "http://localhost:3000/api/plyWoodTypes/updatePlyWoodType",
      data
    );

    return response;
  } else {
    const response = Api.post("/plyWoodTypes/updatePlyWoodType", data);

    return response;
  }
};


const addStockPlyWoodTypeRecord = async (
  page_name,
  id,
  stock,

) => {
  

  var data = {
    id: id,
    stock: stock,
  };

  console.log(data)

  //console.log(" add stock ply wood types Calling... by ", page_name ,data);

  if (page_name === "user_page") {
    const response = await axios.post(
      "http://localhost:5000/api/plyWoodTypes/addStockPlyWoodType",
      data
    );

    return response;
  } else {
    const response = Api.post("/plyWoodTypes/addStockPlyWoodType", data);

    return response;
  }
};



const deletePlyWoodTypesRecord = async (page_name, id) => {
  //console.log(" delete ply wood   record Calling... by ", page_name, id);

  var data = { ids: id };

  if (page_name === "user_page") {
    const response = await axios.post(
      "http://localhost:3000/api/plyWoodTypes/deletePlyWoodTypeByIdS",
      data
    );

    return response;
  } else {
    const response = Api.post("/plyWoodTypes/deletePlyWoodTypeByIdS", data);

    return response;
  }
};


//getPlyWoodTypeListAll

const getPlyWoodTypesListAll = async (page_name, role) => {
  //console.log(" get All ply wood types list Calling... by ", page_name, role);

  var data = { role: role };

  //console.log({data})

  if (page_name === "user_page") {
    const response = await axios.post(
      AppConfigData.Backend_Url + "/plyWoodTypes/getPlyWoodTypeListAll",
      data
    );

    return response;
  } else {
    const response = Api.post("/plyWoodTypes/getPlyWoodTypeListAll", data);

    return response;
  }
};



const getPlyWoodTypeListExport = async (page_name, role) => {
  //console.log(" get All ply wood types list Calling... by ", page_name, role);

  var data = { role: role };

  //console.log({ data });

  if (page_name === "user_page") {
    const response = await axios.post(
      "http://localhost:3000/api/plyWoodTypes/getPlyWoodTypeListExport",
      data
    );

    return response;
  } else {
    const response = Api.post("/plyWoodTypes/getPlyWoodTypeListExport", data);

    return response;
  }
};



const PlyWoodTypesServices = {
  getPlyWoodTypesListAll,
  getPlyWoodTypesList,
  createNewPlyWoodTypeRecord,
  updatePlyWoodTypeRecord,
  addStockPlyWoodTypeRecord,
  deletePlyWoodTypesRecord,
  getPlyWoodTypeListExport,
};

export default PlyWoodTypesServices;