import { cilWarning } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CAlert, CButton, CCol, CFormInput, CFormLabel, CModal, CModalBody, CRow } from '@coreui/react'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { ACTIONS, PAGES } from 'src/hooks/constants'
import ActivityLogsService from 'src/services/ActivityLogsService'
import AuthService from 'src/services/AuthService'
import PermissionsService from 'src/services/PermissionsService'
import PlyWoodTypesServices from 'src/services/PlyWoodTypesServices'
import ProductionService from 'src/services/ProductionService'
import UserService from 'src/services/UserService'

import swal from 'sweetalert'
import LoadingModel from './Models/LoadingModel'


const AddProductionRecord = (props) => {
    const [visible, setVisible] = useState(false)

    const [loading, setLoading] = useState(false)
    const [loadingMsg, setLoadingMsg] = useState(null)

    const [alert, setAlert] = useState(false)
    const [validationAlert, setValidationAlert] = useState(false)
    const [validationMsg, setValidationMsg] = useState("")
    const [isFocus, setIsFocus] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const [isHovered, setIsHovered] = useState(false)
    const [successRecordId, setSuccessRecordId] = useState(null)

    const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DDThh:mm"))
    const [size, setSize] = useState(null)
    const [qty, setQty] = useState(null)

    const [pin, setPin] = useState("")

    const [plywoodTypes, setPlywoodTypes] = useState([])

    const inputRef = useRef()

    let items = [
        "React", "CSS", "HTML", "Red", "Roll", "Reel"
    ]

    const handleInputValue = (val) => {
        setInputValue(val)
        // setCount(0)
    }

    const submitProductionDetails = async () => {

        if (!qty) {
            setValidationAlert(true)
            setValidationMsg("Please fill the required fields : Qty")
            return
        }

        if (date == "") {
            setValidationAlert(true)
            setValidationMsg("Please fill the required fields : Date")
            return
        }

        if (!size) {
            setValidationAlert(true)
            setValidationMsg("Please fill the required fields : Size")
            return
        }

        if (inputValue == "") {
            setValidationAlert(true)
            setValidationMsg("Please fill the required fields : Type")
            return
        }

        setLoading(true)
        setLoadingMsg("Creating Production Record...")

        await ProductionService.createNewProductionRecord("dash_page", date, Number(size), inputValue, Number(qty)).then(response => {
            setAlert(true)
            clearFields()
            setSuccessRecordId(response.data.pid)

            if (AuthService.getCurrentUser()) ActivityLogsService.createLog(PAGES.Production, AuthService.getCurrentUser().name, ACTIONS.CREATE, 1)
                .catch((error) => {
                    console.log(error)
                    swal("Error!", "Something Went Wrong With Logging", "error");
                })
            setLoading(false)
            setLoadingMsg(null)
        }).catch(error => {
            setAlert(false)
            if (AuthService.getCurrentUser()) ActivityLogsService.createLog(PAGES.Production, AuthService.getCurrentUser().name, ACTIONS.CREATE, 0)
                .catch((error) => {
                    console.log(error)
                    swal("Error!", "Something Went Wrong With Logging", "error");
                })
            setLoading(false)
            setLoadingMsg(null)
            swal("Error!", error.response.data.message, "error");

        })
    }

    const authenticatePin = async () => {
        setLoading(true)
        setLoadingMsg("")
        let auth = true
        const roles = AuthService.getCurrentUser() ? AuthService.getCurrentUser().roles.map(role => {
            return role.replace("ROLE_", "").toLowerCase()
        }) : []
        let access = null

        if (roles.length == 0) {
            roles.push("user")
        }
        const newRoles = []
     
        if (auth) {
            await PermissionsService.actionPinCodeAuth(["user", "admin", "moderator", "superadmin"], pin)
                .then(response => {
                    submitProductionDetails();
                    setPin("")
                    setVisible(false)
                    setLoading(false)
                }).catch(error => {
                    setPin("")
                    swal("Error!", error.response.data.message, "error");
                    setLoading(false)

                })
        } else {
            if (access["create_admin"] == 1) {
                await PermissionsService.actionPinCodeAuth(['admin'], pin)
                    .then(response => {
                        submitProductionDetails();
                        setPin("")
                        setVisible(false)
                        setLoading(false)
                    }).catch(error => {
                        setPin("")
                        swal("Error!", "Unauthorized. Please Enter Admin Pin Code", "error");
                        setLoading(false)
                    })
            }
            setPin("")
            swal("Error!", "Unauthorized", "error");
            setLoading(false)
        }

    }

    const handleKeypress = e => {
        if (e.key === 'Enter') {
            authenticatePin()
        }
    };

    const clearFields = () => {
        setDate(null)
        setSize(null)
        setInputValue("")
        setQty(null)
    }

    useEffect(() => {
        getPlyWoodTypes()
    }, [])

    const getPlyWoodTypes = async () => {
        setLoading(true)
        setLoadingMsg("Loading Plywood Types...")

        await PlyWoodTypesServices.getPlyWoodTypesListAll("dash_page", "dash_page")
            .then(response => {
                const filteredArray = response.data.plyWoodsInfoAll.map(item => {
                    return item.type
                })
                const uniqueChars = [...new Set(filteredArray)]
                setPlywoodTypes(uniqueChars)

                setLoading(false)
                setLoadingMsg(null)
            })
            .catch(error => {
                setLoading(false)
                setLoadingMsg(null)

                swal("Error!", error.response.data.message, "error");
            })

    }

    return (
        <div className='body mb-5 d-flex flex-column min-vh-100' style={{ overflow: 'hidden' }}>
            {alert ? <CAlert
                color="success"
                style={{ textAlign: "center", }}
                dismissible
                onClose={() => setAlert(!alert)}
            >
                Production <strong>#PIN{successRecordId}</strong> Recorded Successfully
            </CAlert> : <div className='mb-5'></div>}
            <CRow>
                <CCol
                    className='add_header'
                    style={{ textAlign: 'center', fontSize: '2.5em' }}
                >
                    Add New Production Record
                </CCol>
            </CRow>

            <CRow className="mt-5">
                <CCol></CCol>
                <CCol>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="date" className="col-sm-2 col-form-label">Date</CFormLabel>
                        <CCol sm={10}>
                            <CFormInput
                                style={{ backgroundColor: '#F2F2F2' }}
                                type="datetime-local"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                id="date" />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="size" className="col-sm-2 col-form-label">Size</CFormLabel>
                        <CCol sm={10}>
                            <CFormInput
                                style={{ backgroundColor: '#F2F2F2' }}
                                type="number"
                                placeholder="PlyWood Size in (mm)"
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                                id="size" />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="type" className="col-sm-2 col-form-label">Type</CFormLabel>
                        <CCol sm={10} style={{ position: 'relative' }}>
                            <CFormInput
                                style={{ backgroundColor: '#F2F2F2' }}
                                type="text"
                                autocomplete="off"
                                placeholder="PlyWood Type Name"
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => {
                                    if (!isHovered) {
                                        setIsFocus(false)
                                    }
                                }}
                                value={inputValue}
                                ref={inputRef}
                                onChange={(e) => handleInputValue(e.target.value)}
                                id="type" />
                            {isFocus && (
                                <div
                                    className='shadow-lg w-full'
                                    style={{ position: 'absolute', width: '95%', backgroundColor: "#fff" }}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    {plywoodTypes.map((suggest, key) => {
                                        const isMatch = suggest.toLowerCase().indexOf(inputValue.toLowerCase()) > -1

                                        return (
                                            <div key={key}>
                                                {isMatch && (
                                                    <div
                                                        className='p-2 dropdown-row'
                                                        style={{ cursor: 'pointer', fontSize: '0.8em' }}
                                                        onClick={() => {
                                                            setInputValue(suggest)
                                                            inputRef.current.focus()
                                                        }}>
                                                        {suggest}
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>)}
                        </CCol>
                    </CRow>

                    <CRow className="mb-4">
                        <CFormLabel htmlFor="qty" className="col-sm-2 col-form-label">Qty</CFormLabel>
                        <CCol sm={10}>
                            <CFormInput
                                style={{ backgroundColor: '#F2F2F2' }}
                                type="number"
                                placeholder="How many?"
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                                autoComplete={items}
                                id="qty" />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CAlert color="warning" dismissible visible={validationAlert} onClose={() => setValidationAlert(false)} className="d-flex align-items-center">
                            <CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={24} height={24} />
                            <div>{validationMsg}</div>
                        </CAlert>
                    </CRow>
                    <div className="mt-5 d-flex flex-row-reverse" >
                        <CButton
                            onClick={() => setVisible(!visible)}
                            color="success"
                            shape="rounded-pill"
                            style={{ color: "#fff", backgroundColor: '#00B050', paddingRight: "30px", paddingLeft: "30px", fontSize: "0.9em", fontWeight: "700" }}
                        >
                            SUBMIT
                        </CButton>
                    </div>
                </CCol>
                <CCol></CCol>
            </CRow>
            <CModal
                style={{ marginTop: "30%", padding: "5%" }}
                visible={visible}
                onClose={() => setVisible(false)}>
                <CModalBody
                    style={{ textAlign: "center" }}>
                    <span
                        style={{ fontSize: '5em', color: '#C55A11' }}
                        className="material-symbols-outlined">
                        warning
                    </span>
                    <p
                        className='fs-3'>
                        Are you sure?
                    </p>
                    <p
                        style={{ color: '#00B050' }}>
                        {size}mm {inputValue} : {qty}
                    </p>
                    <p
                        style={{ fontSize: '0.8em', marginBottom: '10px' }}>
                        To continue please enter pin code and press Enter key
                    </p>
                    <div
                        className='d-grid gap-2 d-md-flex justify-content-md-center'>
                        <CFormInput
                            style={{ backgroundColor: '#F2F2F2' }}
                            type="password"
                            autoFocus
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            onKeyPress={handleKeypress}
                            id="qty" />
                        <CButton
                            color="danger"
                            style={{ backgroundColor: '#FF5B5B', color: '#fff' }}
                            onClick={() => setVisible(false)}>
                            Cancel
                        </CButton>
                    </div>
                </CModalBody>
            </CModal>
            <LoadingModel visible={loading} loadingMsg={loadingMsg} onClose={(val) => setLoading(false)} />
        </div>
    )
}

export default AddProductionRecord