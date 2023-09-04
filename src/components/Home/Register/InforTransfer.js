import React from 'react'
import unidecode from 'unidecode';
import { toast } from 'react-toastify';

const InforTransfer = ({ fullName, handlePrev, handleNext }) => {
    const copyInfor = async (e) => {
        const copyText = e.target;
        try {
            await navigator.clipboard.writeText(copyText.innerText)
            toast.success('successfully copied')
        }
        catch (error) {
            toast.error('successfully copied')
        }
    }
    return (
        <div className='container-transfer'>
            <div className='content-transer'>
                <div className='transfer-image'>
                    <img src={`https://api.vietqr.io/image/970423-04528833201-5emKeiY.jpg?accountName=DUONG%20HUYEN%20TRANG&amount=180000&addInfo=${unidecode(fullName)} dong tien sinh nhat`} alt="transfer-picture" />
                </div>
                <div className='transfer-infor'>
                    <p className='transfer-head'>DUONG HUYEN TRANG</p>
                    <p className='transfer-account' onClick={(e) => copyInfor(e)} style={{ cursor: 'pointer' }}>Số TK: 04528833201</p>
                    <p>Số tiền: 180000</p>
                    <div className='btn-action'>
                        <div className='btn btn-primary' onClick={handlePrev}>Quay về</div>
                        <div className='btn btn-primary' onClick={handleNext}>Tiếp theo</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InforTransfer