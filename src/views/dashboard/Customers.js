import { CButton, CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CFormInput, CFormSelect, CInputGroup, CInputGroupText, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AddEditCustomerModel from 'src/components/Models/AddEditCustomerModel';
import ExportModel from 'src/components/Models/ExportModel';
import PinRequiredModel from 'src/components/Models/PinRequiredModel';
import RecordDeleteModel from 'src/components/Models/RecordDeleteModel';
import CustomersServices from 'src/services/CustomersServices';
import swal from 'sweetalert';

const Customers = () => {
    const [deleteVisible, setDeleteVisible] = useState(false)
    const [visiblePinModel, setVisiblePinModel] = useState(true)
    const [addCustomerVisible, setAddCustomerVisible] = useState(false)
    const [visible, setVisible] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [values, setValues] = useState(null)

    const [deleteItem, setDeleteItem] = useState(null)

    const [CustomerList, setCustomerList] = useState([]);
    const CustomersRef = useRef();

    const [refreshPage, setRefreshPage] = useState(false)

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const pageSizes = [10, 25, 50];

    const [isCustomers, setCustomersState] = useState(false);
    const [isCheckingApi, setCheckingApi] = useState(false);


    const [searchTitle_Telephone, setSearchTitle_Telephone] = useState("");

    const [updateOnRefReshPage, setUpdateOnRefreshPage] = useState(0);


    CustomersRef.current = CustomerList;

    useEffect(() => {
        retrieveCustomerList()
    }, [page, pageSize, updateOnRefReshPage, refreshPage])

    const retrieveCustomerList = () => {
        setCheckingApi(true);

        const params = getRequestParams(searchTitle_Telephone, page, pageSize);

        var page_req = Number(params.page);
        var size_req = Number(params.size);
        var title_type_req = params.title_type
            ? params.title_type.toString().trim()
            : "";

        //setCustomerList(mock_data);

        var page_role_type = "dash_page";

        CustomersServices.getAllCustomersInfo(
            page_role_type,
            page_req,
            size_req,
            title_type_req
        ).then(
            (response) => {
                //console.log("Ply Wood Types list-> ", response);

                const { customersList, totalPages } = response.data;

                //console.log("testing -> ", customersList);
                var customersFinal = [];
                var customersEdited = [];
                var cash_customer = {};
                if (customersList.length) {
                    var revCustomersList = customersList;//.reverse();

                    for (let i = 0; i < revCustomersList.length; i++) {
                        var crr_customer = revCustomersList[i];

                        if (crr_customer.id === 1) {
                            cash_customer = crr_customer;
                        } else {
                            customersEdited.push(crr_customer);
                        }
                    }

                    customersFinal.push(cash_customer);

                    for (let i = 0; i < customersEdited.length; i++) {
                        var crr_customerX = customersEdited[i];

                        customersFinal.push(crr_customerX);
                    }

                    setCustomerList(customersFinal);
                    console.log(customersFinal)
                    setCount(totalPages);
                    setCustomersState(true);
                }
                setCheckingApi(false);
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                //console.log("login in error ", resMessage);
                setCustomersState(false);
                setCheckingApi(false);
            }
        );
    };

    const navigate = useNavigate();

    const handleEditButton = (state, item) => {
        setIsEdit(true)
        setValues(item)

        setAddCustomerVisible(state)

    }


    const onChangeSearchTitle_Telephone = (e) => {
        const searchTitle = e.target.value;
        setSearchTitle_Telephone(searchTitle);

        var isSearchEmpty = searchTitle.trim().length ? false : true;

        if (isSearchEmpty) {
            setPage(1);
            //retrieveCustomerList();
            setUpdateOnRefreshPage(Math.random());

            //console.log("Search is empty type ...!! ");
        }

        //console.log("Search input changing type -> ", searchTitle);
    };

    const findByTitle = () => {
        setPage(1);
        retrieveCustomerList();
    };

    const getRequestParams = (searchTitle_Telephone, page, pageSize) => {
        let params = {};

        if (searchTitle_Telephone) {
            params["title_type"] = searchTitle_Telephone;
        }

        if (page) {
            params["page"] = page - 1;
        }

        if (pageSize) {
            params["size"] = pageSize;
        }

        return params;
    };

    const deleteCustomer = () => {
        CustomersServices.deleteCustomerRecord("user_page", [Number(deleteItem.id)])
            .then(response => {
                swal("Success!", "Customer Deleted Successfully", "success");
                setRefreshPage(!refreshPage)
            }).catch(error => {
                console.log(error.response.data.message)
                swal("Error!", error.response.data.message, "error");
            })
    }


    return visiblePinModel ? <PinRequiredModel visible={visiblePinModel} onClose={(val) => setVisiblePinModel(val)} /> : (
        <>
            <CRow>
                <CCol md={8}>

                    <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>Customers</span>
                </CCol>
                <CCol className='d-flex justify-content-end gap-4'>

                    <CCol md={4}>
                        <CButton
                            color="success"
                            className='default-border'
                            variant="outline"
                            style={{ fontSize: "1em", fontWeight: '600', width: "100%" }}
                            onClick={() => {
                                setValues(null)
                                setIsEdit(false)
                                setAddCustomerVisible(true)

                            }}><span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }}>
                                add
                            </span>{' '}New</CButton>
                    </CCol>
                </CCol>
            </CRow>
            <CRow className='mt-5'>

                <CCol md={3}>
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
                <CCol md={3} >
                    <CInputGroup >
                        <CFormInput className='default-border' aria-label="Amount (to the nearest dollar)" placeholder='Search here' onChange={onChangeSearchTitle_Telephone} />
                        <CInputGroupText className='default-border'>
                            <span className="material-symbols-outlined"
                                style={{ cursor: 'pointer' }}
                                onClick={findByTitle}>
                                search
                            </span></CInputGroupText>
                    </CInputGroup>
                </CCol>
                <CCol md={1}>
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
                <CCol className="d-flex justify-content-end">
                    <CRow>
                        <CCol>
                            <CButton
                                className='blue-button'
                                style={{ width: "100%" }}
                                color="primary"
                                variant="outline"
                                disabled={page == 1}
                                onClick={() => setPage(page - 1)}>Prev</CButton>
                        </CCol>
                        <CCol>
                            <span style={{ color: "#2F5597", fontWeight: "bold" }} className='mt-1'>{page} of {count}</span>
                        </CCol>
                        <CCol>

                            <CButton
                                className='blue-button'
                                style={{ width: "100%" }}
                                color="primary"
                                onClick={() => setPage(page + 1)}
                                disabled={page == count}
                                variant="outline" >Next</CButton>
                        </CCol>


                    </CRow>
                </CCol>
            </CRow>
            {/* Table */}

            <CRow className='p-2 mt-4'>
                <CTable striped>
                    <CTableHead>
                        <CTableRow color="info">
                            <CTableHeaderCell scope="col" className='text-center'>Customer #</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center'>Customer Name</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center'>Phone</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center'>Email</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center'>Complete
                                Orders</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center'>Pending Orders</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center'>Action</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {CustomerList.map((item, index) => (
                            <CTableRow key={index}>
                                <CTableDataCell className='text-center'>{item.id}</CTableDataCell>
                                <CTableDataCell className='text-center'>{item.name}</CTableDataCell>
                                <CTableDataCell className='text-center'>{item.phone}</CTableDataCell>
                                <CTableDataCell className='text-center'>{item.email}</CTableDataCell>

                                <CTableDataCell className='text-center'>{item.done_orders}</CTableDataCell>
                                <CTableDataCell className='text-center'>{item.pending_orders}</CTableDataCell>
                                <CTableDataCell className='d-flex justify-content-around'>
                                    <span className="material-symbols-outlined" style={{ cursor: "pointer" }}
                                        onClick={() => handleEditButton(true, item)}>
                                        edit
                                    </span>
                                    <span className="material-symbols-outlined" style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            setDeleteItem(item)
                                            setDeleteVisible(true)
                                        }}
                                    >
                                        delete
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
            <ExportModel visible={visible} onClose={(val) => setVisible(val)} />
            <AddEditCustomerModel
                visible={addCustomerVisible}
                onClose={(val) => setAddCustomerVisible(val)}
                isEdit={isEdit}
                values={values}
                refreshPage={() => setRefreshPage(!refreshPage)} />
            <RecordDeleteModel visible={deleteVisible}
                onClose={(val, auth) => {
                    if (auth == "AUTHENTICATED") deleteCustomer()
                    setDeleteVisible(val)
                }
                }
                recordId={`#${deleteItem?.id}`} />
        </>
    )
}

export default Customers