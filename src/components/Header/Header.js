import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { logout } from '../../services/apiService';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doLogout } from '../../redux/action/userAction';
import Profile from './Profile';
import { useState } from 'react';

const Header = () => {
    const [showModal, setShowModal] = useState(false);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const account = useSelector(state => state.user.account);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = () => {
        navigate('/login')
    }
    const handleRegister = () => {
        navigate('/register')
    }
    const handleLogout = async () => {
        console.log(account)
        let res = await logout("account.email", account.refresh_token)
        if (res && res.EC === 0) {
            dispatch(doLogout());
            navigate('/login');
        } else {
            toast.error(res.EM)
        }
    }
    return (
        <>
            <Navbar expand="lg" className="header-container bg-body-tertiary" >
                <Container>
                    <NavLink to='/' className='navbar-brand'>VIP CLUB</NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to='admins' className='nav-link'>Danh sách</NavLink>
                            <NavLink to='admins/checkedin' className='nav-link'>Danh sách đã checkin</NavLink>
                            <NavLink to='admins/checkin-qr' className='nav-link'>Checkin QR</NavLink>
                            <NavLink to='admins/checkin-face' className='nav-link'>Checkin Face</NavLink>
                            <NavLink to='admins/checkin-phone' className='nav-link'>Checkin SĐT</NavLink>
                        </Nav>
                        <Nav>
                            {isAuthenticated === false ?
                                <>
                                    <button className='btn-login' onClick={() => handleLogin()}>Log in</button>
                                    <button className='btn-signup btn btn-primary' onClick={() => handleRegister()}>Sign up</button>
                                </>
                                :
                                <NavDropdown title={account.username} id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={() => setShowModal(true)}>Profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={handleLogout}>Log out</NavDropdown.Item>
                                </NavDropdown>

                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Profile show={showModal} setShow={setShowModal} />
        </>
    );
}

export default Header;