import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalResult = ({ show, setShow, dataResult }) => {

    return (
        <>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Total Questions: <b>{dataResult.countTotal}</b></div>
                    <div>Total Correct answers: <b>{dataResult.countCorrect}</b></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => setShow(false)}>
                        Show answers
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalResult;