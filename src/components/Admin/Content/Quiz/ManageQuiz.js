import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import { postCreateNewQuiz, getAllQuizForAdmin } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';
const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];
const ManageQuiz = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState(null);
    const [listQuiz, setListQuiz] = useState([]);
    useEffect(() => {
        fetchQuiz();
    }, [])
    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            setListQuiz(res.DT)
        }
    }
    const handleChangeFile = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }
    const handleSubmitQuiz = async () => {
        //validate
        if (!name || !description) {
            toast.error('Name/Description is required')
            return
        }
        //call api
        let res = await postCreateNewQuiz(description, name, type?.value, image);
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setName('');
            setDescription('');
            setImage('');
            await fetchQuiz();
        } else {
            toast.error(res.EM)
        }
    }
    return (
        <div className='quiz-container'>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Manage Quizzes</Accordion.Header>
                    <Accordion.Body>
                        <div className='add-new'>
                            <fieldset className='border rounded-3 p-3'>
                                <legend className='float-none w-auto px-3'>Add new Quiz</legend>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" placeholder="Your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <label>Name</label>
                                </div>
                                <div className="form-floating">
                                    <input type="text" className="form-control" placeholder="Your description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    <label >Description</label>
                                </div>
                                <div className='my-3'>
                                    <Select
                                        defaultValue={type}
                                        onChange={setType}
                                        options={options}
                                        placeholder={"Quiz type..."}
                                    />
                                </div>
                                <div className='more-actions'>
                                    <label className='mb-1'>Upload image</label>
                                    <input type='file' className='form-control'
                                        onChange={(e) => handleChangeFile(e)} />
                                </div>
                                <div className='mt-3'>
                                    <button onClick={() => handleSubmitQuiz()} className='btn btn-warning'>Save</button>
                                </div>
                            </fieldset>
                        </div>
                        <div className='list-detail'>
                            <TableQuiz listQuiz={listQuiz} fetchQuiz={fetchQuiz} />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Update Q/A Quizzes</Accordion.Header>
                    <Accordion.Body>
                        <QuizQA />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Assign to Users</Accordion.Header>
                    <Accordion.Body>
                        <AssignQuiz />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

        </div>
    )
}

export default ManageQuiz