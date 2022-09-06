import { GET_USER_DETAILS, APPROVE_DOCUMENTS, REJECT_DOCUMENTS } from "../actions/types";

const initialState = {
    userDetails: [],
    approvedAccountNumber: '',
    rejectedAccountNumber: ''
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_USER_DETAILS:
            return {...state, userDetails: action.payload}
        case APPROVE_DOCUMENTS:
            return {...state, approvedAccountNumber: action.payload}
        case REJECT_DOCUMENTS:
                return {...state, rejectedAccountNumber: action.payload}
        default:
            return state
    }
}