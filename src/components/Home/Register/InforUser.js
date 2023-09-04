import React from 'react'
import { FiFacebook } from 'react-icons/fi';
import { BsBriefcase } from 'react-icons/bs';
import { HiOutlineMail } from 'react-icons/hi';
import { FiPhoneCall } from 'react-icons/fi';
import { postRegister } from '../../../services/apiService';
import { toast } from 'react-toastify';
export const InforUser = ({ data, handlePrev, handleNext, setIdUser }) => {
    const handlePostRegister = async () => {
        let res = await postRegister(data.fullName, data.email, data.generation, data.phoneNumber, data.image, data.facebook);
        if (res && res.statusCode === 200) {
            toast.success(res.message)
            setIdUser(res?.data?.id);
            handleNext();
        } else {
            toast.error(res.message)
            return;
        }
    }
    return (
        <>
            <div className='container-user'>
                <div className='content-user'>
                    <div className='user-image'>
                        {!data.image ? <div className='no-picture'>No picture</div> : <img src={data.previewImage} alt='user-picture' />}
                    </div>
                    <div className='user-infor'>
                        <div className='user-sign'>{data.fullName}</div>
                        <div className='infor-detail'>
                            <span className='icon-value'><HiOutlineMail></HiOutlineMail></span>
                            <span className='name-value'>{data.email}</span>
                        </div>
                        <div className='infor-detail'>
                            <span className='icon-value'><BsBriefcase></BsBriefcase></span>
                            <span className='name-value'>{`Khóa ${data.generation}`}</span>
                        </div>
                        <div className='infor-detail'>
                            <span className='icon-value'><FiPhoneCall></FiPhoneCall></span>
                            <span className='name-value'>{data.phoneNumber}</span>
                        </div>
                        <div className='infor-detail'>
                            <span className='icon-value'><FiFacebook></FiFacebook></span>
                            <span className='name-value'>{data.facebook}</span>
                        </div>
                        <div className='btn-action'>
                            <div className='btn btn-primary' onClick={handlePrev}>Quay về</div>
                            <div className='btn btn-primary' onClick={handlePostRegister}>Tiếp theo</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
