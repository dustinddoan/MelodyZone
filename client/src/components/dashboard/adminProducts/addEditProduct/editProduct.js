import React, { useEffect, useReducer, useState} from "react";
import DashboardLayout from "components/hoc/dashboardLayout";
import { useFormik } from "formik";
import { errorHelper } from "utils.js/tools";
import Loader from "utils.js/loader";
import { useDispatch, useSelector } from "react-redux";
import { validation, formValues, getValuesToEdit } from "./formValue";
import { getAllBrands } from "store/actions/brands.action";
import {getProductById, productEdit } from "store/actions/product.action";
import { clearEditProdcut } from "store/actions";
import ImageUpload from "./uploadImages";
import PicViewer from "./picViewer";
import { useParams } from "react-router-dom";
import {
    TextField,
    Button,
    Divider,
    Select,
    MenuItem,
    FormControl,
    FormHelperText
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const EditProduct = (props) => {
    const [values, setValues] = useState(formValues);
    const products = useSelector(state => state.products)
    const [loading, setLoading] = useState(false)
    const notifications = useSelector(state => state.notifications);
    const brands = useSelector(state => state.brandsReducer.brands)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: values,
        validationSchema: validation,
        onSubmit: (values) => {
            handleSubmit(values);
        }
    })

    const handleSubmit = (values) => {
        setLoading(true);
        dispatch(productEdit(values, params.id))
    }

    const handlePicValue = (pic) => {
        const picArray = formik.values.images;
        picArray.push(pic.url);
        formik.setFieldValue('images', picArray)
    }

    const handleDeletePic = (i) => {

        const picArray = formik.values.images;
        picArray.splice(i, 1)
        formik.setFieldValue('images', picArray)
    }
    const cancelUpdate = () => {
        navigate('/dashboard/admin/admin_products')
    }

    useEffect(() => {
        if (notifications && notifications.success) {
            setLoading(false)
        }
    }, [notifications])

    useEffect(() => {
        const productId = params.id
        dispatch(getAllBrands())
        if (productId) {
            dispatch(getProductById(productId))
        }
    }, [dispatch], params.id)

    useEffect(() => {
        if (products && products.productById) {
            setValues(getValuesToEdit(products.productById))
        }
    }, [setValues, products])

    useEffect(() => {
        return () => {
            dispatch(clearEditProdcut())
        }
    }, [dispatch])

    return (
        <DashboardLayout>
            {loading ?
                <Loader />
                :
                <>
                    <PicViewer
                        formik={formik}
                        deletePic={(i) => handleDeletePic(i)}
                    />
                    <ImageUpload 
                        picValue={pic => handlePicValue(pic)}
                    />
                    <Divider className="mt-3 mb-3" />
                    <form className="mt-3 article_form" onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <TextField
                                style={{ widows: '100%' }}
                                name='model'
                                label='Enter a model'
                                variant="outlined"
                                {...formik.getFieldProps('model')}
                                {...errorHelper(formik, 'model')}
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                style={{ widows: '100%' }}
                                name='frets'
                                label='Frets'
                                variant="outlined"
                                type="number"
                                {...formik.getFieldProps('frets')}
                                {...errorHelper(formik, 'frets')}
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                style={{ widows: '100%' }}
                                name='woodtype'
                                label='Woodtype'
                                variant="outlined"
                                {...formik.getFieldProps('woodtype')}
                                {...errorHelper(formik, 'woodtype')}
                            />
                        </div>

                        <Divider className="mt-3 mb-3" />

                        <div className="form-group">
                            <FormControl variant="outlined">
                                <h5>Select a brand</h5>
                                <Select
                                    name="brand"
                                    {...formik.getFieldProps('brand')}
                                    error={formik.errors.brand && formik.touched.brand ? true : false}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {brands && Array.isArray(brands)?
                                        brands.map((item) => (
                                            <MenuItem value={item._id} key={item._id}>
                                                {item.name}
                                            </MenuItem>
                                        ))
                                    : null}

                                </Select>
                                {formik.errors.brand && formik.touched.brand ?
                                    <FormHelperText error={true}>
                                        {formik.errors.brand}
                                    </FormHelperText>
                                    : null}
                            </FormControl>
                        </div>

                        <div className="form-group">
                            <TextField
                                style={{ widows: '100%' }}
                                name='description'
                                label='Description'
                                variant="outlined"
                                {...formik.getFieldProps('description')}
                                {...errorHelper(formik, 'description')}
                                multiline
                                rows={4}
                            />
                        </div>

                        <div className="form-group">
                            <TextField
                                style={{ widows: '100%' }}
                                name='price'
                                label='Price'
                                variant="outlined"
                                type="number"
                                {...formik.getFieldProps('price')}
                                {...errorHelper(formik, 'price')}
                            />
                        </div>

                        <div className="form-group">
                            <TextField
                                style={{ widows: '100%' }}
                                name='available'
                                label='Currently in stock'
                                variant="outlined"
                                type="number"
                                {...formik.getFieldProps('available')}
                                {...errorHelper(formik, 'available')}
                            />
                        </div>

                        <Divider className="mt-3 mb-3" />

                        <div className="form-group">
                            <FormControl variant="outlined">
                                <h5>Free shipping</h5>
                                <Select
                                    name="shipping"
                                    {...formik.getFieldProps('shipping')}
                                    error={formik.errors.shipping && formik.touched.shipping ? true : false}
                                >
                                    <MenuItem value="true">Yes</MenuItem>
                                    <MenuItem value="false">No</MenuItem>

                                </Select>
                                {formik.errors.shipping && formik.touched.shipping ?
                                    <FormHelperText error={true}>
                                        {formik.errors.shipping}
                                    </FormHelperText>
                                    : null}
                            </FormControl>
                        </div>

                        <Divider className="mt-3 mb-3" />
                        <div>
                            <span><Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Update product
                        </Button></span>
                            <span><Button
                            variant="contained"
                            color="secondary"
                            onClick={() => cancelUpdate()}
                        >
                            Cancel
                        </Button></span>
                        </div>
                        


                    </form>
                </>
            }
        </DashboardLayout>
    )
}

export default EditProduct