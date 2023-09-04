import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import ModalDeleteQuiz from './ModalDeleteQuiz';
import ModalUpdateQuiz from './ModalUpdateQuiz';

const TableQuiz = ({ listQuiz, fetchQuiz }) => {
    const [showDeleteQuiz, setShowDeleteQuiz] = useState(false);
    const [showUpdateQuiz, setShowUpdateQuiz] = useState(false);
    const [listUpdateQuiz, setListUpdateQuiz] = useState({});
    const [idQuiz, setIdQuiz] = useState(0);
    const ClickDeleteQuiz = (id) => {
        setShowDeleteQuiz(true);
        setIdQuiz(id);
    }
    const ClickUpdateQuiz = (item) => {
        setShowUpdateQuiz(true);
        setListUpdateQuiz(item);
    }
    return (
        <>
            <div>List Quizzes: </div>
            <Table className='my-2' striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.length > 0 &&
                        listQuiz.map((item, index) => {
                            return (
                                <tr key={`table-quiz-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.difficulty}</td>
                                    <td>
                                        <button className='btn btn-warning mx-3' onClick={() => ClickUpdateQuiz(item)}>Edit</button>
                                        <button className='btn btn-danger' onClick={() => ClickDeleteQuiz(item.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </Table>
            <ModalDeleteQuiz fetchQuiz={fetchQuiz} show={showDeleteQuiz} setShow={setShowDeleteQuiz} idQuiz={idQuiz} />
            <ModalUpdateQuiz fetchQuiz={fetchQuiz} show={showUpdateQuiz} setShow={setShowUpdateQuiz} listUpdateQuiz={listUpdateQuiz} />
        </>
    );
}

export default TableQuiz;