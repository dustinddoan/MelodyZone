import React from "react";
import DashboardLayout from "components/hoc/dashboardLayout";


const DashBoard = ({users}) => {

    return(
        <DashboardLayout title="Overview">
            <div className="user_nfo_panel">
                <div>
                    <span>{users.data.firstname}</span>
                    <span>{users.data.lastname}</span>
                    <span>{users.data.email}</span>
                </div>
                {
                    users.data.history ?
                    <div className="user_nfo_pnael">
                        <h1>Order history</h1>
                        <div className="user_product_block_wrapper">
                            history
                        </div>
                    </div>
                    : null
                }
            </div>
        </DashboardLayout>
        
        
    )
}

export default DashBoard;