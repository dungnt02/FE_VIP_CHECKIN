import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getAllUser } from '../../../services/apiService';
import ReactPaginate from 'react-paginate';

const TableUser = (props) => {
    const { setPagePos, listUser, handleClickView, handleClickUpdate, handleClickDelete, pageCount, fetchAllUserWithPaginate } = props;
    const handlePageClick = (event) => {
        fetchAllUserWithPaginate(+event.selected + 1)
        setPagePos(+event.selected + 1)
    };
    return (
        <>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Họ và tên</th>
                        <th>Khóa</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length > 0 && listUser.map((item, index) => {
                        return (
                            <tr key={`table-user-${index}`}>
                                <td>{index}</td>
                                <td>{item.fullName}</td>
                                <td>{item.generation}</td>
                                <td>{item.email}</td>
                                <td>{item.phoneNumber}</td>
                                <td>
                                    <button className='btn btn-secondary' onClick={() => handleClickView(item)}>View</button>
                                    <button className='btn btn-warning mx-3' onClick={() => handleClickUpdate(item)}>Update</button>
                                    <button className='btn btn-danger' onClick={() => handleClickDelete(item)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                    {listUser && listUser.length === 0 &&
                        <tr>
                            <td colSpan={4}>Not Found Data</td>
                        </tr>}
                </tbody>
            </Table>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                activeClassName={'active'}
            />
        </>
    );
}

export default TableUser;