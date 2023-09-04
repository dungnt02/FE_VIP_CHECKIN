import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../services/apiService';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import { ImSpinner2 } from 'react-icons/im';
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const handleClickLogin = async () => {
        setIsLoading(true)
        if (!email || !password) {
            toast.error('Bạn thiếu thông tin rồi :((');
            setIsLoading(false);
            return;
        }
        if (!re.test(email)) {
            toast.error('Email không chính xác!');
            setIsLoading(false);
            return;
        }
        let res = await loginUser(email, password)
        if (res && res.statusCode === 200) {
            dispatch(doLogin(res.data));
            toast.success(res.message);
            navigate('/')
        } else {
            toast.error(res.message);
            setIsLoading(false)
        }
    }
    const handleKeyDown = (event) => {
        if (event && event.key === 'Enter') {
            handleClickLogin();
        }
    }
    return (
        <>
            <div className='login-container'>
                <div className='login-header'>
                    <span>Don't have an account yet? <button className='btn btn-secondary' onClick={() => navigate('/register')}>Sign up</button> Need help?</span>
                </div>
                <div className='login-main'>
                    <div className='login-content'>
                        <div className='login-title'>
                            Typeform
                        </div>
                        <div className='login-sub'>Hello, who's this?</div>
                        <div className='login-input'>
                            <label>Email</label>
                            <input type={"email"} placeholder='forcewech@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='login-input'>
                            <label>Password</label>
                            <input type={"password"} placeholder='Enter your password' value={password} onKeyDown={(event) => handleKeyDown(event)} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='login-forgot'><a href='#'>Forgot password?</a></div>
                        <div>
                            <button disabled={isLoading} className='login-submit' onClick={handleClickLogin}>
                                {isLoading && <ImSpinner2 className='loading-spinner' />}
                                Log in to Quizz IT
                            </button>
                        </div>
                        <a className='go-home' href='/'>&#60;&#60; Go to HomePage</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login