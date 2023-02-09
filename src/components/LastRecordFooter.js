import { CFooter, CLink } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import ProductionService from 'src/services/ProductionService'
import swal from 'sweetalert'

const LastRecordFooter = () => {

    const [record, setRecord] = useState(null)

    useEffect(() => {
        ProductionService.getLastProductionRecord("dash_page", "get_last_record")
            .then(response => {
                setRecord(response.data)
            }).catch(error => {
                if (error.reponse.data.message != "No Productions yet!!")
                    swal("Error!", error.response.data.message, "error");
            })
    }, [])

    return (
        <CFooter
            position='sticky'
            style={{ height: "15px", backgroundColor: "#414A4E" }}>
            <div>
                <span style={{ color: "#fff" }}>Last Record</span>
                <span style={{ color: "#00965E", marginLeft: "10px" }}>{record?.product ? `${record.last_record.size}mm ${record.last_record.type}: ${record.last_record.qty}` : "No Record"}</span>
            </div>

        </CFooter>
    )

}

export default LastRecordFooter