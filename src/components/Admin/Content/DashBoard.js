import React, { useEffect, useState } from 'react'
import { getDashBoard } from '../../../services/apiService'
import { toast } from 'react-toastify'

const DashBoard = () => {
    const [dataDashBoard, SetDataDashBoard] = useState({})
    useEffect(() => {
        fetchDashBoard();
    }, [])
    const fetchDashBoard = async () => {
        const res = await getDashBoard()
        if (res && res.EC === 0) {
            SetDataDashBoard(res.DT)
            toast.success(res.EM);
        } else {
            toast.error(res.EM)
        }
    }
    return (
        <div>
            <div className='satistic'>
                <div className='satistic-card'>
                    <div className='total'>
                        {dataDashBoard && dataDashBoard?.users?.total}
                    </div>
                    <div className='text'>Total</div>
                </div>
                <div className='satistic-card'>
                    <div className='total'>
                        {dataDashBoard && dataDashBoard?.users?.countUsers}
                    </div>
                    <div className='text'>Total Users</div>
                </div>
                <div className='satistic-card'>
                    <div className='total'>
                        {dataDashBoard && dataDashBoard?.users?.countAdmin}
                    </div>
                    <div className='text'>Total Admins</div>
                </div>
            </div>
        </div>
    )
}

export default DashBoard