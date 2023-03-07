import React, {useEffect} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToast } from "utils.js/tools";
import {useSelector, useDispatch} from 'react-redux';
import { clearNotification } from "store/actions";

const MainLayout = (props) => {
    // listen to the change of notifications state in the store
    const notifications = useSelector(state => state.notifications)
    const dispatch = useDispatch();

    // if somthing change, trigger this
    useEffect(() => {
        if (notifications && notifications.error) {
            const msg = notifications.msg ? notifications.msg : 'Error';
            showToast('ERROR', msg);
            dispatch(clearNotification())
        }
        if (notifications && notifications.success) {
            const msg = notifications.msg ? notifications.msg : 'Done';
            showToast('SUCCESS', msg);
            dispatch(clearNotification())
        }
    }, [notifications, dispatch])
    

    return(
        <div>
            {props.children}
            <ToastContainer/>
        </div>
    )
}

export default MainLayout;