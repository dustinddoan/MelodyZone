import React, {useState} from "react";
import { Button } from "@mui/material";
import AuthForm from "./authForm";

const RegisterLogin = (props) => {
    console.log('RegisterLogin props: ', props)
    const [formType, setFormType] = useState(false);
    
    const toggleFormType = () => {
        setFormType(!formType);

    }


    return (

        <div className="page_wrapper">
            <div className="container">
                <div className="register_login_container">
                    <div className="left">
                        {formType ?
                            <>
                                <h1>New cusomter</h1>
                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
                            </>
                            :
                            <>
                                <h1>Welcome back</h1>
                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
                            </>
                        
                        }
                        <Button 
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => toggleFormType()}
                        >
                            { formType ? "Already registered?" : "Need to register"}
                        </Button>

                    </div>
                    <div className="right">
                        <h2>{formType ? "Register" : "Sign in"}</h2>
                        <AuthForm
                            formType={formType}
                            {...props}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterLogin