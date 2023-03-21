import React from "react";
import DashboardLayout from "components/hoc/dashboardLayout";
import HistoryBlock from "utils.js/historyBlock";


const DashBoard = ({users}) => {

    return(
        <DashboardLayout title="Overview">
            <div className="user_nfo_panel">
                <div>
                    <span>Name: {users.data.firstname} {users.data.lastname}</span>
                    <span>Email: {users.data.email}</span>
                </div>
                {
                    users.data.history ?
                    <div className="user_nfo_pnael">
                        <h1>Order history</h1>
                        <div className="user_product_block_wrapper">
                            <HistoryBlock history={users.data.history}/>
                        </div>
                    </div>
                    : null
                }
            </div>
        </DashboardLayout>
        
        
    )
}

export default DashBoard;