import React, { useEffect, useState } from "react";
import { useFormik, validateYupSchema } from "formik";
import * as Yup from 'yup';
import Loader from "utils.js/loader";

import { useDispatch, useSelector } from "react-redux";
import { TextField, Button } from "@mui/material";
import { errorHelper } from "utils.js/tools";
import { userRegister, userSignIn } from "store/actions/user.action";
import { redirect, useNavigate } from "react-router-dom";



const AuthForm = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const notifications = useSelector(state => state.notifications)

    const formik = useFormik({
        initialValues: { email: 'dustin.dev.acc@gmail.com', password: 'admin123' },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Email is required')
                .email('This is invalid email'),
            password: Yup.string()
                .required('Password is required')
        }),
        onSubmit: (values) => {

            setLoading(true);
            handleSubmit(values);
        }
    })

    const handleSubmit = (values) => {

        if (props.formType) {
            dispatch(userRegister(values))
        } else {
            dispatch(userSignIn(values))
        }
    }

    useEffect(() => {
        
        const goToDashBoard = () => navigate('/dashboard')
        if (notifications && notifications.success) {
            goToDashBoard();
        } else {
            setLoading(false);

        }
    }, [notifications, navigate])

    return (
        <>
            <div className="auth_container">

                {loading ?
                    <Loader />
                    :
                    <form className="mt-3" onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <TextField
                                style={{ width: '100%' }}
                                name="email"
                                label="Enter your email"
                                variant="outlined"
                                {...formik.getFieldProps('email')}
                                {...errorHelper(formik, 'email')}

                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                style={{ width: '100%' }}
                                name="password"
                                label="Enter your password"
                                variant="outlined"
                                type="password"
                                {...formik.getFieldProps('password')}
                                {...errorHelper(formik, 'password')}

                            />
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            size="small"
                        >
                            {props.formType ? 'Register' : 'Login'}
                        </Button>

                    </form>
                }


            </div>
        </>
    )
}

export default AuthForm;