import React from 'react'
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { changePassword } from '../../services/apiService';
const Password = ({ show, setShow }) => {
    const [confirmPass, setConfirmPass] = useState("");
    const [currentPass, setCurrentPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const handleChangePassword = async () => {
        let res = await changePassword(currentPass, newPass);
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
                    <label htmlFor="inputPassword1" className="form-label">Current Password</label>
                    <input onChange={(e) => setCurrentPass(e.target.value)} type="password" className="form-control" id="inputPassword1" />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputPassword2" className="form-label">New Password</label>
                    <input onChange={(e) => setNewPass(e.target.value)} type="password" className="form-control" id="inputPassword2" />
                </div>
                <div className="col-12">
                    <label htmlFor="inputPassword3" className="form-label">Confirm Password</label>
                    <input onChange={(e) => setConfirmPass(e.target.value)} type="password" className="form-control" id="inputPassword3" />
                </div>
                <Button className='btn btn-primary' onClick={() => handleChangePassword()}>Update</Button>
            </form>
        </>
    )
}

export default Password