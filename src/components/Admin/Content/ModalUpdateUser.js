import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import { updateUser } from '../../../services/apiService';
import _ from 'lodash';
const ModalUpdateUser = ({ show, setShow, fetchAllUserWithPaginate, listUpdateUser, setListUpdateUser, pagePos }) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [genaration, setGenaration] = useState("01");
    const [phone, setPhone] = useState("");
    const [image, setImage] = useState("");
    const [facebook, setFacebook] = useState("");
    const [role, setRole] = useState("USER");
    const [previewImage, setPreviewImage] = useState("");

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        }
    }
    const handleSubmitUpdateUser = async () => {
        //call apis
        let data = await updateUser(listUpdateUser.id, fullName, role, image)
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await fetchAllUserWithPaginate(pagePos);
        } else {
            toast.error(data.EM);
        }
    }
    useEffect(() => {
        if (!_.isEmpty(listUpdateUser)) {
            setEmail(listUpdateUser.email);
            setFullName(listUpdateUser.fullName);
            setFacebook(listUpdateUser.facebook);
            setPhone(listUpdateUser.phoneNumber);
            if (listUpdateUser.image) {
                setPreviewImage(`data:image/jpeg;base64,${listUpdateUser.image}`);
            }
        }
    }, [listUpdateUser])

    const handleClose = () => {
        setEmail("");
        setFullName("");
        setPhone("");
        setFacebook("");
        setPreviewImage("");
        setShow(false);
        setListUpdateUser({
            id: 0,
            fullName: "",
            phoneNumber: "",
            generation: "",
            role: "",
            facebook: "",
        })
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className="model-add-user">
                <Modal.Header closeButton>
                    <Modal.Title>Update a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input disabled type="email" className="form-control" value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Số điện thoại</label>
                            <input disabled type="text" className="form-control" value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Họ tên</label>
                            <input disabled type="text" className="form-control" value={fullName}
                                onChange={(event) => setFullName(event.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Facebook</label>
                            <div style={{ marginTop: '5px' }}>
                                <a href={facebook} target='_blank'>Nhấp vào đây</a>
                            </div>
                        </div>
                        <div className='col-md-12'>
                            <label htmlFor='labelUpload' className="form-label label-upload"><FcPlus />Upload File Image</label>
                            <input id="labelUpload" type='file' hidden onChange={(event) => handleUploadImage(event)} />
                        </div>
                        <div className='col-md-12 img-preview' style={{ height: "150px" }}>
                            {previewImage ?
                                <img src={previewImage} />
                                :
                                <span>Preview Image</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitUpdateUser()}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateUser;