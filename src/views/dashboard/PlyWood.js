import { CButton, CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CFormCheck, CFormInput, CFormLabel, CFormSelect, CInputGroup, CInputGroupText, CModal, CModalBody, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import ExportModel from 'src/components/Models/ExportModel';
import LoadingModel from 'src/components/Models/LoadingModel';
import PinRequiredModel from 'src/components/Models/PinRequiredModel';
import PlyWoodConvertModel from 'src/components/Models/PlyWoodConvertModel';
import RecordDeleteModel from 'src/components/Models/RecordDeleteModel';
import StockUpdateModel from 'src/components/Models/StockUpdateModel';
import NoData from 'src/extra/NoData/NoData';
import { ACTIONS, PAGES } from 'src/hooks/constants';
import ActivityLogsService from 'src/services/ActivityLogsService';
import AuthService from 'src/services/AuthService';
import PlyWoodTypesServices from 'src/services/PlyWoodTypesServices';
import RawMaterialService from 'src/services/RawMaterialService';
import swal from 'sweetalert';

const PlyWood = () => {
    const [loading, setLoading] = useState(false)
    const [loadingMsg, setLoadingMsg] = useState(null)

    const [visible, setVisible] = useState(false)
    const [visiblePinModel, setVisiblePinModel] = useState(true)
    const [deleteVisible, setDeleteVisible] = useState(false)
    const [updateVisible, setUpdateVisible] = useState(false)
    const [convertVisible, setConvertVisible] = useState(false)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10);
    const pageSizes = [10, 15, 20];
    const [plyWoodTypeList, setPlyWoodTypeList] = useState([]);
    const [deleteItem, setDeleteItem] = useState(null)
    const [typeprofilesList, setTypeprofilesList] = useState([]);

    const [stock_for_convert, setStock_for_convert] = useState(null)
    const [id_for_convert, setId_for_convert] = useState(null)
    const [plywoodItem_for_convert, setPlywoodItem_for_convert] = useState(null)

    const plyWoodTypesRef = useRef();
    plyWoodTypesRef.current = plyWoodTypeList;
    const [count, setCount] = useState(0);
    const [updateOnRefReshPage, setUpdateOnRefreshPage] = useState(0);
    const [isPlyWoodTypes, setPlyWoodTypesState] = useState(false);
    const [isCheckingApi, setCheckingApi] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState("plywood")
    const [searchTitle_Type, setSearchTitle_Type] = useState("");
    const [searchTitle_Size, setSearchTitle_Size] = useState("");
    const [refreshPage, setRefreshPage] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [modelIsAdding, setModelIsAdding] = useState(true)
    const handleSelectedMenu = (value) => {
        navigate(`/inventory/${value}`)
        setSelectedMenu(value)
    }

    useEffect(() => {
        retrievePlyWoodTypeList()
    }, [page, pageSize, updateOnRefReshPage, refreshPage])
    const onChangeSearchTitle_Type = (e) => {
        const searchTitle = e.target.value;
        setSearchTitle_Type(searchTitle);

        var isSearchEmpty = searchTitle.trim().length ? false : true;

        if (isSearchEmpty) {
            setPage(1);
            //retrievePlyWoodTypeList();
            setUpdateOnRefreshPage(Math.random());

            //console.log("Search is empty type ...!! ");
        }

        //console.log("Search input changing type -> ", searchTitle);
    };

    const onChangeSearchTitle_Size = (e) => {
        const searchTitle = e.target.value;
        setSearchTitle_Size(searchTitle);

        var isSearchEmpty = searchTitle.trim().length ? false : true;

        if (isSearchEmpty) {
            setPage(1);
            //retrievePlyWoodTypeList();
            setUpdateOnRefreshPage(Math.random());

            //console.log("Search is empty size ...!! ");
        }

        //console.log("Search input changing size -> ", searchTitle);
    };

    const findByTitle = () => {
        setPage(1);
        retrievePlyWoodTypeList();
    };

    const getRequestParams = (
        searchTitle_Type,
        searchTitle_Size,
        page,
        pageSize
    ) => {
        let params = {};

        if (searchTitle_Type) {
            params["title_type"] = searchTitle_Type;
        }
        if (searchTitle_Size) {
            params["title_size"] = searchTitle_Size;
        }

        if (page) {
            params["page"] = page - 1;
        }

        if (pageSize) {
            params["size"] = pageSize;
        }

        return params;
    };
    const retrievePlyWoodTypeList = async () => {
        setCheckingApi(true);

        setLoadingMsg("Fetching Plywood Types...")
        setLoading(true)

        const params = getRequestParams(
            searchTitle_Type,
            searchTitle_Size,
            page,
            pageSize
        );

        var page_req = Number(params.page);
        var size_req = Number(params.size);
        var title_type_req = params.title_type
            ? params.title_type.toString().trim()
            : "";
        var title_size_req = params.title_size
            ? params.title_size.toString().trim()
            : "";

        //setPlyWoodTypeList(mock_data);

        var page_role_type = "dash_page";

        await PlyWoodTypesServices.getPlyWoodTypesList(
            page_role_type,
            page_req,
            size_req,
            title_type_req,
            title_size_req
        ).then(
            (response) => {
                //console.log("Ply Wood Types list-> ", response);

                const { plyWoodList, totalPages, profiles } = response.data;

                //console.log({ profiles });

                var modPlyWoodList = [];

                if (plyWoodList.length && totalPages) {
                    plyWoodList.forEach((crr_ele) => {
                        var temp_obj = {};

                        temp_obj.id = crr_ele.id;
                        temp_obj.sku = crr_ele.sku;
                        temp_obj.size = crr_ele.size;
                        temp_obj.type = crr_ele.type;
                        temp_obj.stock = crr_ele.stock;
                        temp_obj.limit = crr_ele.limit;
                        temp_obj.active = crr_ele.active;

                        if (profiles.length) {
                            temp_obj.profilesDataArray = [];

                            for (let i = 0; i < profiles.length; i++) {
                                var crr_profile = profiles[i];

                                if (crr_profile.plywoodId === crr_ele.id) {
                                    var temp_obj_prof = {};

                                    temp_obj_prof.type = crr_profile.type;
                                    temp_obj_prof.stock = crr_profile.stock;

                                    temp_obj.profilesDataArray.push(temp_obj_prof);
                                }
                            }
                        }

                        modPlyWoodList.push(temp_obj);
                    });

                    //console.log("testing -> ", modPlyWoodList);

                    var revPlyWoodList = modPlyWoodList;//.reverse();
                    console.log(revPlyWoodList)
                    setPlyWoodTypeList(revPlyWoodList);

                    var reprofiles = profiles; //.reverse();
                    setTypeprofilesList(reprofiles);

                    setCount(totalPages);
                    setPlyWoodTypesState(true);
                }
                setCheckingApi(false);
                setLoadingMsg(null)
                setLoading(false)
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                //console.log("login in error ", resMessage);
                setPlyWoodTypesState(false);
                setCheckingApi(false);
                setLoadingMsg(null)
                setLoading(false)
                swal("Error!", error.response.data.message, "error");
            }
        );
    };

    const stockGenarator = (value, stock) => {
        var stock_limit = value;
        var stock_now = stock;

        if (stock_now < stock_limit) {
            var ret1 = (
                <>
                    <font color="#FF0000"> Low Stock </font>
                </>
            );
            return ret1;
        } else {
            var ret2 = (
                <>
                    <font color="#006600"> None </font>
                </>
            );
            return ret2;
        }
    }

    let titlesObject = {
        h1: " No Plywood Types Found. ",
        h2: " All time ",
        h3: " Add a new record by simply clicking the button on top right side",
    };

    var noDataContent = (
        <>
            <NoData Titles={titlesObject} />
        </>
    );

    const deletePlywood = () => {
        PlyWoodTypesServices.deletePlyWoodTypesRecord("dash_page", [Number(deleteItem.id)])
            .then(response => {
                swal("Success!", "PlyWood Type Deleted Successfully", "success");
                ActivityLogsService.createLog(PAGES.PLYWOOD, AuthService.getCurrentUser().name, ACTIONS.DELETE, 1)
                    .catch((error) => {
                        console.log(error)
                        swal("Error!", "Something Went Wrong With Logging", "error");
                    })
                setRefreshPage(!refreshPage)
            }).catch(error => {
                console.log(error.response.data.message)
                swal("Error!", error.response.data.message, "error");
                ActivityLogsService.createLog(PAGES.PLYWOOD, AuthService.getCurrentUser().name, ACTIONS.DELETE, 0)
                    .catch((error) => {
                        console.log(error)
                        swal("Error!", "Something Went Wrong With Logging", "error");
                    })
            })
    }

    const handleConvertModel = (item) => {
        setPlywoodItem_for_convert(item)
        setConvertVisible(true)
    }

    const navigate = useNavigate();
    return visiblePinModel ? <PinRequiredModel isNavigate={true} page={PAGES.PLYWOOD} visible={visiblePinModel} onClose={(val) => setVisiblePinModel(val)} isNavigation={true} /> : (
        <>
            <CRow>
                <CCol>

                    <CDropdown style={{ cursor: 'pointer' }}>
                        <CDropdownToggle style={{ fontSize: "1.5em", fontWeight: "bold", backgroundColor: '#fff', border: 0 }} color="secondary">
                            {selectedMenu == 'plywood' ? 'PlyWood' : (selectedMenu == 'raw' ? 'Row Material' : 'Others')}
                        </CDropdownToggle>
                        <CDropdownMenu >
                            <CDropdownItem value={"plywood"} active={selectedMenu == 'plywood' ? true : false} onClick={() => handleSelectedMenu("plywood")}>PlyWood</CDropdownItem>
                            <CDropdownItem value={"raw"} active={selectedMenu == 'raw' ? true : false} onClick={() => handleSelectedMenu("raw")}>Row Material</CDropdownItem>
                            <CDropdownItem value={"others"} active={selectedMenu == 'others' ? true : false} onClick={() => handleSelectedMenu("others")}>Others</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                </CCol>
                <CCol className='d-flex justify-content-end gap-4'>
                    <CCol md={5}>
                        <CInputGroup >
                            <CFormInput className='default-border' aria-label="Amount (to the nearest dollar)" placeholder='Type' onChange={onChangeSearchTitle_Type} />
                            <CFormInput className='default-border' aria-label="Amount (to the nearest dollar)" placeholder='Size' onChange={onChangeSearchTitle_Size} />
                            <CInputGroupText className='default-border' style={{ cursor: 'pointer' }}>
                                <span className="material-symbols-outlined" onClick={findByTitle}>
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
                    <CCol>
                        <CButton
                            color="success"
                            className='default-border'
                            variant="outline"
                            style={{ fontSize: "1em", fontWeight: '600', width: "100%" }}
                            onClick={() => navigate('/inventory/add-plywood')}><span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }}>
                                add
                            </span>{' '}New</CButton>
                    </CCol>
                </CCol>
            </CRow>

            <CRow className='mt-3'>
                <CCol md={2}>
                    <CFormSelect className='default-border' aria-label="Default select example">
                        <option>None</option>
                        <option value="delete">Delete Selected</option>
                        <option value="export">Export Selected</option>
                    </CFormSelect>
                </CCol>
                <CCol md={1}>
                    <CButton className='blue-button' style={{ width: "100%" }} color="primary" variant="outline" >Apply</CButton>
                </CCol>
                {/* <CCol md={2}>
                    <CFormSelect className='default-border' aria-label="Default select example">
                        <option>Production</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3" disabled>Three</option>
                    </CFormSelect>
                </CCol>
                <CCol md={1}>
                    <CButton className='blue-button' style={{ width: "100%" }} color="primary" variant="outline" >Filter</CButton>
                </CCol>
                <CCol md={2}>
                    <CFormSelect className='default-border' aria-label="Default select example">
                        <option>Type</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3" disabled>Three</option>
                    </CFormSelect>
                </CCol>
                <CCol md={1}>
                    <CButton className='blue-button' style={{ width: "100%" }} color="primary" variant="outline" >Filter</CButton>
                </CCol> */}

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
                                disabled={page == count}>
                                Next
                            </CButton>
                        </CCol>


                    </CRow>
                </CCol>
            </CRow>

            {/* Table */}

            {!isPlyWoodTypes ? noDataContent :

                <CRow className='p-2 mt-4'>
                    <CTable striped>
                        <CTableHead>
                            <CTableRow color="info">
                                <CTableHeaderCell scope="col" className='text-center' width={5}><CFormCheck id="flexCheckDefault" /></CTableHeaderCell>
                                <CTableHeaderCell scope="col" className='text-center'>SKU</CTableHeaderCell>
                                <CTableHeaderCell scope="col" className='text-center'>Production</CTableHeaderCell>
                                <CTableHeaderCell scope="col" className='text-center'>Type</CTableHeaderCell>
                                <CTableHeaderCell scope="col" className='text-center'>Stock on Hand</CTableHeaderCell>
                                <CTableHeaderCell scope="col" className='text-center'>Warnings</CTableHeaderCell>
                                <CTableHeaderCell scope="col" className='text-center' width={200}>Action</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {plyWoodTypeList.map((item, key) => (
                                <CTableRow key={key}>
                                    <CTableDataCell className='text-center'><CFormCheck id="flexCheckDefault" /></CTableDataCell>
                                    <CTableHeaderCell scope="row" className='text-center' style={{ color: "blue", fontWeight: "800" }}>{"#PW" + item.sku.toString()}</CTableHeaderCell>
                                    <CTableDataCell className='text-center'>{item.size}mm</CTableDataCell>
                                    <CTableDataCell className='text-center'>{item.type}</CTableDataCell>
                                    <CTableDataCell className='text-center'>{Math.floor(item.stock * 1e3) / 1e3}</CTableDataCell>
                                    <CTableDataCell className='text-center'>
                                        {
                                            stockGenarator(item.limit, item.stock)
                                        }</CTableDataCell>
                                    <CTableDataCell className='d-flex justify-content-around'>
                                        {!item.type.includes("G2") ? <span className="material-symbols-outlined" style={{ cursor: "pointer" }}
                                            onClick={() => handleConvertModel(item)}>
                                            trending_up
                                        </span> : <span></span>}
                                        <span className="material-symbols-outlined" style={{ cursor: "pointer" }}
                                            onClick={() => {
                                                setSelectedProduct(item)
                                                setModelIsAdding(true)
                                                setUpdateVisible(true)
                                            }}>
                                            upgrade
                                        </span>
                                        <span className="material-symbols-outlined" style={{ cursor: "pointer" }}
                                            onClick={() => navigate(`/inventory/add-plywood?id=${item.id}`)}>
                                            edit
                                        </span>
                                        <span className="material-symbols-outlined" style={{ cursor: "pointer" }}
                                            onClick={
                                                () => {
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
            <RecordDeleteModel visible={deleteVisible}
                onClose={(val, auth) => {
                    if (auth == "AUTHENTICATED") deletePlywood()
                    setDeleteVisible(val)
                }
                }
                recordId={`#PW${deleteItem?.sku}`}
                page={PAGES.PLYWOOD}
            />
            <StockUpdateModel
                visible={updateVisible}
                onClose={(val) => setUpdateVisible(val)}
                product={selectedProduct}
                isAdding={modelIsAdding}
                refreshPage={() => setRefreshPage(!refreshPage)}
                type={"plywood"} />
            <ExportModel visible={visible} onClose={(val) => setVisible(val)} />
            <PlyWoodConvertModel
                visible={convertVisible}
                onClose={(val) => setConvertVisible(val)}
                item={plywoodItem_for_convert}
                refreshPage={() => setRefreshPage(!refreshPage)}
            />
            <LoadingModel visible={loading} loadingMsg={loadingMsg} onClose={(val) => setLoading(false)} />
        </>
    )
}

export default PlyWood