import React, { useEffect, useState } from 'react'
import { getListQuiz } from '../../services/apiService';
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useNavigate } from 'react-router-dom';
const ListQuiz = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const [listQuiz, setListQuiz] = useState([]);
    useEffect(() => {
        if (isAuthenticated === true) {
            getQuizData();
        }
    }, [isAuthenticated])
    const getQuizData = async () => {
        const res = await getListQuiz();
        if (res && res.EC === 0) {
            setListQuiz(res.DT);
        }
    }
    return (
        <div className='list-quiz-container container'>
            {listQuiz && listQuiz.length > 0
                && listQuiz.map((item, index) => (
                    <div key={`${index}-quiz`} className="card" style={{ width: '18rem' }}>
                        <img src={`data:image/jpeg;base64,${item.image}`} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Quiz {index + 1}</h5>
                            <p className="card-text">{item.description}</p>
                            <a className="btn btn-primary" onClick={() => navigate(`/quiz/${item.id}`, { state: { quizTitle: item.description } })}>Start Now</a>
                        </div>
                    </div>
                ))}
            {listQuiz && listQuiz.length === 0 &&
                <div className='not-quiz'>
                    You don't have any Quiz!
                </div>}
        </div>
    )
}

export default ListQuiz