import { useEffect, useState } from "react";
import ModalCreateUser from "./ModalCreateUser"
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import { getUserWithPaginate } from '../../../services/apiService';
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import { AiOutlineReload } from "react-icons/ai";
import { AiOutlineSortAscending } from "react-icons/ai";
import { AiOutlineSortDescending } from "react-icons/ai";
import { BsFilter } from "react-icons/bs";
import _ from 'lodash';

const ManageUser = () => {
    const LIMIT_USER = 20;
    const [pageCount, setPageCount] = useState(0);
    const [pagePos, setPagePos] = useState(1);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userDelete, setUserDelete] = useState(0);
    const [listUpdateUser, setListUpdateUser] = useState({});
    const [listUser, setListUser] = useState([]);
    const [initalList, setInitalList] = useState([]);
    //filter action
    const [sort, setSort] = useState("createdAt:desc");
    const [searchName, setSearchName] = useState("");

    const fetchAllUserWithPaginate = async (page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER, sort);
        if (res.statusCode === 200) {
            setListUser(res.data.users);
            setInitalList(res.data.users);
            setPageCount(res.data.count);
        }
    }
    useEffect(() => {
        fetchAllUserWithPaginate(1)
    }, [sort])
    const handleClickUpdate = (item) => {
        setShowUpdateModal(true);
        setListUpdateUser(item);
    }
    const handleClickView = (item) => {
        setShowViewModal(true);
        setListUpdateUser(item);
    }
    const handleClickDelete = (item) => {
        setShowDeleteModal(true);
        setUserDelete(item.id);
    }
    const handleSearch = () => {
        if (searchName.length > 0) {
            let re = new RegExp(searchName + '.+$', 'i');
            let listUserClone = _.cloneDeep(initalList);
            listUserClone = listUserClone.filter((item) => {
                return item.fullName.search(re) != -1;
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
    const handleFilter = (type) => {
        if (type === 'check') {
            let listUserClone = _.cloneDeep(initalList);
            listUserClone = listUserClone.filter((item) => {
                return item.isCheckin === true;
            });
            setListUser(listUserClone);
        } else if (type === 'uncheck') {
            let listUserClone = _.cloneDeep(initalList);
            listUserClone = listUserClone.filter((item) => {
                return item.isCheckin === false;
            });
            setListUser(listUserClone);
        } else {
            setListUser(initalList);
        }
    }

    return (
        <div className='manage-user-container'>
            <div className='title'>
                Danh sách thành viên
            </div>
            <div className="table-action">
                <div className="table-reload" onClick={() => fetchAllUserWithPaginate(1)}><AiOutlineReload /></div>
                <div className="table-search">
                    <input type="text" className="form-control" onKeyDown={(event) => handleKeyDown(event)} onChange={(event) => setSearchName(event.target.value)} placeholder='Tìm kiếm' />
                    <div className="btn-search" onClick={() => handleSearch()}>Tìm kiếm</div>
                </div>
                {sort === "createdAt:desc" ? <div className="table-sort" onClick={() => setSort("createdAt:asc")}><AiOutlineSortAscending /></div> : <div className="table-sort" onClick={() => setSort("createdAt:desc")}><AiOutlineSortDescending /></div>}
            </div>
            <div className='users-content'>
                <div className="btn-add-new">
                    <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}><FcPlus />Add new users</button>
                    <div className="table-filter">
                        <BsFilter />
                        <ul className="filter-action">
                            <li onClick={() => handleFilter("all")}>Tất cả</li>
                            <li onClick={() => handleFilter("uncheck")}>Chưa checkin</li>
                            <li onClick={() => handleFilter("check")}>Đã checkin</li>
                        </ul>
                    </div>
                </div>
                <div className="table-users-container">
                    <TableUser fetchAllUserWithPaginate={fetchAllUserWithPaginate} listUser={listUser} handleClickUpdate={handleClickUpdate} handleClickView={handleClickView} handleClickDelete={handleClickDelete} pageCount={pageCount} setPagePos={setPagePos} />
                </div>
                <ModalCreateUser pagePos={pagePos} fetchAllUserWithPaginate={fetchAllUserWithPaginate} show={showCreateModal} setShow={setShowCreateModal} />
                <ModalUpdateUser pagePos={pagePos} fetchAllUserWithPaginate={fetchAllUserWithPaginate} show={showUpdateModal} setShow={setShowUpdateModal} listUpdateUser={listUpdateUser} setListUpdateUser={setListUpdateUser} />
                <ModalViewUser show={showViewModal} setShow={setShowViewModal} listUpdateUser={listUpdateUser} setListUpdateUser={setListUpdateUser} />
                <ModalDeleteUser userDelete={userDelete} fetchAllUserWithPaginate={fetchAllUserWithPaginate} pagePos={pagePos} show={showDeleteModal} setShow={setShowDeleteModal} />
            </div>
        </div>
    )
}

export default ManageUser