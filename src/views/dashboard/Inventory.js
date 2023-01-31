import { CButton, CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CFormCheck, CFormInput, CFormLabel, CFormSelect, CInputGroup, CInputGroupText, CModal, CModalBody, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import ExportModel from 'src/components/Models/ExportModel';
import PinRequiredModel from 'src/components/Models/PinRequiredModel';
import RecordDeleteModel from 'src/components/Models/RecordDeleteModel';
import StockUpdateModel from 'src/components/Models/StockUpdateModel';
import NoData from 'src/extra/NoData/NoData';
import RawMaterialService from 'src/services/RawMaterialService';
import swal from 'sweetalert';

const Inventory = () => {
  const [visible, setVisible] = useState(false)
  const [visiblePinModel, setVisiblePinModel] = useState(true)
  const [deleteVisible, setDeleteVisible] = useState(false)
  const [updateVisible, setUpdateVisible] = useState(false)
  const search = useLocation().search
  const type = new URLSearchParams(search).get('type')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10);
  const pageSizes = [10, 25, 50];
  const [rawMaterialList, setRawMaterialList] = useState([]);
  const [count, setCount] = useState(0);
  const [updateOnRefReshPage, setUpdateOnRefreshPage] = useState(0);
  const [isRawMaterials, setRawMaterialsState] = useState(false);
  const [modelIsAdding, setModelIsAdding] = useState(true)
  const [isCheckingApi, setCheckingApi] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("raw")
  const [searchTitle, setSearchTitle] = useState("");

  const [refreshPage, setRefreshPage] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [deleteItem, setDeleteItem] = useState(null)
  // useEffect(() => {
  //   setSelectedMenu(type)
  // }, [type])

  const handleSelectedMenu = (value) => {
    navigate(`/inventory/${value}`)
    setSelectedMenu(value)
  }

  useEffect(() => {
    retrieveRawMaterialList()
  }, [page, pageSize, updateOnRefReshPage, refreshPage])

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);

    var isSearchEmpty = searchTitle.trim().length ? false : true;

    if (isSearchEmpty) {
      setPage(1);
      //retrieveRawMaterialList();
      setUpdateOnRefreshPage(Math.random());

      //console.log("Search is empty ...!! ");
    }

    //console.log("Search input changing -> ", searchTitle);
  };

  const findByTitle = () => {
    setPage(1);
    retrieveRawMaterialList();
  };

  const getRequestParams = (searchTitle, page, pageSize) => {
    let params = {};

    if (searchTitle) {
      params["title"] = searchTitle;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  const retrieveRawMaterialList = () => {
    setCheckingApi(true);

    const params = getRequestParams(searchTitle, page, pageSize);

    var page_req = Number(params.page);
    var size_req = Number(params.size);
    var title_req = params.title ? params.title.toString() : "";

    //setRawMaterialList(mock_data);

    var page_role_type = "dash_page";

    RawMaterialService.getRawMaterialList(
      page_role_type,
      page_req,
      size_req,
      title_req
    ).then(
      (response) => {
        //console.log("User list requested", response);

        const { rawMatList, totalPages, currentPage } = response.data;
        console.log(response.data)
        if (rawMatList && totalPages) {
          var revRawMatList = rawMatList;//.reverse();

          //console.log({ revRawMatList });
          // setPage(currentPage)
          setRawMaterialList(revRawMatList);
          setCount(totalPages);
          setRawMaterialsState(true);
        }

        setCheckingApi(false);
      },
      (error) => {
        // const resMessage =
        //   (error.response &&
        //     error.response.data &&
        //     error.response.data.message) ||
        //   error.message ||
        //   error.toString();

        //console.log("login in error ", resMessage);
        setRawMaterialsState(false);
        setCheckingApi(false);
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
    h1: isCheckingApi ? "Checking New Data.." : " No Raw Materials  Found. ",
    h2: " All time ",
    h3: " Add a new record by simply clicking the button on top right side",
  };

  var noDataContent = (
    <>
      <NoData Titles={titlesObject} />
    </>
  );


  const deleteRawMaterial = () => {
    RawMaterialService.deleteRawMaterialRecord("user_page", [Number(deleteItem.id)])
      .then(response => {
        swal("Success!", "Raw Material Deleted Successfully", "success");
        setRefreshPage(!refreshPage)
      }).catch(error => {
        console.log(error.response.data.message)
        swal("Error!", error.response.data.message, "error");
      })
  }

  const navigate = useNavigate();
  return visiblePinModel ? <PinRequiredModel visible={visiblePinModel} onClose={(val) => setVisiblePinModel(val)} /> : (
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
            {selectedMenu == 'plywood' ? <CInputGroup >
              <CFormInput className='default-border' aria-label="Amount (to the nearest dollar)" placeholder='Type' />
              <CFormInput className='default-border' aria-label="Amount (to the nearest dollar)" placeholder='Size' />
              <CInputGroupText className='default-border' style={{ cursor: 'pointer' }}>
                <span className="material-symbols-outlined">
                  search
                </span></CInputGroupText>
            </CInputGroup> :
              <CInputGroup >
                <CFormInput className='default-border' aria-label="Amount (to the nearest dollar)" placeholder='Search' onChange={onChangeSearchTitle} />
                <CInputGroupText className='default-border'>
                  <span className="material-symbols-outlined"
                    onClick={findByTitle}>
                    search
                  </span></CInputGroupText>
              </CInputGroup>}
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
              </span>{' '}Update</CButton>
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
        <CCol md={2}>
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

      {!isRawMaterials ? noDataContent :

        <CRow className='p-2 mt-4'>
          <CTable striped>
            <CTableHead>
              <CTableRow color="info">
                <CTableHeaderCell scope="col" className='text-center' width={5}><CFormCheck id="flexCheckDefault" /></CTableHeaderCell>
                <CTableHeaderCell scope="col" className='text-center'>SKU</CTableHeaderCell>
                <CTableHeaderCell scope="col" className='text-center'>Product</CTableHeaderCell>
                <CTableHeaderCell scope="col" className='text-center'>Stock on Hand</CTableHeaderCell>
                <CTableHeaderCell scope="col" className='text-center'>Warnings</CTableHeaderCell>
                <CTableHeaderCell scope="col" className='text-center'>Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {rawMaterialList.map((item, key) => (
                <CTableRow key={key}>
                  <CTableDataCell className='text-center'><CFormCheck id="flexCheckDefault" /></CTableDataCell>
                  <CTableHeaderCell scope="row" className='text-center' style={{ color: "blue", fontWeight: "800" }}>{"#RM" + item.sku.toString()}</CTableHeaderCell>
                  <CTableDataCell className='text-center'>{item.type}</CTableDataCell>
                  <CTableDataCell className='text-center'>{Math.floor(item.stock * 1e3) / 1e3}</CTableDataCell>
                  <CTableDataCell className='text-center'>{
                    stockGenarator(item.limit, item.stock)
                  }</CTableDataCell>
                  <CTableDataCell className='d-flex justify-content-around'>
                    <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => {
                      setSelectedProduct(item)
                      setModelIsAdding(true)
                      setUpdateVisible(true)
                    }}>
                      upgrade
                    </span>
                    {item.type == "Glue" || item.type == "Wheat Flour" ? <span className="material-symbols-outlined" style={{ cursor: "pointer" }}
                      onClick={() => {
                        setSelectedProduct(item)
                        setModelIsAdding(false)
                        setUpdateVisible(true)
                      }}>
                      download_for_offline
                    </span> : null}
                    <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => navigate('/production/edit')}>
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
          if (auth == "AUTHENTICATED") deleteRawMaterial()
          setDeleteVisible(val)
        }
        }
        recordId={`#RM${deleteItem?.sku}`} />
      <StockUpdateModel
        visible={updateVisible}
        onClose={(val) => setUpdateVisible(val)}
        product={selectedProduct}
        isAdding={modelIsAdding}
        refreshPage={() => setRefreshPage(!refreshPage)}
        type={"raw"} />
      <ExportModel visible={visible} onClose={(val) => setVisible(val)} />
    </>
  )
}

export default Inventory