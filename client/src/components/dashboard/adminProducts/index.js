import React, { useEffect, useReducer, useState } from "react";
import DashboardLayout from "components/hoc/dashboardLayout";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { errorHelper } from "utils.js/tools";
import { TextField } from "@mui/material";
import { Button } from "react-bootstrap";


import { useDispatch, useSelector } from "react-redux";
import { productsByPaginate, removeProduct } from "store/actions/product.action";
import ProductsTable from "./productsTable";

const defaultValues = {
    page: 1,
    keywords: '',
    brand: [],
    min: 0,
    max: 5000,
    frets: []
}

const AdminProducts = (props) => {
    const [removeModal, setRemoveModal] = useState(false);
    const [toRemoveId, setToRemoveId] = useState(null);

    const products = useSelector(state => state.products);
    const notifications = useSelector(state => state.notifications);
    const dispatch = useDispatch();

    // const reducer = (state, newSate) => ({
    //     ...state,
    //     ...newSate
    // })

    // const [searchValues, setSearchValues] = useReducer(reducer,defaultValues);
    const [searchValues, setSearchValues] = useReducer(
        (state, newState) => ({...state,...newState }),
        defaultValues
    );

    const formik = useFormik({
        initialValues: {keywords: ''},
        validationSchema: Yup.object({
            keywords: Yup.string()
            .min(3, "You need more than 3")
            .max(50, 'Your search is too long')

        }),
        onSubmit:(values, {resetForm}) => {
            setSearchValues({keywords: values.keywords, page: 1})
            resetForm();
        }
    })

    const resetSearch = () => {
        setSearchValues(defaultValues)
    }

    const goToPage = (page) => {
        setSearchValues({page:page})
        
    }

    const handleCloseModal = () => {
        setRemoveModal(false);
    }

    const handleRemoveModal = (id) => {
        setToRemoveId(id);
        setRemoveModal(true);

    }

    const handleRemove = () => {
        dispatch(removeProduct(toRemoveId))
        handleCloseModal();
        setRemoveModal(null)
    }

    useEffect(() => {
        dispatch(productsByPaginate(searchValues))
    }, [dispatch, searchValues]);

    useEffect(() => {
        if (notifications && notifications.removeProduct) {
            dispatch(productsByPaginate(searchValues))
        }
    }, [dispatch, notifications, searchValues])
    
    
    return (
        <DashboardLayout title="Products">
            <div className="products_table">
                <div>
                    <form className="mt-3" onSubmit={formik.handleSubmit}>
                        <TextField
                            style={{width: '100%'}}
                            name='keywords'
                            label="Enter yopur search"
                            variant="outlined"
                            {...formik.getFieldProps('keywords')}
                            {...errorHelper(formik, 'keywords')}
                        />
                    </form>
                    <Button onClick={() => resetSearch()}>
                        Reset search
                    </Button>
                </div>
                <hr/>
                <ProductsTable
                    removeModal={removeModal} 
                    prods={products.byPaginate}
                    prev={(page) => goToPage(page)}
                    next={(page) => goToPage(page)}
                    handleClose={() => handleCloseModal()}
                    handleModal={(id) => handleRemoveModal(id)}
                    handleRemove={() => handleRemove()}
                />
            </div>
        </DashboardLayout>
    )
}

export default AdminProducts;