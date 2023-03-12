import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from 'yup'
import axios from "axios";
import { getTokenCookie } from "utils.js/tools";
import Loader from "utils.js/loader";


const ImageUpload = ({picValue}) => {
    const [loading, setLoading] = useState(false);

    const formikImg = useFormik({
        initialValues: { img: '' },
        validationSchema: Yup.object({
            img: Yup.mixed().required('A file is requied')
        }),
        onSubmit: (values) => {
            setLoading(true)
            let formData = new FormData();
            formData.append("file", values.img);

            axios.post(`/api/products/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization' : `Bearer ${getTokenCookie()}`
                }
            }).then (response => {
                picValue(response.data)
            }).catch(error => {
                alert(error)
            }).finally(() => {
                setLoading(false)
            })
        }
    })

    return (
        <>
            {loading ?
                <Loader />
                :
                <Form onSubmit={formikImg.handleSubmit}>
                    <Form.Group>
                        <input id="file" name="file" type="file" onChange={(event) => {
                            console.log(event.currentTarget.files[0])
                            formikImg.setFieldValue("img", event.currentTarget.files[0]);
                        }} />
                        {formikImg.errors.img && formikImg.touched.img ?
                            <div>Error</div>
                            : null
                        }
                    </Form.Group>
                    <Button variant="secondary" type="submit">
                        Add image
                    </Button>
                </Form>}
        </>
    )
}

export default ImageUpload;