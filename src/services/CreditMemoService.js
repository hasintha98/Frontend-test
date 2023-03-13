import AppConfigData from "../hooks/AppConfigData";
import axios from "axios";
import Api from "./Api";

const createNewCreditMemo = async (
  page_name,
  order_id,
  invoiced_returned_date,
  invoice_returned_status,
  invoice_returned_remarks,
  invoice_returned_sub_total,
  invoice_returned_adj_refunded,
  invoice_returned_balance_total,
  ref_no,
  itemsIn,
) => {
  //console.log(" create new Sales Order calling.. by ", page_name);

  var data = {
    order_id: order_id,
    invoiced_returned_date: invoiced_returned_date,
    invoice_returned_status: invoice_returned_status,
    invoice_returned_remarks: invoice_returned_remarks,
    invoice_returned_sub_total: invoice_returned_sub_total,
    invoice_returned_adj_refunded: invoice_returned_adj_refunded,
    invoice_returned_balance_total: invoice_returned_balance_total,
    ref_no: ref_no,
    itemsIn: itemsIn,
  };

  if (page_name === "user_page") {
    const response = await axios.post(
      AppConfigData.Backend_Url + "/newInvoice/createMemoInvoice",
      data
    );

    return response;
  } else {
    const response = Api.post(
      "/newInvoice/createMemoInvoice",
      data
    );

    return response;
  }
};


const getMemoList = async (
  page_name,
  page,
  size,
  title,
  startDate,
  endDate,
  invoice_returned_status
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
    invoice_returned_status: invoice_returned_status
  };

  if (page_name === "user_page") {
    const response = await axios.post(
      AppConfigData.Backend_Url + "/newInvoice/getListReturnInvoices",
      data
    );

    return response;
  } else {
    const response = Api.post("/newInvoice/getListReturnInvoices", data);

    return response;
  }
};


const updateMemoByStatus = async (
  page_name,
  order_id,
  ret_invoice_id,
  invoice_returned_status
) => {
  //console.log(" create new Sales Order calling.. by ", page_name);

  var data = {
    order_id: order_id,
    ret_invoice_id: ret_invoice_id,
    invoice_returned_status: invoice_returned_status
  };

  if (page_name === "user_page") {
    const response = await axios.post(
      AppConfigData.Backend_Url + "/newInvoice/updateReturnInvoiceStatus",
      data
    );

    return response;
  } else {
    const response = Api.post("/newInvoice/updateReturnInvoiceStatus", data);

    return response;
  }
};



const CreditMemoServices = {
  createNewCreditMemo,
  getMemoList,
  updateMemoByStatus
};

export default CreditMemoServices;