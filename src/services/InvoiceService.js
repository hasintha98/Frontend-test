import Api from "./Api";


import AppConfigData from "../hooks/AppConfigData";
import axios from "axios";

const createNewInvoice = async (
  page_name,
  order_id,
  invoiced_date,
  invoice_remarks,
  invoice_sub_chargers,
  invoice_delivery_chargers,
  invoice_grand_total,
  ref_no,
  itemsIn,
) => {
  //console.log(" create new Sales Order calling.. by ", page_name);

  var data = {
    order_id: order_id,
    invoiced_date: invoiced_date,
    invoice_remarks: invoice_remarks,
    invoice_sub_chargers: invoice_sub_chargers,
    invoice_delivery_chargers: invoice_delivery_chargers,
    invoice_grand_total: invoice_grand_total,
    ref_no: ref_no,
    itemsIn: itemsIn,

  };

  if (page_name === "user_page") {
    const response = await axios.post(
      AppConfigData.Backend_Url + "/newInvoice/createNewInvoice",
      data
    );

    return response;
  } else {
    const response = Api.post(
      "/newInvoice/createNewInvoice",
      data
    );

    return response;
  }
};


const getInvoicesList = async (
  page_name,
  page,
  size,
  title,
  startDate,
  endDate,
  invoice_status
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
    date: "",
    invoice_status: invoice_status
  };

  if (page_name === "user_page") {
    const response = await axios.post(
      AppConfigData.Backend_Url + "/newInvoice/getListInvoices",
      data
    );

    return response;
  } else {
    const response = Api.post("/newInvoice/getListInvoices", data);

    return response;
  }
};

const updateInvoiceByStatus = async (
  page_name,
  order_id,
  invoice_id,
  invoice_status
) => {
  //console.log(" create new Sales Order calling.. by ", page_name);

  var data = {
    order_id: order_id,
    invoice_id: invoice_id,
    invoice_status: invoice_status
  };

  if (page_name === "user_page") {
    const response = await axios.post(
      AppConfigData.Backend_Url + "/newInvoice/updateInvoiceStatus",
      data
    );

    return response;
  } else {
    const response = Api.post("/newInvoice/updateInvoiceStatus", data);

    return response;
  }
};


const InvoiceServices = {
  createNewInvoice,
  getInvoicesList,
  updateInvoiceByStatus
};

export default InvoiceServices;