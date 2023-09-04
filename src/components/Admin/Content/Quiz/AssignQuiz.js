import Select from 'react-select';
import { useState, useEffect } from 'react';
import { getAllQuizForAdmin, getAllUsers, postAssignQuiz } from '../../../../services/apiService';
const AssignQuiz = (props) => {
    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState({});

    const [listUser, setListUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});

    useEffect(() => {
        fetchQuiz();
        fetchUser();
    }, [])
    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.name}`
                }
            })
            setListQuiz(newQuiz)
        }
    }
    const fetchUser = async () => {
        let res = await getAllUsers();
        if (res && res.EC === 0) {
            let users = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`
                }
            })
            setListUser(users)
        }
    }
    const hanldeAssign = async () => {
        let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value)
        console.log(res)
    }
    return (
        <div className="assign-quiz-container row">
            <div className='add-new-question col'>
                <div className='form-group'></div>
                <label className='mb-2'>Select Quiz:</label>
                <Select
                    value={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                    className='form-control'
                />
            </div>
            <div className='add-new-question col'>
                <div className='form-group'></div>
                <label className='mb-2'>Select Quiz:</label>
                <Select
                    value={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                    className='form-control'
                />
            </div>
            <div>
                <button className='btn btn-warning mt-3'
                    onClick={() => hanldeAssign()}
                >Assign</button>
            </div>
        </div>
    )
}

export default AssignQuiz;