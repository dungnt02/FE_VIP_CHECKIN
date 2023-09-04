import _ from 'lodash';
import { useEffect, useState } from "react";
import { AiOutlineReload, AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { connectSEE, getUserWithPaginate } from '../../../services/apiService';
import ModalViewUser from "./ModalViewUser";
import TableUserCheck from "./TableUserCheck";
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { fetchEventSource } from "@microsoft/fetch-event-source";

const ManageChecked = () => {
    const LIMIT_USER = 20;
    const [pageCount, setPageCount] = useState(0);
    const [pagePos, setPagePos] = useState(1);
    const [showViewModal, setShowViewModal] = useState(false);
    const [listUpdateUser, setListUpdateUser] = useState({});
    const [listUser, setListUser] = useState([]);
    const token = useSelector(state => state.user.account.access_token);
    //filter action
    const [sort, setSort] = useState("createdAt:desc");
    const [searchName, setSearchName] = useState("");
    const fetchAllUserWithPaginate = async (page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER, sort);
        if (res.statusCode === 200) {
            setPageCount(res.data.count);
            let listUserClone = _.cloneDeep(res.data.users);
            listUserClone = listUserClone.filter((item) => {
                return item.isCheckin === true;
            });
            setListUser(listUserClone);
        }
    }
    const fetchData = async () => {
        await fetchEventSource("http://103.67.162.203:3000/api/v1/users/sse", {
            method: "GET",
            headers: {
                'Accept': "text/event-stream",
                'Authorization': 'Bearer ' + token
            },
            onmessage() {
                fetchAllUserWithPaginate(1);
            },
            onclose() {
                console.log("Connection closed by the server");
            },
            onerror(err) {
                console.log("There was an error from server", err);
            },
        });
    };
    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        fetchAllUserWithPaginate(1);
    }, [sort])

    const handleClickView = (item) => {
        setShowViewModal(true);
        setListUpdateUser(item);
    }
    const handleSearch = () => {
        if (searchName.length > 0) {
            let re = new RegExp(searchName + '.+$', 'i');
            let listUserClone = _.cloneDeep(listUser);
            listUserClone = listUserClone.filter((item) => {
                return item.fullName.search(re) !== -1;
            });
            setListUser(listUserClone);
        } else {
            fetchAllUserWithPaginate(1);
        }
    }

    const handleKeyDown = (event) => {
        if (event && event.key === 'Enter') {
            handleSearch();
        }
    }

    // const handleConnect = async () => {
    //     // const response = await connectSEE();
    //     const eventSourceInitDict = { https: { rejectUnauthorized: false } };
    //     const eventSource = new EventSource('http://103.67.162.203:3000/api/v1/users/sse',
    //         eventSourceInitDict
    //     );
    //     eventSource.addEventListener('open', function (event) {
    //         console.log('Connection was opened');
    //     }, false);
    //     eventSource.onmessage = function (event) {
    //         console.log(`message ${event.data}`)
    //     }
    //     eventSource.onerror = function (err) {
    //         console.log('helo')
    //         eventSource.close()
    //     }
    // }

    return (
        <div className='manage-user-container'>
            <div className='title'>
                Danh sách đã checkin
            </div>
            <div className="state-check">
                <b>Trạng thái: </b><span style={{ color: 'green', fontSize: '14px', fontWeight: '500' }}>Kết nối dữ liệu thời gian thực thành công</span>
            </div>
            <div style={{ marginBottom: '20px' }} className="table-action">
                <div className="table-reload" onClick={() => fetchAllUserWithPaginate(1)}><AiOutlineReload /></div>
                <div className="table-search">
                    <input type="text" className="form-control" onKeyDown={(event) => handleKeyDown(event)} onChange={(event) => setSearchName(event.target.value)} placeholder='Tìm kiếm' />
                    <div className="btn-search" onClick={() => handleSearch()}>Tìm kiếm</div>
                </div>
                {sort === "createdAt:desc" ? <div className="table-sort" onClick={() => setSort("createdAt:asc")}><AiOutlineSortAscending /></div> : <div className="table-sort" onClick={() => setSort("createdAt:desc")}><AiOutlineSortDescending /></div>}
            </div>
            <div className='users-content'>
                <div className="table-users-container">
                    <TableUserCheck fetchAllUserWithPaginate={fetchAllUserWithPaginate} listUser={listUser} handleClickView={handleClickView} pageCount={pageCount} setPagePos={setPagePos} />
                </div>
                <ModalViewUser show={showViewModal} setShow={setShowViewModal} listUpdateUser={listUpdateUser} setListUpdateUser={setListUpdateUser} />
            </div>
        </div>
    )
}

export default ManageChecked