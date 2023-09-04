import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteUser } from '../../../services/apiService';
const ModalDeleteUser = ({ show, setShow, userDelete, fetchAllUserWithPaginate, pagePos }) => {
    const handleDelete = async () => {
        let data = await deleteUser(userDelete);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            setShow(false);
            await fetchAllUserWithPaginate(pagePos)
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }
    return (
        <>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, Are you sure!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        Accept
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;