import React from 'react'
import HomePage from './components/Home/HomePage';
import ManageUser from './components/Admin/Content/ManageUser';
import DashBoard from './components/Admin/Content/DashBoard';
import Admin from './components/Admin/Admin';
import App from './App';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import ListQuiz from './components/User/ListQuiz';
import DetailQuiz from './components/User/DetailQuiz';
import NotFound from './components/NotFound/NotFound';
import ManageQuiz from './components/Admin/Content/Quiz/ManageQuiz';
import PrivateRoute from './routes/PrivateRoute';
import SignUp from './components/Home/SignUp';
import CheckinQR from './components/Admin/Content/CheckinQR';
import ManageChecked from './components/Admin/Content/ManageChecked';
import CheckinPhone from './components/Admin/Content/CheckinPhone';
const Layout = () => {
    return (
        <>
            <Routes>
                <Route index element={<HomePage />}></Route>
                <Route path='register' element={<SignUp />}></Route>
                <Route path='/' element={<App />}>
                    <Route path='users' element={
                        <PrivateRoute>
                            <ListQuiz />
                        </PrivateRoute>
                    }></Route>
                    <Route path='admins' element={
                        <PrivateRoute>
                            <Admin />
                        </PrivateRoute>
                    }>
                        <Route path='checkedin' element={<ManageChecked />}></Route>
                        <Route path='checkin-phone' element={<CheckinPhone />}></Route>
                        <Route index element={<ManageUser />}></Route>
                        <Route path='checkin-qr' element={<CheckinQR />}></Route>
                    </Route>
                </Route>
                <Route path='/quiz/:id' element={<DetailQuiz />}></Route>
                <Route path='login' element={<Login />}></Route>
                <Route path='*' element={<NotFound />}></Route>
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="light"
            />
        </>
    )
}

export default Layout