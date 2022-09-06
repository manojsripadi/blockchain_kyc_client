import React, { useState, Component } from 'react';
import './login.css';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { loginUser } from '../actions/index';

class Login extends Component {
    state = {
        username: '',
        password: '',
        navigate: false
    };
    loginHandler = (e) => {
        e.preventDefault();
        this.props.loginUser({ userId: this.state.username, password: btoa(this.state.password) });
    }

    changeHandler = (e) => {
        this.setState({ ...this.state, [e.target.name]: e.target.value })
    }

    render() {
        return (
            <div className="App">
                {this.props.user.loggedIn && <Navigate to="/dashboard" replace="true" />}
                <form className="loginForm" onSubmit={this.loginHandler}>
                    <h1 className="loginForm__heading"> Login </h1>
                    <input type="text" placeholder="Username" name="username" className="loginForm__userName" onChange={this.changeHandler} />
                    <input type="password" placeholder="Password" name="password" className="loginForm__password" onChange={this.changeHandler} />
                    <button type="submit" className="loginForm__button"> Sign In </button>
                </form>
            </div>
        )
    }
}

function mapStateToProps({ user }) {
    console.log('inside maptostore', { user })
    return { user };
}

export default connect(mapStateToProps, { loginUser })(Login);
