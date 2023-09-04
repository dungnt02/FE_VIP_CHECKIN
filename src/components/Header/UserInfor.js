import React from 'react'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FcPlus } from "react-icons/fc";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { updateProfile } from '../../services/apiService';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
const UserInfor = ({ show, setShow }) => {
    const [image, setImage] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const dispatch = useDispatch();
    const [previewImage, setPreviewImage] = useState("");
    const account = useSelector(state => state.user.account);
    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        }
    }
    useEffect(() => {
        if (account && !_.isEmpty(account)) {
            setUsername(account.username)
            setEmail(account.email)
            setRole(account.role)
            if (account.image) {
                setPreviewImage(`data:image/jpeg;base64,${account.image}`)
            }
        }
    }, [account])
    const handleUpdateProfile = async () => {
        let res = await updateProfile(username, image);
        let data = {
            username: username,
            access_token: account.access_token,
            refresh_token: account.refresh_token,
            image: image,
            role: account.role,
            email: account.email
        }
        if (res && res.EC === 0) {
            toast.success(res.EM)
        } else {
            toast.error(res.EM)
        }
        setShow(false)
    }
    return (
        <>
            <form className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input disabled type="email" className="form-control" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="col-md-4">
                    <label htmlFor="inputState" className="form-label">Role</label>
                    <select disabled id="inputState" className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option>USER</option>
                        <option>ADMIN</option>
                    </select>
                </div>
                <div className='col-md-12'>
                    <label htmlFor='labelUpload' className="form-label label-upload"><FcPlus />Upload File Image</label>
                    <input id="labelUpload" type='file' name='file' hidden onChange={(event) => handleUploadImage(event)} />
                </div>
                <div className='col-md-12 img-preview' style={{ height: "150px" }}>
                    {previewImage ?
                        <img src={previewImage} />
                        :
                        <span>Preview Image</span>
                    }
                </div>
                <Button className='btn btn-primary' onClick={() => handleUpdateProfile()}>Update</Button>
            </form>
        </>
    )
}

export default UserInfor