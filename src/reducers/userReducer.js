import { LOGIN_USER, LOGOUT_USER, LOG_ERROR, UPLOAD_DOCUMENTS } from '../actions/types';

const initialState = {
    loggedIn: true,
    isAdmin: false,
    name: 'kiran',
    accountNumber: '1213323',
    aadharNumber: '',
    jwtToken: '',
    profileImage: '',
    hasError: false,
    documentsUploaded: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case LOGIN_USER:
            return {...state, ...action.payload, loggedIn: true};
        case LOGOUT_USER:
            return {...state, loggedIn: false, isAdmin: false};
        case UPLOAD_DOCUMENTS:
            return {...state, documentsUploaded: true}
        case LOG_ERROR:
            return {...state, hasError: true}
        default:
            return state
    }
}