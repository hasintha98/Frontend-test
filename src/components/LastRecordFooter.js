import { CFooter, CLink } from '@coreui/react'
import React from 'react'

const LastRecordFooter = (props) => {
    return (
        <CFooter 
        position='sticky'
        style={{ height: "15px", backgroundColor: "#414A4E" }}>
        <div>
            <span style={{color: "#fff"}}>Last Record</span> 
            <span style={{color: "#00965E", marginLeft: "10px"}}>{props.lastRecord ? props.lastRecord : "No Record"}</span>
        </div>
     
      </CFooter>
    )

}

export default LastRecordFooter