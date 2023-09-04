import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import _ from 'lodash';
import { toast } from 'react-toastify';
import { updateQuiz } from '../../../../services/apiService';

const ModalUpdateQuiz = ({ show, setShow, listUpdateQuiz, fetchQuiz }) => {
    const [previewImage, setPreviewImage] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("EASY");
    const [image, setImage] = useState("");
    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        }
    }
    useEffect(() => {
        if (!_.isEmpty(listUpdateQuiz)) {
            setName(listUpdateQuiz.name);
            setDescription(listUpdateQuiz.description);
            setType(listUpdateQuiz.difficulty);
            if (listUpdateQuiz.image) {
                setPreviewImage(`data:image/jpeg;base64,${listUpdateQuiz.image}`);
            }
        }
    }, [listUpdateQuiz])
    const handleUpdateQuiz = async () => {
        let res = await updateQuiz(listUpdateQuiz.id, description, name, type, image);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setShow(false);
            await fetchQuiz();
        } else {
            toast.error(res.EM);
        }
    }
    return (
        <>
            <Modal show={show} onHide={() => setShow(false)} size='xl'>
                <Modal.Header closeButton>
                    <Modal.Title>Update the quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label htmlFor="inputName" className="form-label">Name</label>
                            <input type="text" className="form-control" id="inputName"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputDescription" className="form-label">Description</label>
                            <input type="text" className="form-control" id="inputDescription"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputState" className="form-label">Difficulty</label>
                            <select id="inputState" className="form-select" value={type} onChange={(event) => setType(event.target.value)}>
                                <option value="EASY">EASY</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HARD">HARD</option>
                            </select>
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
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleUpdateQuiz()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateQuiz;