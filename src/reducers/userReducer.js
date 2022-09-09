import { LOGIN_USER, LOGOUT_USER, LOG_ERROR, UPLOAD_DOCUMENTS } from '../actions/types';

const initialState = {
    loggedIn: false,
    isAdmin: false,
    name: '',
    accountNumber: '',
    aadharNumber: '',
    jwtToken: '',
    profileImage: '',
    organisation: '',
    hasError: false,
    documentsUploaded: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case LOGIN_USER:
            return {...state, ...action.payload, loggedIn: true};
        case LOGOUT_USER:
            return initialState;
        case UPLOAD_DOCUMENTS:
            return {...state, documentsUploaded: true}
        case LOG_ERROR:
            return {...state, hasError: true}
        default:
            return state
    }
}