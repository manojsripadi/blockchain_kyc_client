import axios from 'axios';
import { LOGIN_USER, LOGOUT_USER, GET_USER_DETAILS, APPROVE_DOCUMENTS, LOG_ERROR, REJECT_DOCUMENTS, UPLOAD_DOCUMENTS, GET_STATUS } from './types';

export const loginUser = (userDetails = {}) => async dispatch => {
    const res = await axios.post('http://localhost:8099/api/account/login', userDetails);
    dispatch({ type: LOGIN_USER, payload: res.data })
}

export const logoutUser = () => dispatch => {
    dispatch({ type: LOGOUT_USER })
}

export const getUserDetails = (token) => async dispatch => {
    const headers = {
        Authorization: `Bearer ${token}`
    }
    const res = await axios.get('http://localhost:8099/ipfs/request', { headers });
    dispatch({ type: GET_USER_DETAILS, payload: res.data })
}

export const uploadDocuments = (payload) => async dispatch => {
    const headers = {
        Authorization: `Bearer ${payload.token}`,
        'Content-type': 'multipart/form-data'
    }
    const formData = new FormData();
    formData.append('aadharNumber', payload.data.aadharNumber);
    formData.append('pan', payload.data.pan);
    formData.append('aadhar', payload.data.aadhar);
    formData.append('kycId', payload.data.kycId)
    const res = await axios.post('http://localhost:8099/ipfs/upload', formData, { headers });
    dispatch({ type: UPLOAD_DOCUMENTS })
}

export const approveDocuments = (payload) => async dispatch => {
    try {
        const res = await axios.post('http://localhost:8099/bc/create-iou', payload);
        dispatch({type: APPROVE_DOCUMENTS, payload: res.data.accountNumber})
    } catch(e) {
        dispatch({type: LOG_ERROR})
    }
}

export const rejectDocuments = (payload, status) => async dispatch => {
    try {
        const res = await axios.put(`http://localhost:8099/api/account/status/${status}`, payload);
        if(status === 'Rejected') {
        dispatch({type: REJECT_DOCUMENTS, payload: res.data.accountNumber})
        } else {
            dispatch({type: APPROVE_DOCUMENTS, payload: res.data.accountNumber})
        }
    } catch(e) {
        dispatch({type: LOG_ERROR})
    }
}

export const getStatus = (token) => async dispacth => {
    const headers = {
        Authorization: `Bearer ${token}`
    }
    const res = await axios.get('http://localhost:8099/api/account/status', {headers});
    dispacth({type: GET_STATUS, payload: res.data.status})
}
