import React, { useState } from 'react';
import { MdOutlineCelebration } from "react-icons/md";
import { checkinPhone } from '../../../services/apiService';
import { toast } from 'react-toastify';

const CheckinPhone = () => {
    const [q, setQ] = useState("");
    const [isCheck, setIsCheck] = useState(false);
    const handleCheckinPhone = async () => {
        if (q.length > 0) {
            let res = await checkinPhone(q);
            if (res && res.statusCode === 200) {
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
        } else {
            setIsCheck(true);
        }
    }
    const handleChange = (e) => {
        setQ(e.target.value);
        setIsCheck(false)
    }
    return (
        <div className='check-container'>
            <div className='title'>
                CHECKIN PHONE OR EMAIL
            </div>
            <div className='check-content'>
                <div>
                    <label htmlFor="formGroupExampleInput" className="form-label">Số điện thoại hoặc email
                    </label>
                    <span className="n-form-item-label__asterisk" style={{ color: 'blue' }}>&nbsp;*</span>
                    <input onChange={(event) => handleChange(event)} type="text" className="form-control" id="formGroupExampleInput" placeholder="Nhập số điện thoại hoặc email" />
                </div>
                {isCheck && <div className='check-notify' style={{ fontSize: '12px', color: 'red', margin: '5px 0' }}>Trường này không được trống</div>}
                <button className='btn btn-primary' onClick={handleCheckinPhone}><MdOutlineCelebration /> Checkin</button>
            </div>
        </div>
    )
}

export default CheckinPhone