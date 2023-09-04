import React, { useState } from 'react'
import { FcPlus } from 'react-icons/fc';
import { InforUser } from './Register/InforUser';
import { toast } from 'react-toastify';
import InforTransfer from './Register/InforTransfer';
import InforQR from './Register/InforQR';

const SignUp = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [generation, setGeneration] = useState("01");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [image, setImage] = useState("");
    const [facebook, setFacebook] = useState("");
    const [isUpload, setIsUpload] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [next, setNext] = useState(1);
    const [idUser, setIdUser] = useState("");
    const data = {
        fullName,
        email,
        generation,
        phoneNumber,
        image,
        previewImage,
        facebook,
    }
    const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const pe =
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        }
    }

    const handleNext = () => {
        if (next === 1) {
            if (!fullName || !email || !generation || !phoneNumber || !facebook) {
                toast.error('Bạn thiếu thông tin rồi :((');
                return;
            }
            if (!re.test(email)) {
                toast.error('Email không chính xác!');
                return;
            }
            if (!pe.test(phoneNumber)) {
                toast.error('SĐT không chính xác!');
                return;
            }
        }
        setNext(next + 1);
    }
    const handlePrev = () => {
        setNext(next - 1);
    }
    return (
        <>
            {next === 1 &&
                <div className='container-register'>
                    <div className='content-register'>
                        <div className='img-register'>
                            <img src="/sn.jpg" alt="birthday" />
                        </div>
                        <div className='infor-register'>
                            <div>
                                <input type="text" className="form-control" value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder='Họ và tên' />
                            </div>
                            <div>
                                <input type="email" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} placeholder='Email' />
                            </div>
                            <div>
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
                            <div>
                                <input type="text" className="form-control" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} placeholder='Số điện thoại' />
                            </div>
                            <div>
                                <input type="text" className="form-control" value={facebook} onChange={(event) => setFacebook(event.target.value)} placeholder='Link facebook' />
                            </div>
                            <div>
                                <input type="checkbox" id="face" name="face" value="face" onChange={() => setIsUpload(!isUpload)}></input>
                                <label htmlFor="face" style={{ marginLeft: '5px', color: '#000000a1' }}>Checkin Face</label><br></br>
                            </div>
                            {isUpload ?
                                <>
                                    <div>
                                        <label htmlFor='labelUpload' className="form-label label-upload"><FcPlus />Tải ảnh của bạn</label>
                                        <input id="labelUpload" type='file' hidden onChange={(event) => handleUploadImage(event)} />
                                    </div>
                                    <div className='img-preview' style={{ height: "150px" }}>
                                        {previewImage ?
                                            <img src={previewImage} />
                                            :
                                            <span>Preview Image</span>
                                        }
                                    </div>
                                    <div>
                                        <button className='btn btn-primary' style={{ margin: '20px auto', display: 'block' }} onClick={handleNext}>Tiếp tục</button>
                                    </div>
                                </> :
                                <div>
                                    <button className='btn btn-primary' style={{ margin: '40px auto', display: 'block' }} onClick={handleNext}>Tiếp tục</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
            {next === 2 &&
                <div>
                    <InforUser data={data} handlePrev={handlePrev} handleNext={handleNext} setIdUser={setIdUser} />
                </div>
            }
            {
                next === 3 &&
                <div>
                    <InforTransfer fullName={fullName} handleNext={handleNext} handlePrev={handlePrev} />
                </div>
            }
            {
                next === 4 &&
                <div>
                    <InforQR idUser={idUser} />
                </div>
            }
        </>
    )
}

export default SignUp