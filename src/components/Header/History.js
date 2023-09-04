import React, { useState } from 'react'
import { useEffect } from 'react'
import { getHistory } from '../../services/apiService'

const History = () => {
    const [dataHistory, setDataHistory] = useState([])
    useEffect(() => {
        fetchHistory()
    }, [])
    const fetchHistory = async () => {
        let res = await getHistory()
        if (res && res.EC === 0) {
            setDataHistory(res.DT.data)
        }
        console.log(dataHistory)
    }
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Quiz Name</th>
                        <th scope="col">Total Question</th>
                        <th scope="col">Total Correct</th>
                    </tr>
                </thead>
                <tbody>
                    {dataHistory.map((item) => {
                        return (
                            <tr>
                                <td>{item.quizHistory.id}</td>
                                <td>{item.quizHistory.name}</td>
                                <td>{item.total_questions}</td>
                                <td>{item.total_correct}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default History