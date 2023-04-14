import React, {useState} from "react";
import { Modal, Button } from "react-bootstrap";

const PicViewer = ({formik, deletePic}) => {
    const [idToDelete, setIdToDelete] = useState(null)
    const [show, setShow] = useState(false)
    const handleClose = () => {
        setShow(false);
    }
    
    const handleShow = (id) => {
        setIdToDelete(id)
        setShow(true)
    }
    const handleDelete = () => {
        deletePic(idToDelete);
        handleClose()
        setIdToDelete(null)
    }

    return (
        <>
            { formik.values && formik.values.images && Array.isArray(formik.values.images)?
                formik.values.images.map((item, i) => (
                    <div 
                        className="pic_block"
                        key={item}
                        onClick={() => handleShow(i)}
                        style={{background: `url(${item})`}}
                    >

                    </div>
                ))
            
            
            : null}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default PicViewer