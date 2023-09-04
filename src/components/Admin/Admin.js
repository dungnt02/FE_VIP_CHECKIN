import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
const Admin = () => {
    return (
        <div className='admin-container'>
            <div className='admin-content'>
                <div className='admin-main'>
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>
            </div>
        </div>
    )
}

export default Admin