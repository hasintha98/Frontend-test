import { CButton, CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CFormInput, CFormSelect, CInputGroup, CInputGroupText, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AddEditCustomerModel from 'src/components/Models/AddEditCustomerModel';
import AddEditUsersModel from 'src/components/Models/AddEditUsersModel';
import ExportModel from 'src/components/Models/ExportModel';
import LoadingModel from 'src/components/Models/LoadingModel';
import PinRequiredModel from 'src/components/Models/PinRequiredModel';
import RecordDeleteModel from 'src/components/Models/RecordDeleteModel';
import NoData from 'src/extra/NoData/NoData';
import { ACTIONS, PAGES } from 'src/hooks/constants';
import ActivityLogsService from 'src/services/ActivityLogsService';
import AuthService from 'src/services/AuthService';
import UserService from 'src/services/UserService';
import swal from 'sweetalert';

const Users = () => {
    const [loading, setLoading] = useState(false)
    const [loadingMsg, setLoadingMsg] = useState(null)

    const [deleteVisible, setDeleteVisible] = useState(false)
    const [visiblePinModel, setVisiblePinModel] = useState(false)
    const [addCustomerVisible, setAddCustomerVisible] = useState(false)
    const [visible, setVisible] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [values, setValues] = useState(null)
    const [searchTitle_Telephone, setSearchTitle_Telephone] = useState("");
    const [UsersListList, setUsersListList] = useState([]);
    const [deleteItem, setDeleteItem] = useState(null)
    const UsersListsRef = useRef();

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const pageSizes = [10, 25, 50];

    UsersListsRef.current = UsersListList;

    const [isUsersLists, setUsersListsState] = useState(false);
    const [isCheckingApi, setCheckingApi] = useState(false);
    const navigate = useNavigate();
    const [refreshPage, setRefreshPage] = useState(false)
    const [updateOnRefReshPage, setUpdateOnRefreshPage] = useState(0);
    useEffect(() => {
        retrieveUsersListList()
    }, [page, pageSize, updateOnRefReshPage, refreshPage])

    const retrieveUsersListList = () => {
        setLoading(true)
        setLoadingMsg("Fetching Users...")
        setCheckingApi(true);

        const params = getRequestParams(searchTitle_Telephone, page, pageSize);

        var page_req = Number(params.page);
        var size_req = Number(params.size);
        var title_type_req = params.title_type
            ? params.title_type.toString().trim()
            : "";

        //setUsersListList(mock_data);

        var page_role_type = "dash_page";

        UserService.getAllUsersInfo(
            page_role_type,
            page_req,
            size_req,
            title_type_req
        ).then(
            (response) => {
                //console.log("Users list-> ", response);

                const { userslist, totalPages } = response.data;

                //console.log("testing -> ", response.data);

                if (userslist.length) {
                    var revUsersList = userslist;//.reverse();

                    setUsersListList(revUsersList);
                    console.log(revUsersList)
                    setCount(totalPages);
                    setUsersListsState(true);
                }
                setCheckingApi(false);
                setLoading(false)
                setLoadingMsg(null)
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                //console.log("login in error ", resMessage);
                setUsersListsState(false);
                setCheckingApi(false);
                setLoading(false)
                setLoadingMsg(null)
                swal("Error!", error.response.data.message, "error");
            }
        );
    };





    const onChangeSearchTitle_Telephone = (e) => {
        const searchTitle = e.target.value;
        setSearchTitle_Telephone(searchTitle);

        var isSearchEmpty = searchTitle.trim().length ? false : true;

        if (isSearchEmpty) {
            setPage(1);
            //retrieveUsersListList();
            setUpdateOnRefreshPage(Math.random());

            //console.log("Search is empty type ...!! ");
        }

        //console.log("Search input changing type -> ", searchTitle);
    };

    const findByTitle = () => {
        setPage(1);
        retrieveUsersListList();

        console.log("test");
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

    const handleEditButton = (state, item) => {
        setIsEdit(true)
        setValues(item)

        setAddCustomerVisible(state)

    }

    const deleteUser = () => {
        UserService.deleteUsersInfo("dash_page", [Number(deleteItem.id)])
            .then(response => {
                swal("Success!", "User Deleted Successfully", "success");
                ActivityLogsService.createLog(PAGES.USER, AuthService.getCurrentUser().name, ACTIONS.DELETE, 1)
                .catch((error) => {
                    console.log(error)
                    swal("Error!", "Something Went Wrong With Logging", "error");
                })
                setRefreshPage(!refreshPage)
            }).catch(error => {
                console.log(error.response.data.message)
                swal("Error!", error.response.data.message, "error");
                ActivityLogsService.createLog(PAGES.USER, AuthService.getCurrentUser().name, ACTIONS.DELETE, 0)
                .catch((error) => {
                    console.log(error)
                    swal("Error!", "Something Went Wrong With Logging", "error");
                })
            })
    }

    let titlesObject = {
        h1: "No User accounts Found. ",
        h2: "All time ",
        h3: "Add a new user by simply clicking the button on top right side",
    };

    var noDataContent = (
        <>
            <NoData Titles={titlesObject} />
        </>
    );

    return visiblePinModel ? <PinRequiredModel isNavigate={true} page={PAGES.USER} visible={visiblePinModel} onClose={(val) => setVisiblePinModel(val)} isNavigation={true} /> : (
        <>
            <CRow>
                <CCol md={8}>

                    <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>Users</span>
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
                        <option>None</option>
                        <option value="delete">Delete Selected</option>
                        <option value="export">Export Selected</option>
                    </CFormSelect>
                </CCol>
                <CCol md={1}>
                    <CButton className='blue-button' style={{ width: "100%" }} color="primary" variant="outline" >Apply</CButton>
                </CCol>
                <CCol md={3} >
                    <CInputGroup >
                        <CFormInput className='default-border' aria-label="Amount (to the nearest dollar)" placeholder='Search here' onChange={onChangeSearchTitle_Telephone} />
                        <CInputGroupText className='default-border'>
                            <span className="material-symbols-outlined" onClick={findByTitle} style={{ cursor: 'pointer' }}>
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
            {!isUsersLists ? noDataContent :
                <CRow className='p-2 mt-4'>
                    <CTable striped>
                        <CTableHead>
                            <CTableRow color="info">
                                <CTableHeaderCell scope="col" className='text-center'>Id #</CTableHeaderCell>
                                <CTableHeaderCell scope="col" className='text-center'>Name</CTableHeaderCell>
                                <CTableHeaderCell scope="col" className='text-center'>Role</CTableHeaderCell>
                                <CTableHeaderCell scope="col" className='text-center'>Email</CTableHeaderCell>
                                <CTableHeaderCell scope="col" className='text-center'>Status</CTableHeaderCell>
                                <CTableHeaderCell scope="col" className='text-center' width={200}>Action</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {UsersListList.map((item, index) => (
                                <CTableRow key={index}>
                                    <CTableDataCell className='text-center'>{item.id}</CTableDataCell>
                                    <CTableDataCell className='text-center'>{item.name} </CTableDataCell>
                                    <CTableDataCell className='text-center'>
                                        {item.roles.map((role, index) => {
                                            if (index + 1 == item.length - 1) return `${role}`
                                            return `${role} / `
                                        })}
                                    </CTableDataCell>
                                    <CTableDataCell className='text-center'>{item.email}</CTableDataCell>
                                    <CTableDataCell className='text-center'>{item.active == 1 ? 'Active' : 'Inactive'}</CTableDataCell>
                                    <CTableDataCell className='d-flex justify-content-around'>
                                        <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => handleEditButton(true, item)}>
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
            }
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
            <AddEditUsersModel
                visible={addCustomerVisible}
                onClose={(val) => setAddCustomerVisible(val)}
                isEdit={isEdit}
                values={values}
                refreshPage={() => setRefreshPage(!refreshPage)} />
            <RecordDeleteModel
                visible={deleteVisible}
                onClose={(val, auth) => {
                    if (auth == "AUTHENTICATED") deleteUser()
                    setDeleteVisible(val)
                }
                }
                page={PAGES.USER}
                recordId={`#${deleteItem?.id}`} />
            <LoadingModel visible={loading} loadingMsg={loadingMsg} onClose={(val) => setLoading(false)} />
        </>
    )
}

export default Users