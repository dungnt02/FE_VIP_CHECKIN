import { FETCH_USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS } from "../action/userAction"

const INITIAL_STATE = {
    account: {
        access_token: '',
    },
    isAuthenticated: false
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            return {
                ...state, account: {
                    access_token: action?.payload?.token?.accessToken,
                },
                isAuthenticated: true
            }
        case USER_LOGOUT_SUCCESS:
            return {
                ...state, account: {
                    access_token: '',
                },
                isAuthenticated: false
            }
        default: return state
    }
}

export default userReducer