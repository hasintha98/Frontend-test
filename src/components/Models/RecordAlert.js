import { CModal, CModalBody } from '@coreui/react'
import React from 'react'

const RecordAlert = ({ type, onClose, visible }) => {
    return (
        <>
            {type == "success" ?
                <CModal
                    style={{ marginTop: "30%", padding: "10%" }}
                    visible={visible}
                    onClose={() => onClose(false)}>
                    <CModalBody
                        style={{ textAlign: "center" }}
                    >
                        <span
                            style={{ fontSize: '5em', color: '#00B050' }}
                            className="material-symbols-outlined">
                            check_circle
                        </span>
                        <p
                            className='fs-3 mb-5 mt-4'>
                            Production <span style={{color: '#00B050'}}>#5752</span> Recorded Successfully
                        </p>

                    </CModalBody>
                </CModal> : null}
        </>
    )
}

export default RecordAlert