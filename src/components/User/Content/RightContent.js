import React, { useRef } from 'react'
import CountDown from './CountDown';
const RightContent = (props) => {
    const refDiv = useRef([]);
    const { dataQuiz } = props;
    const onTimeUp = () => {
        props.handleFinish();
    }
    const getClassQuestion = (question) => {
        console.log(question)
        if (question && question.answers.length > 0) {
            let isAnswered = question.answers.find(a => a.isChecked === true);
            if (isAnswered) {
                return "question selected"
            }
        }
        return 'question';
    }

    const handleClickQuestion = (question, index) => {
        props.setIndexQ(index)
        if (refDiv.current) {
            refDiv.current.forEach(item => {
                if (item && item.className === 'question clicked') {
                    item.className = 'question'
                }
            })
        }
        if (question && question.answers.length > 0) {
            let isAnswered = question.answers.find(a => a.isChecked === true);
            if (isAnswered) {
                return "question selected"
            }
        }
        refDiv.current[index].className = 'question clicked';
    }

    return (
        <>
            <div className='main-timer'>
                <CountDown
                    onTimeUp={onTimeUp}
                />
            </div>
            <div className='main-question'>
                {dataQuiz && dataQuiz.length > 0 &&
                    dataQuiz.map((item, index) => {
                        return (
                            <div key={`question-abc-${index}`} onClick={() => handleClickQuestion(item, index)} className={getClassQuestion(item)} ref={ref => refDiv.current[index] = ref}>{index + 1}</div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default RightContent