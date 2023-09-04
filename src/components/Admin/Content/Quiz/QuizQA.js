import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import { AiFillPlusCircle } from 'react-icons/ai';
import { AiFillMinusCircle } from 'react-icons/ai';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { RiImageAddFill } from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';
import { getAllQuizForAdmin, getQuizWithQA, postCreateNewAnswerForQuestion, postCreateNewQuestionForQuiz, postUpsertQA } from '../../../../services/apiService';
import _ from 'lodash';
import { toast } from 'react-toastify';

const QuizQA = () => {
    const initQuestion = [
        {
            id: uuidv4(),
            description: 'question 1',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: 'answer 1',
                    isCorrect: false
                },
                {
                    id: uuidv4(),
                    description: 'answer 2',
                    isCorrect: false
                }
            ]
        },
    ]
    const [questions, setQuestions] = useState(
        initQuestion
    )
    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const newQuestion =
            {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    },
                ]
            }
            setQuestions([...questions, newQuestion])
        }
        if (type === 'REMOVE') {
            let questionsClone = _.cloneDeep(questions);
            questionsClone = questionsClone.filter(item => item.id !== id);
            setQuestions(questionsClone);
        }
    }
    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionsClone = _.cloneDeep(questions);
        if (type === 'ADD') {
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false
            }
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers.push(newAnswer);
            setQuestions(questionsClone)
        }
        if (type === 'REMOVE') {
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== answerId);
            setQuestions(questionsClone)
        }
    }
    const handleOnChange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionsClone = _.cloneDeep(questions);
            let index = questionsClone.findIndex(item => item.id === questionId);
            if (index > -1) {
                questionsClone[index].description = value;
            }
            setQuestions(questionsClone)
        }
    }
    const handleOnChangeFileQuestion = (questionId, event) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionsClone[index].imageFile = event.target.files[0];
            questionsClone[index].imageName = event.target.files[0].name;
        }
        setQuestions(questionsClone)
    }
    const handleAnswerQuestion = (type, answerId, questionId, value) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            questionsClone[index].answers = questionsClone[index].answers.map(answer => {
                if (answer.id === answerId) {
                    if (type === 'CHECKBOX') {
                        answer.isCorrect = value;
                    }
                    if (type === 'INPUT') {
                        answer.description = value;
                    }
                }
                return answer;
            })
        }
        setQuestions(questionsClone)
    }
    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState({});
    useEffect(() => {
        fetchQuiz();
    }, [])

    useEffect(() => {
        fetchQuizWithQA();
    }, [selectedQuiz])

    const fetchQuizWithQA = async () => {
        let res = await getQuizWithQA(selectedQuiz.value)
        if (res && res.EC === 0) {
            let newQA = [];
            for (let i = 0; i < res.DT.qa.length; i++) {
                let q = res.DT.qa[i];
                if (q.imageFile) {
                    q.imageName = `Question-${q.id}.png`;
                }
                newQA.push(q);
            }
            setQuestions(newQA);
        }
    }
    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                }
            })
            setListQuiz(newQuiz)
        }
    }
    const handleSubmitQuestionForQuiz = async () => {
        //todo
        if (_.isEmpty(selectedQuiz)) {
            toast.error("Please choose a Quiz!")
            return;
        }
        //validate answer
        let isValidAnswer = true;
        let indexQ = 0, indexA = 0;
        for (let i = 0; i < questions.length; i++) {
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    isValidAnswer = false;
                    indexA = j;
                    break;
                }
            }
            indexQ = i;
            if (isValidAnswer === false) break;
        }
        if (isValidAnswer === false) {
            toast.error(`Not empty answer ${indexA + 1} at Question ${indexQ + 1}`)
            return
        }
        //validate question
        let isValidQuestion = true;
        let indexQ1 = 0;
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description) {
                isValidQuestion = false;
                indexQ1 = i;
                break;
            }
        }
        if (isValidQuestion === false) {
            toast.error(`Not empty description for Question ${indexQ1 + 1}`)
            return
        }
        let questionsClone = _.cloneDeep(questions);
        let res = await postUpsertQA({
            quizId: selectedQuiz.value,
            questions: questionsClone
        });
        if (res && res.EC === 0) {
            toast.success(res.EM)
            fetchQuizWithQA();
        }
    }
    return (
        <div className='questions-container'>
            <div className='add-new-question'>
                <div className='form-group'></div>
                <label className='mb-2'>Select Quiz:</label>
                <Select
                    value={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                    className='form-control'
                />
            </div>
            <div className='mt-3 mb-2'>
                Add questions:
            </div>
            {
                questions && questions.length > 0 &&
                questions.map((question, index) => {
                    return (
                        <div key={question.id} className='q-main mb-4'>
                            <div className='questions-content'>
                                <div className="form-floating description">
                                    <input type="text" className="form-control" placeholder="name@example.com" value={question.description}
                                        onChange={(event) => handleOnChange('QUESTION', question.id, event.target.value)}
                                    />
                                    <label>Question {index + 1} 's description</label>
                                </div>
                                <div className='group-upload'>
                                    <label className='lable-up' htmlFor={`${question.id}`}>
                                        <RiImageAddFill className='label-up' />
                                    </label>
                                    <input
                                        id={`${question.id}`}
                                        onChange={(event) => handleOnChangeFileQuestion(question.id, event)}
                                        hidden type={'file'} />
                                    <span>{question.imageName ? question.imageName : '0 file is uploaded'}</span>
                                </div>
                                <div className='btn-add'>
                                    <span onClick={() => handleAddRemoveQuestion('ADD', '')}><AiFillPlusCircle className='icon-add' /></span>
                                    {questions.length > 1 && <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}><AiFillMinusCircle className='icon-remove' /></span>}
                                </div>
                            </div>
                            {question.answers && question.answers.length > 0
                                && question.answers.map((answer, index) => {
                                    return (
                                        <div key={answer.id} className='answers-content'>
                                            <input className="form-check-input iscorrect" type="checkbox" value={answer.description} checked={answer.isCorrect}
                                                onChange={(event) => handleAnswerQuestion('CHECKBOX', answer.id, question.id, event.target.checked)}
                                            />
                                            <div className="form-floating answer-name">
                                                <input type="text" className="form-control" value={answer.description} placeholder="name@example.com" onChange={(event) => handleAnswerQuestion('INPUT', answer.id, question.id, event.target.value)} />
                                                <label>Answer {index + 1}</label>
                                            </div>
                                            <div className='btn-add btn-group'>
                                                <span onClick={() => handleAddRemoveAnswer('ADD', question.id)}><AiOutlinePlusCircle className='icon-add' /></span>
                                                {question.answers.length > 1 && <span onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}><AiOutlineMinusCircle className='icon-remove' /></span>}
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                    )
                })
            }
            <div onClick={() => handleSubmitQuestionForQuiz()} className='btn btn-warning'>Save Questions</div>
        </div>
    )
}

export default QuizQA