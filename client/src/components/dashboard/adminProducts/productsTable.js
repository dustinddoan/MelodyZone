import React from "react";
import { Table, Pagination, Modal, Button, ModalBody, ModalFooter } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import Moment from "react-moment";
import Loader from "utils.js/loader";

const ProductsTable = ({prods, prev, next, removeModal, handleClose, handleModal, handleRemove}) => {
    const navigate = useNavigate();
    const goToPrevPage = (page) => {
        prev(page);
    }

    const goToNextPage = (page) => {
        next(page);
    }

    const goToEdit = (id) => {
        navigate(`/dashboard/admin/edit_product/${id}`);
    }

    return (
        <>
            { (prods && (prods.docs.length > 0)) ?
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Created</th>
                                <th>Model</th>
                                <th>Available</th>
                            </tr>
                        </thead>
                        <tbody>
                            { prods.docs.map((item) => (
                                <tr key={item._id}>
                                    <td><Moment to={item.date}></Moment></td>
                                    <td>{item.model}</td>
                                    <td>{item.available}</td>
                                    <td className="action_btn remove_btn"
                                        onClick={() => handleModal(item._id)}
                                    >
                                        Remove
                                    </td>
                                    <td className="action_btn edit_btn"
                                        onClick={() => goToEdit(item._id)}
                                    >
                                        Edit
                                    </td>
                                </tr>
                            ))

                            }
                        </tbody>

                    </Table>
                    <Pagination>
                        { prods.hasPrevPage ?
                            <>
                            <Pagination.Prev onClick={() => goToPrevPage(prods.prevPage)} />
                            <Pagination.Item onClick={() => goToPrevPage(prods.prevPage)}>
                                {prods.prevPage}
                            </Pagination.Item>
                            </>
                            : null
                        }
                        <Pagination.Item active>{prods.page}</Pagination.Item>
                        { prods.hasNextPage ?
                            <>
                            <Pagination.Item onClick={() => goToNextPage(prods.nextPage)}>
                                {prods.nextPage}
                            </Pagination.Item>
                            <Pagination.Next onClick={() => goToNextPage(prods.nextPage)} />
                            </>
                            : null
                        }
                    </Pagination>
                    <hr/>
                    <LinkContainer to="/dashboard/admin/add_products">
                        <Button variant="secondary">Add product</Button>
                    </LinkContainer>
                </>
                :
                <Loader/>
            }
            <Modal show={removeModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <ModalBody>
                    There is no going back
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        Opp, close this now
                    </Button>
                    <Button variant="danger" onClick={() => handleRemove()}>
                        Delete
                    </Button>
                </ModalFooter>

            </Modal>
        </>
    )
}

export default ProductsTable