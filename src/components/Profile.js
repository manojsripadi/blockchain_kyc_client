import React, { useState, useEffect } from 'react';
import './Profile.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { uploadDocuments } from '../actions';

const Profile = (props) => {
    const [data, setData] = useState({
        aadharNumber: '',
        aadhar: '',
        pan: '',
        kycId: '',
        disableSubmit: false
    });
    const [errors, setErrors] = useState({
        hasError: false
    })

    const dispatch = useDispatch();
    useEffect(() => {
        if ((data.aadharNumber && data.aadhar && data.pan) || data.kycId) {
            setErrors({ ...errors, hasError: false })
        }
    }, [data])
    const submitHandler = (e) => {
        e.preventDefault();
        if (!data.kycId) {
            if (data.aadharNumber && data.aadhar && data.pan) {
                const payload = { data, token: props.userDetails.jwtToken }
                dispatch(uploadDocuments(payload))
            } else {
                setErrors({ ...errors, hasError: true })
            }
        } else {
            dispatch(uploadDocuments({ data, token: props.userDetails.jwtToken }))
        }
    }

    const changeHandler = (e) => {
        if (e.target.name == 'aadharNumber' || e.target.name == 'kycId') {
            setData({ ...data, [e.target.name]: e.target.value });
        } else {
            setData({ ...data, [e.target.name]: e.target.files[0] });
        }
    }

    return (
        <div>
            <div className="profile-container">
                <div className="profile-photo">
                    <img src="/profile-icon-2.png" alt="Profile Image" />
                </div>
                <form className="profile-form" onSubmit={submitHandler}>
                    <h3 className="profile-heading">
                        Complete Your Profile
                </h3>
                    <div className="profile-input">
                        <label for="customerName"> Name</label>
                        <input type="text" id="customerName" value={props.userDetails.name} disabled />
                    </div>
                    <div className="profile-input">
                        <label for="accountNumber"> Account Number</label>
                        <input type="text" id="accountNumber" value={props.userDetails.accountNumber} disabled />
                    </div>
                    <div className="profile-input">
                        <label for="kycId"> KYC Id</label>
                        <input type="text" id="kycId" name="kycId" onChange={changeHandler} disabled={(data.aadharNumber || props.userDetails.documentsUploaded) ? true : false} />
                    </div>
                    <div className="profile-input">
                        <label for="aadharNumber"> Aadhar Number</label>
                        <input type="number" name="aadharNumber" id="aadharNumber" onChange={changeHandler} disabled={(data.kycId || props.userDetails.documentsUploaded) ? true : false} />
                    </div>
                    <div className="profile-input">
                        <label for="aadhar"> Aadhar Card</label>
                        <input type="file" name="aadhar" id="aadhar" onChange={changeHandler} disabled={(data.kycId || props.userDetails.documentsUploaded) ? true : false} />
                    </div>
                    <div className="profile-input">
                        <label for="pan"> Pan Card</label>
                        <input type="file" name="pan" id="pan" onChange={changeHandler} disabled={(data.kycId || props.userDetails.documentsUploaded) ? true : false} />
                    </div>
                    {/* {errors.hasError && <div className="form-error"> Please upload all the documents requested to proceed
                </div>} */}
                    {/* {props.userDetails.documentsUploaded && <div className="form-uploaded"> Documents uploaded successully
                </div>} */}
                    {/* <div className="profile-submit-button">
                    <button type="submit" disabled={errors.hasError || props.userDetails.documentsUploaded}>Submit</button>
                </div> */}
                </form>
            </div>
            {errors.hasError && <div className="form-error"> Please upload all the documents requested to proceed
                </div>}
            {props.userDetails.documentsUploaded && <div className="form-uploaded"> Documents uploaded successully
                </div>}
            <div className="profile-submit-button">
                <button type="submit" disabled={errors.hasError || props.userDetails.documentsUploaded} onClick={submitHandler}>Submit</button>
            </div>
        </div>
    )
}

export default Profile;