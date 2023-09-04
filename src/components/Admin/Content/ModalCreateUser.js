import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { postCreateNewUser } from '../../../services/apiService';
const ModalCreateUser = ({ show, setShow, fetchAllUserWithPaginate, pagePos }) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [generation, setGeneration] = useState(1);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [facebook, setFacebook] = useState("");
    const [role, setRole] = useState("USER");
    const [password, setPassword] = useState("");


    const handleSubmitCreateUser = async () => {
        //call apis
        let data = await postCreateNewUser(fullName, email, generation, phoneNumber, password, facebook, role)
        if (data && data.statusCode === 201) {
            toast.success(data.message);
            handleClose();
            await fetchAllUserWithPaginate(pagePos);
        } else {
            toast.error(data.message);
        }
        console.log(data)
    }

    const handleClose = () => {
        setGeneration("");
        setEmail("");
        setFullName("");
        setPhoneNumber("");
        setFacebook("");
        setRole("");
        setPassword("");
        setShow(false);
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className="model-add-user">
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Mật khẩu</label>
                            <input type="password" className="form-control" value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Họ và tên</label>
                            <input type="text" className="form-control" value={fullName}
                                onChange={(event) => setFullName(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Số điện thoại</label>
                            <input type="text" className="form-control" value={phoneNumber}
                                onChange={(event) => setPhoneNumber(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Facebook</label>
                            <input type="text" className="form-control" value={facebook}
                                onChange={(event) => setFacebook(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Khóa</label>
                            <select className="form-select" onChange={(event) => setGeneration(Number(event.target.value.split(" ")[1]))}>
                                <option>Khóa 01</option>
                                <option>Khóa 02</option>
                                <option>Khóa 03</option>
                                <option>Khóa 04</option>
                                <option>Khóa 05</option>
                                <option>Khóa 06</option>
                                <option>Khóa 07</option>
                                <option>Khóa 08</option>
                                <option>Khóa 09</option>
                                <option>Khóa 10</option>
                                <option>Khóa 11</option>
                                <option>Khóa 12</option>
                                <option>Khóa 13</option>
                                <option>Khóa 14</option>
                                <option>Khóa 15</option>
                                <option>Khóa 16</option>
                                <option>Khóa 17</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select className="form-select" onChange={(event) => setRole(event.target.value)} value={role}>
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCreateUser;