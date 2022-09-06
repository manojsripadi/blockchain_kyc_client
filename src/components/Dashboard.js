import React, { useState } from 'react';
import Header from './Header';
import './Dashboard.css';
import Profile from './Profile';
import Status from './Status';
import Admin from './Admin';
import { connect, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const Dashboard = (props) => {
    const [profileClicked, setProfileClicked] = useState(true);
    const userDetails = useSelector(state => {
        return state.user
    });
    const clickHandler = () => {
        setProfileClicked(!profileClicked);
    }
    let dynamicComp;
    if (profileClicked) {
        if(document.querySelector('.profile-info') && document.querySelector('.status-info')) {
        document.querySelector('.profile-info').classList.add('is-active');
        document.querySelector('.profile-info').classList.remove('not-active');
        document.querySelector('.status-info').classList.add('not-active');
        }
        dynamicComp = <Profile userDetails={userDetails} />
    } else {
        if(document.querySelector('.profile-info') && document.querySelector('.status-info')) {
        document.querySelector('.status-info').classList.add('is-active');
        document.querySelector('.status-info').classList.remove('not-active');
        document.querySelector('.profile-info').classList.add('not-active');
        }
        dynamicComp = <Status />
    }
    const renderContent = () => {
        return (userDetails.loggedIn ? (
            <div>
                <header>
                    <Header />
                </header>
                {userDetails.isAdmin ? (
                    <Admin />) : (
                        <main className="dashboard-container">
                            <div className="container-small">
                                <div className="profile-info is-active" onClick={clickHandler}>Profile</div>
                                <div className="status-info not-active" onClick={clickHandler}>Status</div>
                            </div>
                            {dynamicComp}
                        </main>)
                }
            </div>
        ) : (<Navigate to="/" replace="true" />)
        )
    }
    return (
        <div>{renderContent()}</div>)
}