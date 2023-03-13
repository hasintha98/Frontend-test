import AppConfigData from "../hooks/AppConfigData";
import axios from "axios";
import Api from "./Api";
const createNewShipment = async (
    page_name,
    order_id,
    shipment_date,
    shipment_to_name,
    shipment_to_phone,
    shipment_to_address,
    shipment_remarks,
    shipment_chargers,
    ref_no,
    itemsIn,
) => {
    //console.log(" create new Sales Order calling.. by ", page_name);

    var data = {
        order_id: order_id,
        shipment_date: shipment_date,
        shipment_to_name: shipment_to_name,
        shipment_to_phone: shipment_to_phone,
        shipment_to_address: shipment_to_address,
        shipment_remarks: shipment_remarks,
        shipment_chargers: shipment_chargers,
        ref_no: ref_no,
        itemsIn: itemsIn,
    };

    if (page_name === "user_page") {
        const response = await axios.post(
            AppConfigData.Backend_Url + "/newInvoice/createShipmentInvoice",
            data
        );

        return response;
    } else {
        const response = Api.post(
            "/newInvoice/createShipmentInvoice",
            data
        );

        return response;
    }
};


const getShipmentList = async (
    page_name,
    page,
    size,
    title,
    startDate,
    endDate,
    shipment_status
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
      shipment_status: shipment_status
    };
  
    if (page_name === "user_page") {
      const response = await axios.post(
        AppConfigData.Backend_Url + "/newInvoice/getListShipmentInvoices",
        data
      );
  
      return response;
    } else {
      const response = Api.post("/newInvoice/getListShipmentInvoices", data);
  
      return response;
    }
  };

const ShipmentServices = {
    createNewShipment,
    getShipmentList
};

export default ShipmentServices;