import { CAlert, CButton, CCol, CFormInput, CFormLabel, CModal, CModalBody, CRow } from '@coreui/react'
import React, { useRef, useState } from 'react'
import ProductionService from 'src/services/ProductionService'
import RawMaterialService from 'src/services/RawMaterialService'
import Production from 'src/views/dashboard/Production'
import swal from 'sweetalert'

const AddProductionRecord = () => {
    const [visible, setVisible] = useState(false)
    const [alert, setAlert] = useState(false)
    const [isFocus, setIsFocus] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const [isHovered, setIsHovered] = useState(false)
    const [successRecordId, setSuccessRecordId] = useState(null)
    const [count, setCount] = useState(0)

    const [date, setDate] = useState("")
    const [size, setSize] = useState(null)
    const [type, setType] = useState("")
    const [qty, setQty] = useState(null)


    const inputRef = useRef()

    let items = [
        "React", "CSS", "HTML", "Red", "Roll", "Reel"
    ]

    const handleInputValue = (val) => {
        setInputValue(val)
        // setCount(0)
    }

    const submitProductionDetails = () => {

        if(!qty) {
            console.log(qty)
            return
        }

        if(date == "") {
            console.log(date)
            return
        }

        if(!size) {
            console.log(size)
            return
        }

        if(inputValue == "") {
            console.log(inputValue)
            return
        }
        ProductionService.createNewProductionRecord("Production",date, Number(size), inputValue, Number(qty)).then(response => {
            setAlert(true)
            clearFields()
            console.log(response)
            setSuccessRecordId(response.data.pid)
        }).catch(error => {
            console.log(error.response.data.message)
            setAlert(false)
            swal("Error!", error.response.data.message, "error");
        }) 
    }

    const handleKeypress = e => {
        if (e.key === 'Enter') {
            submitProductionDetails();
            setVisible(false)
        }
    };

    console.log(date)
    const clearFields = () => {
        setDate(null)
        setSize(null)
        setInputValue("")
        setQty(null)
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
                                    {items.map((suggest, key) => {
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
                        To continue please enter admin pin code and press Enter key
                    </p>
                    <div
                        className='d-grid gap-2 d-md-flex justify-content-md-center'>
                        <CFormInput
                            style={{ backgroundColor: '#F2F2F2' }}
                            type="number"
                            autoFocus
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
        </div>
    )
}

export default AddProductionRecord