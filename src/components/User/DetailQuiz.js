import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { getDataQuiz, postAnswer } from '../../services/apiService';
import _, { set } from 'lodash'
import Question from './Question';
import ModalResult from './ModalResult';
import RightContent from './Content/RightContent';

const DetailQuiz = () => {
    const params = useParams();
    const quizId = params.id;
    const location = useLocation();
    const [dataQuiz, setDataQuiz] = useState([])
    const [indexQ, setIndexQ] = useState(0);
    const [showModalResult, setShowModalResult] = useState(false);
    const [dataResult, setDataResult] = useState({});
    useEffect(() => {
        fetchQuestions();
    }, [quizId])
    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId);
        if (res && res.EC === 0) {
            let raw = res.DT
            let data = _.chain(raw)
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let answers = [];
                    let quesDescription, image = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            quesDescription = item.description;
                            image = item.image
                        }
                        answers.push(item.answers)
                        item.answers.isChecked = false;
                    })
                    return { quesId: key, answers, quesDescription, image }
                })
                .value()
            setDataQuiz(data)
        }
    }
    const handleCheckbox = (e, answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz)
        let question = dataQuizClone.find((item) => {
            return +item.quesId === +questionId
        })
        if (question && question.answers) {
            let b = question.answers.map((item, index) => {
                if (+item.id === +answerId) {
                    item.isChecked = true;
                }
                else {
                    item.isChecked = false;
                }
                return item;
            })
            question.answers = b;
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +item.quesId)
        if (index !== -1) {
            dataQuizClone[index] = question;
        }
        setDataQuiz(dataQuizClone);
    }
    const handlePrev = () => {
        if (indexQ - 1 < 0) return;
        setIndexQ(indexQ - 1)
    }
    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > indexQ + 1) {
            setIndexQ(indexQ + 1)
        }
    }
    const handleFinish = async () => {
        let payload = {
            "quizId": +quizId,
            "answers": []
        }
        let answers = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(item => {
                let userAnswerId = [];
                item.answers.forEach(data => {
                    if (data.isChecked === true) {
                        userAnswerId.push(data.id)
                    }
                })
                answers.push({
                    "questionId": +item.quesId,
                    "userAnswerId": userAnswerId
                })
            })
            payload.answers = answers;
            let res = await postAnswer(payload)
            if (res && res.EC === 0) {
                setDataResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData
                })
                setShowModalResult(true);
            } else {
                alert('Something wrong!')
            }
        }
    }
    return (
        <div className='detail-quiz-container'>
            <div className='left-content'>
                <div className='title'>
                    Quiz {quizId}: {location?.state?.quizTitle}
                </div>
                <hr />
                <div className='q-body'>
                    {dataQuiz[indexQ] && dataQuiz[indexQ].image ? <img src={`data:image/jpeg;base64,${dataQuiz[indexQ].image}`} /> : <div style={{ height: '100px' }}></div>}
                </div>
                <div className='q-content'>
                    <Question handleCheckbox={handleCheckbox} dataQuiz={dataQuiz} indexQ={indexQ} />
                </div>
                <div className='q-footer'>
                    <button className='btn btn-secondary' onClick={() => handlePrev()}>Prev</button>
                    <button className='btn btn-primary' onClick={() => handleNext()}>Next</button>
                    <button className='btn btn-warning' onClick={() => handleFinish()}>Finish</button>
                </div>
            </div>
            <div className='right-content'>
                <RightContent dataQuiz={dataQuiz} handleFinish={handleFinish} setIndexQ={setIndexQ} />
            </div>
            <ModalResult dataResult={dataResult} show={showModalResult} setShow={setShowModalResult} />
        </div>
    )
}

export default DetailQuiz