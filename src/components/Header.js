import React from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../actions';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userDetails = useSelector(state => {
        return state.user
    });
    const clickHandler = () => {
        dispatch(logoutUser());
        navigate('/')
    }
    return (
        <nav className="nav-wrapper">
            <span className="bank-name">{userDetails.organisation === 'ICICI' ? 'ICICI Bank' : 'HDFC Bank'}</span>
            <ul className="list-items">
                <li>Profile</li>
                <li><a onClick={clickHandler} href="javascript:void(0);">Logout</a></li>
            </ul>
        </nav>
    )
}

export default Header;