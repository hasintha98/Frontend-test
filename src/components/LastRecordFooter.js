import { CFooter, CLink } from '@coreui/react'
import React from 'react'

const LastRecordFooter = () => {
    return (
        <CFooter 
        position='fixed'
        style={{ height: "15px", backgroundColor: "#414A4E" }}>
        <div>
            <span style={{color: "#fff"}}>Last Record</span> 
            <span style={{color: "#00965E", marginLeft: "10px"}}>9mm LO/EVR : 25</span>
        </div>
     
      </CFooter>
    )

}

export default LastRecordFooter