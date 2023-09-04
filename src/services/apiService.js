import axios from "../utils/axiosCustomize";

export const postCreateNewUser = (fullName, email, generation, phoneNumber, password, facebook, role) => {
    return axios.post('api/v1/users', {
        fullName, email, generation, phoneNumber, password, facebook, role
    })
}

export const getUserWithPaginate = (page, limit, sort) => {
    return axios.get(`api/v1/users?page=${page}&limit=${limit}&sort=${sort}`)
}

export const getAllUsers = () => {
    return axios.get(`/api/v1/participant/all`);
}

export const updateUser = (id, username, role, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImgae', image);
    return axios.put('api/v1/participant', data);
}

export const deleteUser = (userId) => {
    return axios.delete('api/v1/participant', { data: { id: userId } });
}

export const registerUser = (email, username, password) => {
    return axios.post('api/v1/register', { email, username, password });
}

export const getListQuiz = () => {
    return axios.get('api/v1/quiz-by-participant');
}

export const getDataQuiz = (quizId) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${quizId}`);
}

export const postAnswer = (data) => {
    return axios.post(`api/v1/quiz-submit`, { ...data });
}

export const postCreateNewQuiz = (description, name, difficulty, quizImage) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', quizImage);
    return axios.post('api/v1/quiz', data);
}

export const getAllQuizForAdmin = () => {
    return axios.get(`api/v1/quiz/all`);
}

export const deleteQuizForAdmin = (quizId) => {
    return axios.delete(`api/v1/quiz/${quizId}`)
}

export const updateQuiz = (id, description, name, difficulty, quizImage) => {
    const data = new FormData();
    data.append('id', id);
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', quizImage);
    return axios.put('api/v1/quiz', data);
}

export const postCreateNewQuestionForQuiz = (quiz_id, description, image) => {
    const data = new FormData();
    data.append('quiz_id', quiz_id);
    data.append('description', description);
    data.append('questionImage', image);
    return axios.post('api/v1/question', data);
}

export const postCreateNewAnswerForQuestion = (description, correct_answer, question_id) => {
    return axios.post('api/v1/answer', {
        description, correct_answer, question_id
    });
}

export const postAssignQuiz = (quizId, userId) => {
    return axios.post('api/v1/quiz-assign-to-user', {
        quizId, userId
    });
}

export const getQuizWithQA = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`);
}

export const postUpsertQA = (data) => {
    return axios.post(`api/v1/quiz-upsert-qa`, { ...data })
}

export const logout = (email, refresh_token) => {
    return axios.post(`api/v1/logout`, { email, refresh_token })
}

export const getDashBoard = () => {
    return axios.get(`api/v1/overview`);
}

export const updateProfile = (username, image) => {
    const data = new FormData();
    data.append('username', username);
    data.append('userImgae', image);
    return axios.post('api/v1/profile', data)
}

export const changePassword = (current_password, new_password) => {
    return axios.post('api/v1/change-password', { current_password, new_password })
}

export const getHistory = () => {
    return axios.get('api/v1/history')
}

export const loginUser = (account, password) => {
    return axios.post('api/v1/auth/login', { account, password });
}

export const postRegister = (fullName, email, generation, phoneNumber, image, facebook, recaptchaToken) => {
    const data = new FormData();
    data.append('fullName', fullName);
    data.append('email', email);
    data.append('generation', generation);
    data.append('phoneNumber', phoneNumber);
    data.append('image', image);
    data.append('facebook', facebook);
    return axios.post('api/v1/users/signup', data)
}

export const checkinPhone = (q) => {
    return axios.patch(`api/v1/users/checkin?q=${q}`);
}

export const checkinQR = (id) => {
    return axios.patch(`api/v1/users/checkin/${id}`);
}

export const connectSEE = () => {
    return axios.get('api/v1/users/sse', {
        headers: {
            'Content-Type': 'text/event-stream',
            'Access-Control-Allow-Origin': '*'
        },
    });
}