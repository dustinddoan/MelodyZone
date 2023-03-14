import React, { useEffect, useReducer, useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { errorHelper } from "utils.js/tools";
import { TextField } from "@mui/material";
import { Button } from "react-bootstrap";


import { useDispatch, useSelector } from "react-redux";
import { productsByPaginate, removeProduct } from "store/actions/product.action";

const defaultValues = {
    page: 1,
    keywords: '',
    brand: [],
    min: 0,
    max: 5000,
    frets: []
}

const SearchBar = ({handleSeach}) => {
    const formik = useFormik({
        initialValues: {keywords: ''},
        validationSchema: Yup.object({
            keywords: Yup.string()
            .min(3, 'Minimum 3 character')
            .max(100, 'Search string too long')
        }),
        onSubmit: (values, {resetForm}) => {
            handleSeach(values)
            resetForm();
        }
    })

    return (
        <div className="container">
            <form className="mt-3" onSubmit={formik.handleSubmit}>
                <TextField 
                    style={{width: '100%'}}
                    placeholder="Search somthing"
                    name="keywords"
                    variant="outlined"
                    {...formik.getFieldProps('keywords')}
                    {...errorHelper(formik, 'keywords')}
                />
            </form>
        </div>
    )
}

export default SearchBar