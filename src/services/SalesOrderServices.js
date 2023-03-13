//import CryptoJS from "crypto-js";

import axios from "axios";

import Api from "./Api";


import AppConfigData from "../hooks/AppConfigData";

const createNewSalesOrder = async (
  page_name,
  order_date,
  delivery_date,
  delivery_method,
  order_sub_chargers,
  order_delivery_chargers,
  order_extra_chargers,
  order_remarks,
  customer_id,
  ref_no,
  itemsIn
) => {
  //console.log(" create new Sales Order calling.. by ", page_name);

  var data = {
    order_date: order_date,
    delivery_date: delivery_date,
    delivery_method: delivery_method,
    order_sub_chargers: order_sub_chargers,
    order_delivery_chargers: order_delivery_chargers,
    order_extra_chargers: order_extra_chargers,
    order_remarks: order_remarks,
    customer_id: customer_id,
    ref_no: ref_no,
    itemsIn: itemsIn,

  };

  if (page_name === "user_page") {
    const response = await axios.post(
      AppConfigData.Backend_Url + "/sales/createSalesOrder",
      data
    );

    return response;
  } else {
    const response = Api.post(
      "/sales/createSalesOrder",
      data
    );

    return response;
  }
};


const updateSalesOrder = async (
  page_name,
  order_date,
  delivery_date,
  delivery_method,
  order_sub_chargers,
  order_delivery_chargers,
  order_extra_chargers,
  order_remarks,
  order_id,
  ref_no,
  itemsIn
) => {
  //console.log(" create new Sales Order calling.. by ", page_name);

  var data = {
    order_date: order_date,
    delivery_date: delivery_date,
    delivery_method: delivery_method,
    order_sub_chargers: order_sub_chargers,
    order_delivery_chargers: order_delivery_chargers,
    order_extra_chargers: order_extra_chargers,
    order_remarks: order_remarks,
    order_id: order_id,
    ref_no: ref_no,
    itemsIn: itemsIn,
  };

  if (page_name === "user_page") {
    const response = await axios.post(
      AppConfigData.Backend_Url + "/sales/updateSalesOrder",
      data
    );

    return response;
  } else {
    const response = Api.post("/sales/updateSalesOrder", data);

    return response;
  }
};
//updateSalesOrderStatus

const updateSalesOrderStatus = async (
  page_name,
  order_id,
  order_status,

) => {
  //console.log(" create new Sales Order calling.. by ", page_name);



  var data = {
    order_id: order_id,
    order_status: order_status,
  };

  if (page_name === "user_page") {
    const response = await axios.post(
      AppConfigData.Backend_Url + "/sales/updateSalesOrderStatus",
      data
    );

    return response;
  } else {
    const response = Api.post("/sales/updateSalesOrderStatus", data);

    return response;
  }
};


const deleteSalesOrders = async (page_name, id, restock) => {
  //console.log(" delete Sales order   record Calling... by ", page_name, id);

  var data = { ids: id, restock: restock };

  if (page_name === "user_page") {
    const response = await axios.post(
      AppConfigData.Backend_Url + "/sales/deleteSalesOrdersByIds",
      data
    );

    return response;
  } else {
    const response = Api.post(
      "/sales/deleteSalesOrdersByIds",
      data
    );

    return response;
  }
};


const getSalesList = async (
  page_name,
  page,
  size,
  title,
  startDate,
  endDate,
  orderStatus
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
    orderStatus: orderStatus
  };

  if (page_name === "user_page") {
    const response = await axios.post(
      AppConfigData.Backend_Url + "/sales/getSalesOrderList",
      data
    );

    return response;
  } else {
    const response = Api.post("/sales/getSalesOrderList", data);

    return response;
  }
};


const getSalesById = async (
  page_name,
  id
) => {
  //console.log(" create new Sales Order calling.. by ", page_name);

  var data = {
    page: page_name,
    ids: id
  };

  if (page_name === "user_page") {
    const response = await axios.post(
      AppConfigData.Backend_Url + "/sales/getSalesOrderListSelected",
      data
    );

    return response;
  } else {
    const response = Api.post("/sales/getSalesOrderListSelected", data);

    return response;
  }
};



const exportSalesOrdersTimePeriod = async (
  page_name,

  startTime,
  endTime
) => {
  //console.log(" get production records list Calling... by ", page_name);


  var date = {
    start: startTime,
    end: endTime,
  };
  var data = {
    date: date,
  };

  if (page_name === "user_page") {
    const response = await axios.post(
      AppConfigData.Backend_Url + "/sales/getSalesOrderListDateRange",
      data
    );

    return response;
  } else {
    const response = Api.post(
      "/sales/getSalesOrderListDateRange",
      data
    );

    return response;
  }
};

const getMaxMinStockAvailability = async (
  page_name,
  itemsIn
) => {
  //console.log(" create new Sales Order calling.. by ", page_name);

  var data = {
    itemsIn
  };

  if (page_name === "user_page") {
    const response = await axios.post(
      AppConfigData.Backend_Url + "/plyWoodTypes/getMaxMinStockAvailability",
      data
    );

    return response;
  } else {
    const response = Api.post("/plyWoodTypes/getMaxMinStockAvailability", data);

    return response;
  }
};


//SalesOrderServices
const SalesOrderServices = {
  createNewSalesOrder,
  updateSalesOrder,
  updateSalesOrderStatus,
  deleteSalesOrders,
  getSalesList,
  getSalesById,
  exportSalesOrdersTimePeriod,
  getMaxMinStockAvailability
};

export default SalesOrderServices;