import React, { useEffect, useReducer } from "react";
import DashboardLayout from "components/hoc/dashboardLayout";
import { useDispatch, use, useSelector } from "react-redux";
import { productsByPaginate } from "store/actions/product.action";

const defaultValues = {
    page: 1,
    keyworks: '',
    brand: [],
    min: 0,
    max: 5000,
    frets: []
}

const AdminProducts = (props) => {
    const products = useSelector(state => state.products);
    const notifications = useSelector(state => state.notifications);
    const dispatch = useDispatch();

    const [searchValues, setSearchValues] = useReducer(
        (state, newState) => ({...state, newState}),
        defaultValues
    )

    useEffect(() => {
        dispatch(productsByPaginate(searchValues))
    }, [dispatch])
    
    return (
        <DashboardLayout>
            products
        </DashboardLayout>
    )
}

export default AdminProducts;