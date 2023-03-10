import React, { useEffect, useReducer } from "react";
import DashboardLayout from "components/hoc/dashboardLayout";
import { useDispatch, use, useSelector } from "react-redux";
import { productsByPaginate } from "store/actions/product.action";
import ProductsTable from "./productsTable";

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

    const reducer = (state, newSate) => ({
        ...state,
        ...newSate
    })

    const [searchValues, setSearchValues] = useReducer(reducer,defaultValues);
    // const [searchValues, setSearchValues] = useReducer(
    //     (state, newState) => ({...state, ...newState}),
    //     defaultValues
    // )

    const goToPage = (page) => {
        setSearchValues({page})
    }


    useEffect(() => {
        dispatch(productsByPaginate(searchValues))
    }, [dispatch, searchValues]);

    
    
    return (
        <DashboardLayout title="Products">
            <div className="products_table">
                <div>
                    search
                </div>
                <hr/>
                <ProductsTable 
                    prods={products.byPaginate}
                    prev={(page) => goToPage(page)}
                    next={(page) => goToPage(page)}
                />
            </div>
            products
        </DashboardLayout>
    )
}

export default AdminProducts;