import { CButton, CCol, CCollapse, CFormCheck, CFormInput, CFormLabel, CFormSwitch, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CTooltip } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import 'react-tooltip/dist/react-tooltip.css'

import PinResetModel from 'src/components/Models/PinResetModel'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import UserService from 'src/services/UserService'
import PerPageAccess, { productionsPageAccess } from 'src/hooks/PerPageAccess'
import PermissionsService from 'src/services/PermissionsService'
import { PAGES } from 'src/hooks/constants'
import swal from 'sweetalert'
import LoadingModel from 'src/components/Models/LoadingModel'
import AuthService from 'src/services/AuthService'
import UserStatus from 'src/hooks/UserStatus'
import TokenService from 'src/services/TokenService'
const Permissions = () => {
    const [generalCollapseVisible, setGeneralCollapseVisible] = useState(false)
    const [rawCollapseVisible, setRawCollapseVisible] = useState(true)
    const [permissionsCollapseVisible, setPermissionsCollapseVisible] = useState(true)
    const [userPinsCollapseVisible, setUserPinsCollapseVisible] = useState(true)
    const [visible, setVisible] = useState(false)
    const [userList, setUserList] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingMsg, setLoadingMsg] = useState(null)
    const [pageAccessList, setPageAccessList] = useState([])
    const [navigationPin, setNavigationPin] = useState(UserStatus.getPinStatus().navigation)
    const [actionsPin, setActionsPin] = useState(UserStatus.getPinStatus().actions)
    const [userRoles, setUserRoles] = useState([])

    console.log(productionsPageAccess?.new)
    useEffect(() => {
        setLoadingMsg("Loading Settings...")
        setLoading(true)
        const roles = AuthService.getCurrentUser().roles.map(role => {
            return role.replace("ROLE_", "").toLowerCase()
        })

        setUserRoles(roles)

        PermissionsService.getPermissionList("dash_page")
            .then(response => {
                const { PageAccessList } = response.data


                PageAccessList.map(item => {

                    item.users = item.users.map(user => {
                        if (user.id != 1)
                            return { label: user.name, value: user.id }
                    })

                })
                console.log(PageAccessList)
                setPageAccessList(PageAccessList)
                setLoading(false)
            })
        UserService.getAllUsersInfo("dash_page", 0, 10, "")
            .then(response => {
                const filteredUsers = response.data.userslist.map(item => {
                    return { label: item.name, value: item.id }
                })
                setUserList(filteredUsers)
                console.log(filteredUsers)
            })
    }, [])


    const navigate = useNavigate()

    const updateSection = async (pageDetails) => {
        console.log(pageDetails)

        const users = pageDetails.users.map(user => {
            return user != undefined && user.value
        })

        users.push(1)
        setLoadingMsg("Updating Permissions...")
        setLoading(true)

        await PermissionsService.updatePermissions(
            pageDetails.page_name,
            pageDetails?.pin,
            pageDetails.create_admin,
            pageDetails.create_mod,
            pageDetails.edit_admin,
            pageDetails.edit_mod,
            pageDetails.update_admin,
            pageDetails.update_mod,
            pageDetails.delete_admin,
            pageDetails.delete_mod,
            users
        )
            .then(() => {
                setLoadingMsg(null)
                setLoading(false)
                swal("Success!", "Permissions Updated Successfully", "success");
            })
            .catch(error => {
                setLoadingMsg(null)
                setLoading(false)
                swal("Error!", error.response.data.message, "error");
            })
    }

    const handleRoles = (e, pageName) => {
        const updatedPageList = pageAccessList.map(item => {
            if (item.page_name == pageName) {
                item.users = e
            }

            return item
        })
        setPageAccessList(updatedPageList)
    }

    const handlePermissions = (e, pageName, actionType) => {
        const updatedPageList = pageAccessList.map(item => {
            if (item.page_name == pageName) {
                item[actionType] = e ? 1 : 0
            }

            return item
        })
        setPageAccessList(updatedPageList)
    }

    const handlePin = (pin, pageName) => {
        const updatedPageList = pageAccessList.map(item => {
            if (item.page_name == pageName) {
                item["pin"] = pin
            }
            console.log(item)
            return item
        })
        setPageAccessList(updatedPageList)
    }

    const handlePins = (type, status) => {
        const user = AuthService.getCurrentUser()
        const updatedUser = {
            ...user,
            pin: {
                navigation: type == 'navigation' ? status : user.pin.navigation,
                actions: type == 'actions' ? status : user.pin.actions
            }
        }
        localStorage.setItem("user", JSON.stringify(updatedUser));
        
        window.location.reload(false);

        if (type == 'navigation')
            setNavigationPin(status)
        else
            setActionsPin(status)


    }


    return (
        <>
            <CRow>
                <CCol md={8}>

                    <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>Permissions</span>
                </CCol>
                <CCol className='d-flex justify-content-end gap-4'>

                    <CCol md={4}>
                        <CButton
                            color="secondary"
                            // className='default-border'
                            style={{ fontSize: "1em", fontWeight: '600', width: "100%" }}
                            onClick={() => navigate('/dashboard')}
                        ><span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }}>
                                arrow_back
                            </span>{' '}Back</CButton>
                    </CCol>

                </CCol>
            </CRow>
            <hr style={{ backgroundColor: '#000', height: "2px" }} />
            <div className='p-5'>
                {userRoles.includes("superadmin") ? <>
                    <CRow >
                        <CCol md={11}>
                            <span className='fs-5'>Pins</span>
                        </CCol>
                        <CCol>
                            <span className="material-symbols-outlined" style={{ cursor: 'pointer' }} onClick={() => setRawCollapseVisible(!rawCollapseVisible)}>
                                expand_more
                            </span>
                        </CCol>
                        <hr />
                    </CRow>
                    <CRow className='mt-3'>
                        <CCollapse visible={rawCollapseVisible} style={{ marginLeft: '25%' }}>
                            <CRow className="mb-3" >
                                <CFormLabel htmlFor="sPin" className="col-sm-2 col-form-label">User</CFormLabel>
                                <CCol md={1}>
                                    <CFormInput id="name" type='text' placeholder='Enter Pin' />
                                </CCol>
                                <CCol md={2}>
                                    <CButton onClick={() => setVisible(true)} color='light' variant="outline" style={{ color: 'black', borderColor: 'black' }}>Modify Pin</CButton>
                                </CCol>

                            </CRow>
                            <CRow className="mb-3" >
                                <CFormLabel htmlFor="production" className="col-sm-2 col-form-label">Moderator</CFormLabel>
                                <CCol md={1}> <CFormInput id="name" type='text' placeholder='Enter Pin' />
                                </CCol>
                                <CCol md={2}>
                                    <CButton onClick={() => setVisible(true)} color='light' variant="outline" style={{ color: 'black', borderColor: 'black' }}>Modify Pin</CButton>
                                </CCol>

                            </CRow>
                            <CRow className="mb-3" >
                                <CFormLabel htmlFor="Inventory" className="col-sm-2 col-form-label">Admin</CFormLabel>
                                <CCol md={1}>
                                    <CFormInput id="name" type='text' placeholder='Enter Pin' />
                                </CCol>
                                <CCol md={2}>
                                    <CButton onClick={() => setVisible(true)} color='light' variant="outline" style={{ color: 'black', borderColor: 'black' }}>Modify Pin</CButton>
                                </CCol>


                            </CRow>

                        </CCollapse>

                    </CRow>
                </> : null}

                <>
                    <CRow >
                        <CCol md={11}>
                            <span className='fs-5'>Navigation & Actions</span>
                        </CCol>
                        <CCol>
                            <span className="material-symbols-outlined" style={{ cursor: 'pointer' }} onClick={() => setRawCollapseVisible(!rawCollapseVisible)}>
                                expand_more
                            </span>
                        </CCol>
                        <hr />
                    </CRow>
                    <CRow className='mt-3'>
                        <CCollapse visible={rawCollapseVisible} style={{ marginLeft: '25%' }}>
                            <CRow className="mb-3" >
                                <CFormLabel htmlFor="sPin" className="col-sm-2 col-form-label">Navigation</CFormLabel>
                                <CCol md={1}>
                                    <CFormSwitch checked={navigationPin} onChange={(e) => handlePins('navigation', e.target.checked)} style={{ width: "40px" }} size="lg" />
                                </CCol>


                            </CRow>
                            <CRow className="mb-3" >
                                <CFormLabel htmlFor="production" className="col-sm-2 col-form-label">Actions</CFormLabel>
                                <CCol md={1}>
                                    <CFormSwitch checked={actionsPin} onChange={(e) => handlePins('actions', e.target.checked)} style={{ width: "40px" }} size="lg" />
                                </CCol>


                            </CRow>


                        </CCollapse>

                    </CRow>
                </>

                <CRow >
                    <CCol md={11}>
                        <span className='fs-5'>User Pins & Accessibility</span>
                    </CCol>
                    <CCol>
                        <span className="material-symbols-outlined" style={{ cursor: 'pointer' }} onClick={() => setUserPinsCollapseVisible(!userPinsCollapseVisible)}>
                            expand_more
                        </span>
                    </CCol>
                    <hr />
                </CRow>
                <CRow className='mt-3'>
                    <CCollapse visible={userPinsCollapseVisible} className='p-5' style={{ marginLeft: "20px", marginRight: "50px" }}>
                        <CTable borderless className='p-5'>
                            <CTableHead style={{ borderStyle: 'solid', borderWidth: '0 0 2px 0' }}>
                                <CTableRow >
                                    <CTableHeaderCell scope="col" width={200}>Page Section</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" style={{ textAlign: "center" }} width={150}>Pin</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Users & Accessibility</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" width={150}>Action</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody >
                                <CTableRow >
                                    <CTableDataCell scope="col" className='p-3'>{PAGES.Production}</CTableDataCell>
                                    <CTableHeaderCell scope="row" className='p-3'>
                                        <CFormInput id="name" type='text' placeholder='Enter Pin' onChange={(e) => handlePin(e.target.value, PAGES.Production)} />
                                    </CTableHeaderCell>
                                    <CTableDataCell className='p-3'>
                                        <Select
                                            isMulti
                                            // aria-label="Default select example"
                                            // id="inputState"
                                            // name="features"
                                            // label="features"
                                            onChange={(e) => handleRoles(e, PAGES.Production)}
                                            // value={role}
                                            value={pageAccessList.find(o => o.page_name === PAGES.Production)?.users}
                                            options={userList}
                                        // onChange={(e) => handlePersonas(e)}
                                        ></Select></CTableDataCell>

                                    <CTableDataCell scope="col" className='p-3'>
                                        <CButton className='blue-button' variant='outline' onClick={() => updateSection(pageAccessList.find(o => o.page_name === PAGES.Production))}>Update</CButton>
                                    </CTableDataCell>
                                </CTableRow>
                                <CTableRow >
                                    <CTableDataCell scope="col" className='p-3'></CTableDataCell>
                                    <CTableHeaderCell scope="row" className='p-3 ' style={{ textAlign: 'left' }} >
                                        Creation :
                                    </CTableHeaderCell>
                                    <CTableDataCell className="d-flex justify-content-around p-3">
                                        <CFormCheck id="flexCheckDefault" label="Admin" checked={pageAccessList.find(o => o.page_name === PAGES.Production)?.create_admin} onChange={e => handlePermissions(e.target.checked, PAGES.Production, "create_admin")} />
                                        <CFormCheck id="flexCheckDefault" label="Moderator" checked={pageAccessList.find(o => o.page_name === PAGES.Production)?.create_mod} onChange={e => handlePermissions(e.target.checked, PAGES.Production, "create_mod")} />
                                    </CTableDataCell>

                                </CTableRow>
                                <CTableRow >
                                    <CTableDataCell scope="col" className='p-3'></CTableDataCell>
                                    <CTableHeaderCell scope="row" className='p-3 ' >
                                        Edit :
                                    </CTableHeaderCell>
                                    <CTableDataCell className="d-flex justify-content-around p-3">
                                        <CFormCheck id="flexCheckDefault" label="Admin" checked={pageAccessList.find(o => o.page_name === PAGES.Production)?.edit_admin} onChange={e => handlePermissions(e.target.checked, PAGES.Production, "edit_admin")} />
                                        <CFormCheck id="flexCheckDefault" label="Moderator" checked={pageAccessList.find(o => o.page_name === PAGES.Production)?.edit_mod} onChange={e => handlePermissions(e.target.checked, PAGES.Production, "edit_mod")} />
                                    </CTableDataCell>

                                </CTableRow>
                                <CTableRow >
                                    <CTableDataCell scope="col" className='p-3'></CTableDataCell>
                                    <CTableHeaderCell scope="row" className='p-3 ' >
                                        Update :
                                    </CTableHeaderCell>
                                    <CTableDataCell className="d-flex justify-content-around p-3">
                                        <CFormCheck id="flexCheckDefault" label="Admin" checked={pageAccessList.find(o => o.page_name === PAGES.Production)?.update_admin} onChange={e => handlePermissions(e.target.checked, PAGES.Production, "update_admin")} />
                                        <CFormCheck id="flexCheckDefault" label="Moderator" checked={pageAccessList.find(o => o.page_name === PAGES.Production)?.update_mod} onChange={e => handlePermissions(e.target.checked, PAGES.Production, "update_mod")} />
                                    </CTableDataCell>

                                </CTableRow>
                                <CTableRow style={{ borderStyle: 'solid', borderWidth: '0 0 2px 0' }}>
                                    <CTableDataCell scope="col" className='p-3'></CTableDataCell>
                                    <CTableHeaderCell scope="row" className='p-3 ' >
                                        Delete :
                                    </CTableHeaderCell>
                                    <CTableDataCell className="d-flex justify-content-around p-3">
                                        <CFormCheck id="flexCheckDefault" label="Admin" checked={pageAccessList.find(o => o.page_name === PAGES.Production)?.delete_admin} onChange={e => handlePermissions(e.target.checked, PAGES.Production, "delete_admin")} />
                                        <CFormCheck id="flexCheckDefault" label="Moderator" checked={pageAccessList.find(o => o.page_name === PAGES.Production)?.delete_mod} onChange={e => handlePermissions(e.target.checked, PAGES.Production, "delete_mod")} />
                                    </CTableDataCell>

                                </CTableRow>

                                <CTableRow className='mt-3'>
                                    <CTableDataCell scope="col" className='p-3'>PlyWood</CTableDataCell>
                                    <CTableHeaderCell scope="row" className='p-3'>
                                        <CFormInput id="name" type='text' placeholder='Enter Pin' onChange={(e) => handlePin(e.target.value, PAGES.PLYWOOD)} />
                                    </CTableHeaderCell>
                                    <CTableDataCell className='p-3'>
                                        <Select
                                            isMulti
                                            // aria-label="Default select example"
                                            // id="inputState"
                                            // name="features"
                                            // label="features"
                                            onChange={(e) => handleRoles(e, PAGES.PLYWOOD)}
                                            value={pageAccessList.find(o => o.page_name === PAGES.PLYWOOD)?.users}
                                            options={userList}
                                        // onChange={(e) => handlePersonas(e)}
                                        ></Select></CTableDataCell>

                                    <CTableDataCell scope="col" className='p-3'>
                                        <CButton className='blue-button' variant='outline' onClick={() => updateSection(pageAccessList.find(o => o.page_name === PAGES.PLYWOOD))}>Update</CButton>
                                    </CTableDataCell>
                                </CTableRow>
                                <CTableRow >
                                    <CTableDataCell scope="col" className='p-3'></CTableDataCell>
                                    <CTableHeaderCell scope="row" className='p-3 ' style={{ textAlign: 'left' }} >
                                        Creation :
                                    </CTableHeaderCell>
                                    <CTableDataCell className="d-flex justify-content-around p-3">

                                        <CFormCheck id="flexCheckDefault" label="Admin" checked={pageAccessList?.find(o => o.page_name === PAGES.PLYWOOD)?.create_admin} onChange={e => handlePermissions(e.target.checked, PAGES.PLYWOOD, "create_mod")} />
                                        <CFormCheck id="flexCheckDefault" label="Moderator" checked={pageAccessList?.find(o => o.page_name === PAGES.PLYWOOD)?.create_mod} onChange={e => handlePermissions(e.target.checked, PAGES.PLYWOOD, "create_mod")} />
                                    </CTableDataCell>

                                </CTableRow>
                                <CTableRow >
                                    <CTableDataCell scope="col" className='p-3'></CTableDataCell>
                                    <CTableHeaderCell scope="row" className='p-3 ' >
                                        Edit :
                                    </CTableHeaderCell>
                                    <CTableDataCell className="d-flex justify-content-around p-3">

                                        <CFormCheck id="flexCheckDefault" label="Admin" checked={pageAccessList.find(o => o.page_name === PAGES.PLYWOOD)?.edit_admin} onChange={e => handlePermissions(e.target.checked, PAGES.PLYWOOD, "edit_admin")} />
                                        <CFormCheck id="flexCheckDefault" label="Moderator" checked={pageAccessList.find(o => o.page_name === PAGES.PLYWOOD)?.edit_mod} onChange={e => handlePermissions(e.target.checked, PAGES.PLYWOOD, "edit_mod")} />
                                    </CTableDataCell>

                                </CTableRow>
                                <CTableRow >
                                    <CTableDataCell scope="col" className='p-3'></CTableDataCell>
                                    <CTableHeaderCell scope="row" className='p-3 ' >
                                        Update :
                                    </CTableHeaderCell>
                                    <CTableDataCell className="d-flex justify-content-around p-3">
                                        <CFormCheck id="flexCheckDefault" label="Admin" checked={pageAccessList.find(o => o.page_name === PAGES.PLYWOOD)?.update_admin} onChange={e => handlePermissions(e.target.checked, PAGES.PLYWOOD, "update_admin")} />
                                        <CFormCheck id="flexCheckDefault" label="Moderator" checked={pageAccessList.find(o => o.page_name === PAGES.PLYWOOD)?.update_mod} onChange={e => handlePermissions(e.target.checked, PAGES.PLYWOOD, "update_mod")} />
                                    </CTableDataCell>

                                </CTableRow>
                                <CTableRow style={{ borderStyle: 'solid', borderWidth: '0 0 2px 0' }}>
                                    <CTableDataCell scope="col" className='p-3'></CTableDataCell>
                                    <CTableHeaderCell scope="row" className='p-3 ' >
                                        Delete :
                                    </CTableHeaderCell>
                                    <CTableDataCell className="d-flex justify-content-around p-3">
                                        <CFormCheck id="flexCheckDefault" label="Admin" checked={pageAccessList.find(o => o.page_name === PAGES.PLYWOOD)?.delete_admin} onChange={e => handlePermissions(e.target.checked, PAGES.PLYWOOD, "delete_admin")} />
                                        <CFormCheck id="flexCheckDefault" label="Moderator" checked={pageAccessList.find(o => o.page_name === PAGES.PLYWOOD)?.delete_mod} onChange={e => handlePermissions(e.target.checked, PAGES.PLYWOOD, "delete_mod")} />
                                    </CTableDataCell>

                                </CTableRow>

                                <CTableRow >
                                    <CTableDataCell scope="col" className='p-3'>Raw Materials</CTableDataCell>
                                    <CTableHeaderCell scope="row" className='p-3'>
                                        <CFormInput id="name" type='text' placeholder='Enter Pin' onChange={(e) => handlePin(e.target.value, PAGES.RAW_MATERIAL)} />
                                    </CTableHeaderCell>
                                    <CTableDataCell className='p-3'>
                                        <Select
                                            isMulti
                                            // aria-label="Default select example"
                                            // id="inputState"
                                            // name="features"
                                            // label="features"
                                            onChange={(e) => handleRoles(e, PAGES.RAW_MATERIAL)}
                                            value={pageAccessList.find(o => o.page_name === PAGES.RAW_MATERIAL)?.users}
                                            options={userList}
                                        // onChange={(e) => handlePersonas(e)}
                                        ></Select></CTableDataCell>

                                    <CTableDataCell scope="col" className='p-3'>
                                        <CButton className='blue-button' variant='outline' onClick={() => updateSection(pageAccessList.find(o => o.page_name === PAGES.RAW_MATERIAL))}>Update</CButton>
                                    </CTableDataCell>
                                </CTableRow>
                                <CTableRow >
                                    <CTableDataCell scope="col" className='p-3'></CTableDataCell>
                                    <CTableHeaderCell scope="row" className='p-3 ' style={{ textAlign: 'left' }} >
                                        Creation :
                                    </CTableHeaderCell>
                                    <CTableDataCell className="d-flex justify-content-around p-3">

                                        <CFormCheck id="flexCheckDefault" label="Admin" checked={pageAccessList.find(o => o.page_name === PAGES.RAW_MATERIAL)?.create_admin} onChange={e => handlePermissions(e.target.checked, PAGES.RAW_MATERIAL, "create_mod")} />
                                        <CFormCheck id="flexCheckDefault" label="Moderator" checked={pageAccessList.find(o => o.page_name === PAGES.RAW_MATERIAL)?.create_mod} onChange={e => handlePermissions(e.target.checked, PAGES.RAW_MATERIAL, "create_mod")} />
                                    </CTableDataCell>

                                </CTableRow>
                                <CTableRow >
                                    <CTableDataCell scope="col" className='p-3'></CTableDataCell>
                                    <CTableHeaderCell scope="row" className='p-3 ' >
                                        Edit :
                                    </CTableHeaderCell>
                                    <CTableDataCell className="d-flex justify-content-around p-3">
                                        <CFormCheck id="flexCheckDefault" label="Admin" checked={pageAccessList.find(o => o.page_name === PAGES.RAW_MATERIAL)?.edit_admin} onChange={e => handlePermissions(e.target.checked, PAGES.RAW_MATERIAL, "edit_admin")} />
                                        <CFormCheck id="flexCheckDefault" label="Moderator" checked={pageAccessList.find(o => o.page_name === PAGES.RAW_MATERIAL)?.edit_mod} onChange={e => handlePermissions(e.target.checked, PAGES.RAW_MATERIAL, "edit_mod")} />
                                    </CTableDataCell>

                                </CTableRow>
                                <CTableRow >
                                    <CTableDataCell scope="col" className='p-3'></CTableDataCell>
                                    <CTableHeaderCell scope="row" className='p-3 ' >
                                        Update :
                                    </CTableHeaderCell>
                                    <CTableDataCell className="d-flex justify-content-around p-3">
                                        <CFormCheck id="flexCheckDefault" label="Admin" checked={pageAccessList.find(o => o.page_name === PAGES.RAW_MATERIAL)?.update_admin} onChange={e => handlePermissions(e.target.checked, PAGES.RAW_MATERIAL, "update_admin")} />
                                        <CFormCheck id="flexCheckDefault" label="Moderator" checked={pageAccessList.find(o => o.page_name === PAGES.RAW_MATERIAL)?.update_mod} onChange={e => handlePermissions(e.target.checked, PAGES.RAW_MATERIAL, "update_mod")} />
                                    </CTableDataCell>

                                </CTableRow>
                                <CTableRow style={{ borderStyle: 'solid', borderWidth: '0 0 2px 0' }}>
                                    <CTableDataCell scope="col" className='p-3'></CTableDataCell>
                                    <CTableHeaderCell scope="row" className='p-3 ' >
                                        Delete :
                                    </CTableHeaderCell>
                                    <CTableDataCell className="d-flex justify-content-around p-3">
                                        <CFormCheck id="flexCheckDefault" label="Admin" checked={pageAccessList.find(o => o.page_name === PAGES.RAW_MATERIAL)?.delete_admin} onChange={e => handlePermissions(e.target.checked, PAGES.RAW_MATERIAL, "delete_admin")} />
                                        <CFormCheck id="flexCheckDefault" label="Moderator" checked={pageAccessList.find(o => o.page_name === PAGES.RAW_MATERIAL)?.delete_mod} onChange={e => handlePermissions(e.target.checked, PAGES.RAW_MATERIAL, "delete_mod")} />
                                    </CTableDataCell>

                                </CTableRow>

                                <CTableRow >
                                    <CTableDataCell scope="col" className='p-3'>{PAGES.SALES_ORDER}</CTableDataCell>
                                    <CTableHeaderCell scope="row" className='p-3'>
                                        <CFormInput id="name" type='text' placeholder='Enter Pin' onChange={(e) => handlePin(e.target.value, PAGES.SALES_ORDER)} />
                                    </CTableHeaderCell>
                                    <CTableDataCell className='p-3'>
                                        <Select
                                            isMulti
                                            // aria-label="Default select example"
                                            // id="inputState"
                                            // name="features"
                                            // label="features"
                                            // onChange={(e) => setRole(e)}
                                            onChange={(e) => handleRoles(e, PAGES.SALES_ORDER)}
                                            value={pageAccessList.find(o => o.page_name === PAGES.SALES_ORDER)?.users}
                                            options={userList}
                                        // onChange={(e) => handlePersonas(e)}
                                        ></Select></CTableDataCell>

                                    <CTableDataCell scope="col" className='p-3'>
                                        <CButton className='blue-button' variant='outline' onClick={() => updateSection(pageAccessList.find(o => o.page_name === PAGES.SALES_ORDER))}>Update</CButton>
                                    </CTableDataCell>
                                </CTableRow>
                                <CTableRow >
                                    <CTableDataCell scope="col" className='p-3'></CTableDataCell>
                                    <CTableHeaderCell scope="row" className='p-3 ' style={{ textAlign: 'left' }} >
                                        Creation :
                                    </CTableHeaderCell>
                                    <CTableDataCell className="d-flex justify-content-around p-3">

                                        <CFormCheck id="flexCheckDefault" label="Admin" checked={pageAccessList.find(o => o.page_name === PAGES.SALES_ORDER)?.create_admin} onChange={e => handlePermissions(e.target.checked, PAGES.SALES_ORDER, "create_mod")} />
                                        <CFormCheck id="flexCheckDefault" label="Moderator" checked={pageAccessList.find(o => o.page_name === PAGES.SALES_ORDER)?.create_mod} onChange={e => handlePermissions(e.target.checked, PAGES.SALES_ORDER, "create_mod")} />
                                    </CTableDataCell>

                                </CTableRow>
                                <CTableRow >
                                    <CTableDataCell scope="col" className='p-3'></CTableDataCell>
                                    <CTableHeaderCell scope="row" className='p-3 ' >
                                        Edit :
                                    </CTableHeaderCell>
                                    <CTableDataCell className="d-flex justify-content-around p-3">

                                        <CFormCheck id="flexCheckDefault" label="Admin" checked={pageAccessList.find(o => o.page_name === PAGES.SALES_ORDER)?.edit_admin} onChange={e => handlePermissions(e.target.checked, PAGES.SALES_ORDER, "edit_admin")} />
                                        <CFormCheck id="flexCheckDefault" label="Moderator" checked={pageAccessList.find(o => o.page_name === PAGES.SALES_ORDER)?.edit_admin} onChange={e => handlePermissions(e.target.checked, PAGES.SALES_ORDER, "edit_admin")} />
                                    </CTableDataCell>

                                </CTableRow>
                                <CTableRow >
                                    <CTableDataCell scope="col" className='p-3'></CTableDataCell>
                                    <CTableHeaderCell scope="row" className='p-3 ' >
                                        Update :
                                    </CTableHeaderCell>
                                    <CTableDataCell className="d-flex justify-content-around p-3">
                                        <CFormCheck id="flexCheckDefault" label="Admin" checked={pageAccessList.find(o => o.page_name === PAGES.SALES_ORDER)?.update_admin} onChange={e => handlePermissions(e.target.checked, PAGES.SALES_ORDER, "update_admin")} />
                                        <CFormCheck id="flexCheckDefault" label="Moderator" checked={pageAccessList.find(o => o.page_name === PAGES.SALES_ORDER)?.update_mod} onChange={e => handlePermissions(e.target.checked, PAGES.SALES_ORDER, "update_mod")} />
                                    </CTableDataCell>

                                </CTableRow>
                                <CTableRow style={{ borderStyle: 'solid', borderWidth: '0 0 2px 0' }}>
                                    <CTableDataCell scope="col" className='p-3'></CTableDataCell>
                                    <CTableHeaderCell scope="row" className='p-3 ' >
                                        Delete :
                                    </CTableHeaderCell>
                                    <CTableDataCell className="d-flex justify-content-around p-3">

                                        <CFormCheck id="flexCheckDefault" label="Admin" checked={pageAccessList.find(o => o.page_name === PAGES.SALES_ORDER)?.delete_admin} onChange={e => handlePermissions(e.target.checked, PAGES.SALES_ORDER, "delete_admin")} />
                                        <CFormCheck id="flexCheckDefault" label="Moderator" checked={pageAccessList.find(o => o.page_name === PAGES.SALES_ORDER)?.delete_mod} onChange={e => handlePermissions(e.target.checked, PAGES.SALES_ORDER, "delete_mod")} />
                                    </CTableDataCell>

                                </CTableRow>

                                <CTableRow >
                                    <CTableDataCell scope="col" className='p-3'>Customers</CTableDataCell>
                                    <CTableHeaderCell scope="row" className='p-3'>
                                        <CFormInput id="name" type='text' placeholder='Enter Pin' onChange={(e) => handlePin(e.target.value, PAGES.CUSTOMER)} />
                                    </CTableHeaderCell>
                                    <CTableDataCell className='p-3'>
                                        <Select
                                            isMulti
                                            // aria-label="Default select example"
                                            // id="inputState"
                                            // name="features"
                                            // label="features"
                                            onChange={(e) => handleRoles(e, PAGES.CUSTOMER)}

                                            value={pageAccessList.find(o => o.page_name === PAGES.CUSTOMER)?.users}
                                            options={userList}
                                        // onChange={(e) => handlePersonas(e)}
                                        ></Select></CTableDataCell>

                                    <CTableDataCell scope="col" className='p-3'>
                                        <CButton className='blue-button' variant='outline' onClick={() => updateSection(pageAccessList.find(o => o.page_name === PAGES.CUSTOMER))}>Update</CButton>
                                    </CTableDataCell>
                                </CTableRow>
                                <CTableRow >
                                    <CTableDataCell scope="col" className='p-3'></CTableDataCell>
                                    <CTableHeaderCell scope="row" className='p-3 ' style={{ textAlign: 'left' }} >
                                        Creation :
                                    </CTableHeaderCell>
                                    <CTableDataCell className="d-flex justify-content-around p-3">

                                        <CFormCheck id="flexCheckDefault" label="Admin" checked={pageAccessList.find(o => o.page_name === PAGES.CUSTOMER)?.create_admin} onChange={e => handlePermissions(e.target.checked, PAGES.CUSTOMER, "create_mod")} />
                                        <CFormCheck id="flexCheckDefault" label="Moderator" checked={pageAccessList.find(o => o.page_name === PAGES.CUSTOMER)?.create_mod} onChange={e => handlePermissions(e.target.checked, PAGES.CUSTOMER, "create_mod")} />
                                    </CTableDataCell>

                                </CTableRow>
                                <CTableRow >
                                    <CTableDataCell scope="col" className='p-3'></CTableDataCell>
                                    <CTableHeaderCell scope="row" className='p-3 ' >
                                        Edit :
                                    </CTableHeaderCell>
                                    <CTableDataCell className="d-flex justify-content-around p-3">

                                        <CFormCheck id="flexCheckDefault" label="Admin" checked={pageAccessList.find(o => o.page_name === PAGES.CUSTOMER)?.edit_admin} onChange={e => handlePermissions(e.target.checked, PAGES.CUSTOMER, "edit_admin")} />
                                        <CFormCheck id="flexCheckDefault" label="Moderator" checked={pageAccessList.find(o => o.page_name === PAGES.CUSTOMER)?.edit_mod} onChange={e => handlePermissions(e.target.checked, PAGES.CUSTOMER, "edit_mod")} />
                                    </CTableDataCell>

                                </CTableRow>
                                <CTableRow >
                                    <CTableDataCell scope="col" className='p-3'></CTableDataCell>
                                    <CTableHeaderCell scope="row" className='p-3 ' >
                                        Update :
                                    </CTableHeaderCell>
                                    <CTableDataCell className="d-flex justify-content-around p-3">
                                        <CFormCheck id="flexCheckDefault" label="Admin" checked={pageAccessList.find(o => o.page_name === PAGES.CUSTOMER)?.update_admin} onChange={e => handlePermissions(e.target.checked, PAGES.CUSTOMER, "update_admin")} />
                                        <CFormCheck id="flexCheckDefault" label="Moderator" checked={pageAccessList.find(o => o.page_name === PAGES.CUSTOMER)?.update_mod} onChange={e => handlePermissions(e.target.checked, PAGES.CUSTOMER, "update_mod")} />
                                    </CTableDataCell>

                                </CTableRow>
                                <CTableRow style={{ borderStyle: 'solid', borderWidth: '0 0 2px 0' }}>
                                    <CTableDataCell scope="col" className='p-3'></CTableDataCell>
                                    <CTableHeaderCell scope="row" className='p-3 ' >
                                        Delete :
                                    </CTableHeaderCell>
                                    <CTableDataCell className="d-flex justify-content-around p-3">
                                        <CFormCheck id="flexCheckDefault" label="Admin" checked={pageAccessList.find(o => o.page_name === PAGES.CUSTOMER)?.delete_admin} onChange={e => handlePermissions(e.target.checked, PAGES.CUSTOMER, "delete_admin")} />
                                        <CFormCheck id="flexCheckDefault" label="Moderator" checked={pageAccessList.find(o => o.page_name === PAGES.CUSTOMER)?.delete_mod} onChange={e => handlePermissions(e.target.checked, PAGES.CUSTOMER, "delete_mod")} />
                                    </CTableDataCell>

                                </CTableRow>

                                <CTableRow >
                                    <CTableDataCell scope="col" className='p-3'>Activity Logs</CTableDataCell>
                                    <CTableHeaderCell scope="row" className='p-3'>
                                        <CFormInput id="name" type='text' placeholder='Enter Pin' onChange={(e) => handlePin(e.target.value, PAGES.ACTIVITY_LOGS)} />
                                    </CTableHeaderCell>
                                    <CTableDataCell className='p-3'>
                                        <Select
                                            isMulti
                                            // aria-label="Default select example"
                                            // id="inputState"
                                            // name="features"
                                            // label="features"
                                            onChange={(e) => handleRoles(e, PAGES.ACTIVITY_LOGS)}

                                            value={pageAccessList.find(o => o.page_name === PAGES.ACTIVITY_LOGS)?.users}
                                            options={userList}
                                        // onChange={(e) => handlePersonas(e)}
                                        ></Select></CTableDataCell>

                                    <CTableDataCell scope="col" className='p-3'>
                                        <CButton className='blue-button' variant='outline' onClick={() => updateSection(pageAccessList.find(o => o.page_name === PAGES.ACTIVITY_LOGS))}>Update</CButton>
                                    </CTableDataCell>
                                </CTableRow>
                                <CTableRow >
                                    <CTableDataCell scope="col" className='p-3'></CTableDataCell>
                                    <CTableHeaderCell scope="row" className='p-3 ' style={{ textAlign: 'left' }} >
                                        Creation :
                                    </CTableHeaderCell>
                                    <CTableDataCell className="d-flex justify-content-around p-3">

                                        <CFormCheck id="flexCheckDefault" label="Admin" checked={pageAccessList.find(o => o.page_name === PAGES.ACTIVITY_LOGS)?.create_admin} onChange={e => handlePermissions(e.target.checked, PAGES.ACTIVITY_LOGS, "create_mod")} />
                                        <CFormCheck id="flexCheckDefault" label="Moderator" checked={pageAccessList.find(o => o.page_name === PAGES.ACTIVITY_LOGS)?.create_mod} onChange={e => handlePermissions(e.target.checked, PAGES.ACTIVITY_LOGS, "create_mod")} />
                                    </CTableDataCell>

                                </CTableRow>
                                <CTableRow >
                                    <CTableDataCell scope="col" className='p-3'></CTableDataCell>
                                    <CTableHeaderCell scope="row" className='p-3 ' >
                                        Edit :
                                    </CTableHeaderCell>
                                    <CTableDataCell className="d-flex justify-content-around p-3">

                                        <CFormCheck id="flexCheckDefault" label="Admin" checked={pageAccessList.find(o => o.page_name === PAGES.ACTIVITY_LOGS)?.edit_admin} onChange={e => handlePermissions(e.target.checked, PAGES.ACTIVITY_LOGS, "edit_admin")} />
                                        <CFormCheck id="flexCheckDefault" label="Moderator" checked={pageAccessList.find(o => o.page_name === PAGES.ACTIVITY_LOGS)?.edit_mod} onChange={e => handlePermissions(e.target.checked, PAGES.ACTIVITY_LOGS, "edit_mod")} />
                                    </CTableDataCell>

                                </CTableRow>
                                <CTableRow >
                                    <CTableDataCell scope="col" className='p-3'></CTableDataCell>
                                    <CTableHeaderCell scope="row" className='p-3 ' >
                                        Update :
                                    </CTableHeaderCell>
                                    <CTableDataCell className="d-flex justify-content-around p-3">
                                        <CFormCheck id="flexCheckDefault" label="Admin" checked={pageAccessList.find(o => o.page_name === PAGES.ACTIVITY_LOGS)?.update_admin} onChange={e => handlePermissions(e.target.checked, PAGES.ACTIVITY_LOGS, "update_admin")} />
                                        <CFormCheck id="flexCheckDefault" label="Moderator" checked={pageAccessList.find(o => o.page_name === PAGES.ACTIVITY_LOGS)?.update_mod} onChange={e => handlePermissions(e.target.checked, PAGES.ACTIVITY_LOGS, "update_mod")} />
                                    </CTableDataCell>

                                </CTableRow>
                                <CTableRow >
                                    <CTableDataCell scope="col" className='p-3'></CTableDataCell>
                                    <CTableHeaderCell scope="row" className='p-3 ' >
                                        Delete :
                                    </CTableHeaderCell>
                                    <CTableDataCell className="d-flex justify-content-around p-3">
                                        <CFormCheck id="flexCheckDefault" label="Admin" checked={pageAccessList.find(o => o.page_name === PAGES.ACTIVITY_LOGS)?.delete_admin} onChange={e => handlePermissions(e.target.checked, PAGES.ACTIVITY_LOGS, "delete_admin")} />
                                        <CFormCheck id="flexCheckDefault" label="Moderator" checked={pageAccessList.find(o => o.page_name === PAGES.ACTIVITY_LOGS)?.delete_mod} onChange={e => handlePermissions(e.target.checked, PAGES.ACTIVITY_LOGS, "delete_mod")} />
                                    </CTableDataCell>

                                </CTableRow>



                            </CTableBody>
                        </CTable>

                    </CCollapse>

                </CRow>
            </div>
            <PinResetModel visible={visible} onClose={(val) => setVisible(val)} role={"Super Admin"} />
            <LoadingModel visible={loading} loadingMsg={loadingMsg} onClose={(val) => setLoading(false)} />
        </>
    )
}

export default Permissions