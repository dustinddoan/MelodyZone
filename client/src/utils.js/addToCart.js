import React from "react";
import { Modal, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const AddToCart = ({modal, handleClose, errorType}) => {
    return (
        <>

        <Modal show={modal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Sorry:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                { errorType === 'auth' ?
                    <div>Sorry, You need to register or login to continue</div>
                : 
                    <div>You need to verify your account</div>
                }
            </Modal.Body>
            <Modal.Footer>
                { errorType === 'auth' ?
                    <LinkContainer to="/sign_in">
                        <Button variant="primary">
                            Go to register / sign in
                        </Button>
                    </LinkContainer>
                :
                <Button variant="primary">
                    Send verification email again
                </Button>

                }
            </Modal.Footer>
        </Modal>
        </>

    )
}

export default AddToCart;