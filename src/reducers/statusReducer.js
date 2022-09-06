import { GET_STATUS } from "../actions/types";

const initialState = {
    docStatus: ''
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_STATUS:
            return {...state, docStatus: action.payload}
        default:
            return state
    }
}