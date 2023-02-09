import { CModal, CModalBody } from '@coreui/react'
import React from 'react'

const LoadingModel = ({ visible, onClose, loadingMsg }) => {
    return (
        <CModal
            style={{ marginTop: "30%", padding: "5%" }}
            visible={visible}
            onClose={() => onClose(false)}>
            <CModalBody
            >

                <span className="loader"></span>
                <p style={{textAlign: 'center', color: '#414A4E', fontWeight: 'bold', fontSize: '1.2em', marginTop: '30px'}}>
                {!loadingMsg || loadingMsg == "" ? "Please Wait..." : loadingMsg }
                    </p>
            </CModalBody>
        </CModal>
    )
}

export default LoadingModel