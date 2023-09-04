import React from 'react'
import _ from 'lodash'
const Question = ({ dataQuiz, indexQ, handleCheckbox }) => {
    if (_.isEmpty(dataQuiz)) {
        return
    }
    return (
        <>
            <div className='question'>{`Question ${indexQ + 1}: ${dataQuiz[indexQ].quesDescription}`}</div>
            <div className='answer'>
                {dataQuiz[indexQ] && dataQuiz[indexQ].answers.length > 0 && dataQuiz[indexQ].answers.map((item, index) => {
                    return (
                        <div key={`quiz-${index}`} className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id={`flexRadioDefault${index}`} onChange={(e) => handleCheckbox(e, item.id, dataQuiz[indexQ].quesId)} checked={item.isChecked} />
                            <label className="form-check-label" htmlFor={`flexRadioDefault${index}`}>
                                {item.description}
                            </label>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Question