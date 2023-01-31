import { CButton, CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CFormCheck, CFormInput, CFormSelect, CInputGroup, CInputGroupText, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DateRangePicker } from 'rsuite'
import ExportModel from 'src/components/Models/ExportModel'
import RecordDeleteModel from 'src/components/Models/RecordDeleteModel'
import { predefinedRanges } from 'src/data/preDefinedDateRanges'
import 'rsuite/styles/index.less'; // or 'rsuite/dist/rsuite.min.css'
import "rsuite/dist/rsuite.min.css"
import SendEmailModel from 'src/components/Models/SendEmailModel'
import InvoiceServices from 'src/services/InvoiceService'
import moment from 'moment'

const Invoices = () => {
    const [visible, setVisible] = useState(false)
    const [deleteVisible, setDeleteVisible] = useState(false)

    const [invoiceList, setInvoiceList] = useState([]);

    const invoiceListRef = useRef();

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const pageSizes = [10, 25, 50];

    invoiceListRef.current = invoiceListRef;

    const [isInvoiceList, setIsInvoiceListState] = useState(false);
    const [isCheckingApi, setCheckingApi] = useState(false);

    const [searchTitle_Type, setSearchTitle_Type] = useState("");

    const [updateOnRefReshPage, setUpdateOnRefreshPage] = useState(0);

    useEffect(() => {
        retrieveInvoiceList()
    }, [page, pageSize, updateOnRefReshPage])

    const onChangeSearchTitle_Type = (e) => {
        const searchTitle = e.target.value;
        setSearchTitle_Type(searchTitle);

        var isSearchEmpty = searchTitle.trim().length ? false : true;

        if (isSearchEmpty) {
            setPage(1);
            //retrievePlyWoodProductionList();
            setUpdateOnRefreshPage(Math.random());

            ////console.log("Search is empty type ...!! ");
        }

        ////console.log("Search input changing type -> ", searchTitle);
    };

    const findByTitle = () => {
        setPage(1);
        retrieveInvoiceList();
    };

    const getRequestParams = (searchTitle_Type, page, pageSize) => {
        let params = {};

        if (searchTitle_Type) {
            params["title_type"] = searchTitle_Type;
        }

        if (page) {
            params["page"] = page - 1;
        }

        if (pageSize) {
            params["size"] = pageSize;
        }

        return params;
    };

    const retrieveInvoiceList = () => {
        setCheckingApi(true);

        const params = getRequestParams(searchTitle_Type, page, pageSize);

        var page_req = Number(params.page);
        var size_req = Number(params.size);
        var title_type_req = params.title_type
            ? params.title_type.toString().trim()
            : "";

        // var startTime = moment(startDate).format("YYYY-MM-DD HH:mm:ss");
        // var endTime = moment(endDate).format("YYYY-MM-DD HH:mm:ss");

        var page_role_type = "user_page";

        InvoiceServices.getInvoicesList(
            page_role_type,
            page_req,
            size_req,
            Number(title_type_req),
            "startTime",
            "endTime",
            -1
        ).then(
            (response) => {
                //////console.log("Productions  list-> ", response);

                const { invoiceList, totalPages } = response.data;

                // //console.log(" Sales list -> ", response.data);

                if (invoiceList.length) {
                    var revsalesList = invoiceList;//.reverse();

                    setInvoiceList(revsalesList);

                    setIsInvoiceListState(true);
                }

                setCount(totalPages);

                setCheckingApi(false);
                console.log(response)
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                ////console.log("login in error ", resMessage);
                setIsInvoiceListState(false);
                setInvoiceList([]);
                setCheckingApi(false);
            }
        );
    };


    const navigate = useNavigate();

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return (
        <>
            <CRow>
                <CCol>

                    <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>Invoices</span>
                </CCol>
                <CCol className='d-flex justify-content-end gap-4'>
                    <CCol></CCol>
                    <CCol md={5}>
                        <CInputGroup >
                            <CFormInput className='default-border' aria-label="Amount (to the nearest dollar)" placeholder='Search here' onChange={onChangeSearchTitle_Type} />
                            <CInputGroupText className='default-border'><span className="material-symbols-outlined" onClick={findByTitle}>
                                search
                            </span></CInputGroupText>
                        </CInputGroup>
                    </CCol>
                    <CCol >
                        <CButton
                            role="button"
                            className='blue-button'
                            style={{ width: "100%" }}
                            variant="outline"
                            onClick={() => setVisible(true)}
                        ><span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }}>
                                download
                            </span>{' '}Export</CButton>
                    </CCol>

                </CCol>
            </CRow>

            <CRow className='mt-3'>
                <CCol md={2}>
                    <CFormSelect className='default-border' aria-label="Default select example">
                        <option>Bulk Action</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3" disabled>Three</option>
                    </CFormSelect>
                </CCol>
                <CCol md={1}>
                    <CButton className='blue-button' style={{ width: "100%" }} color="primary" variant="outline" >Apply</CButton>
                </CCol>
                <CCol md={2}>
                    <CFormInput

                        style={{ width: "100%" }}
                        placeholder="Order Id"

                    />
                </CCol>
                <CCol md={1}>
                    <CButton className='blue-button' style={{ width: "100%" }} color="primary" variant="outline" >Filter</CButton>
                </CCol>


                <CCol className="d-flex justify-content-end">
                    <CRow>
                        <CCol>
                            <CButton
                                disabled={page == 1}
                                className='blue-button'
                                style={{ width: "100%" }}
                                color="primary"
                                variant="outline"
                                onClick={() => setPage(page - 1)} >
                                Prev
                            </CButton>
                        </CCol>
                        <CCol>
                            <span style={{ color: "#2F5597", fontWeight: "bold" }} className='mt-1'>{page} of {count}</span>
                        </CCol>
                        <CCol>

                            <CButton
                                className='blue-button'
                                style={{ width: "100%" }}
                                color="primary"
                                variant="outline"
                                onClick={() => setPage(page + 1)}
                                disabled={page == count}
                            >
                                Next
                            </CButton>
                        </CCol>


                    </CRow>
                </CCol>
            </CRow>

            {/* Table */}

            <CRow className='p-2 mt-4'>
                <CTable striped>
                    <CTableHead>
                        <CTableRow color="info">
                            <CTableHeaderCell scope="col" className='text-center' width={5}><CFormCheck id="flexCheckDefault" /></CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center'>Invoice</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center'>Invoice Date</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center'>Order</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center'>Order Date</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center'>Customer Name</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center'>Order Status</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center'>Amount</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center'>Action</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {invoiceList?.map((item, index) => (
                            <CTableRow key={index}>
                            <CTableDataCell className='text-center'><CFormCheck id="flexCheckDefault" /></CTableDataCell>
                            <CTableHeaderCell scope="row" className='text-center'>#IN{item.ip}</CTableHeaderCell>
                            <CTableDataCell className='text-center'>{moment(item.invoiced_date).format("YYYY-MM-DD")}</CTableDataCell>
                            <CTableDataCell className='text-center'>#SO{item.Orders_Data_TB.sop}</CTableDataCell>
                            <CTableDataCell className='text-center'>{moment(item.Orders_Data_TB.order_date).format("YYYY-MM-DD")}</CTableDataCell>
                            <CTableDataCell className='text-center'>{item.Orders_Data_TB.customerId}</CTableDataCell>
                            <CTableDataCell className='text-center'>{item.invoice_status == 0 ? "Payment Pending" : "Paid"}</CTableDataCell>
                            <CTableDataCell className='text-center'>LKR {numberWithCommas(Number(item.invoice_grand_total).toFixed(2))}</CTableDataCell>
                            <CTableDataCell className='d-flex justify-content-around'>
                                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => navigate(`/invoices/view?inv=${item.id}&sop=${item.Orders_Data_TB.sop}`)}>
                                    visibility
                                </span>
                            </CTableDataCell>
                        </CTableRow>
                        ))}
                        
                       

                    </CTableBody>
                </CTable>
            </CRow>

            <CRow>
                <CCol md={1}></CCol>
                <CCol className="d-flex justify-content-end" >
                    <CRow>
                        <CCol>

                            <CDropdown style={{ width: "100%" }} variant="btn-group" direction="dropup" >
                                <CDropdownToggle style={{ backgroundColor: '#fff' }} color="secondary">{pageSize}</CDropdownToggle>
                                <CDropdownMenu>
                                    {pageSizes.map((item, key) => (
                                        <CDropdownItem key={key} value={item} onClick={() => setPageSize(item)}>{item}</CDropdownItem>
                                    ))}
                                </CDropdownMenu>
                            </CDropdown>
                        </CCol>
                        <CCol>
                            <CButton
                                disabled={page == 1}
                                className='blue-button'
                                style={{ width: "100%" }}
                                color="primary"
                                variant="outline"
                                onClick={() => setPage(page - 1)}
                            >
                                Prev
                            </CButton>
                        </CCol>
                        <CCol>
                            <span style={{ color: "#2F5597", fontWeight: "bold" }} className='mt-1'>{page} of {count}</span>
                        </CCol>
                        <CCol>

                            <CButton
                                className='blue-button'
                                style={{ width: "100%" }}
                                color="primary"
                                variant="outline"
                                onClick={() => setPage(page + 1)}
                                disabled={page == count}>
                                Next
                            </CButton>
                        </CCol>


                    </CRow>

                </CCol>
            </CRow>
            <RecordDeleteModel visible={deleteVisible} onClose={(val) => setDeleteVisible(val)} recordId={"#5765"} />
            {/* <SendEmailModel visible={visible} onClose={(val) => setVisible(val)} recordId={"#5765"}/> */}
            <ExportModel visible={visible} onClose={(val) => setVisible(val)} />
        </>
    )
}

export default Invoices