import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteQuizForAdmin } from '../../../../services/apiService';

const ModalDeleteQuiz = ({ show, setShow, idQuiz, fetchQuiz }) => {
    const handleDeleteQuiz = async () => {
        let res = await deleteQuizForAdmin(idQuiz)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setShow(false);
            await fetchQuiz();
        } else {
            toast.error(res.EM)
        }
    }
    return (
        <>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete quiz <b>{idQuiz}</b> </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleDeleteQuiz()}>
                        Accept
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz;