import React, { Component } from 'react';
import './Status.css';
import { connect } from 'react-redux';
import { getStatus } from '../actions';

class Status extends Component{
    componentDidMount() {
        this.props.getStatus(this.props.user.jwtToken);
    }

    clickHandler = (e) => {
        console.log('inside status comp', this)
        this.props.getStatus(this.props.user.jwtToken);
    }

    render() {
        return (
            <div className="status-container"> 
            <div class="status-text">Your KYC Request with this Bank is {this.props.status.docStatus}
            </div>
            <button className="status-button" onClick={this.clickHandler}>
                Get Latest Status
            </button>
            </div>
        )
    }
}

function mapStateToProps({ status, user}) {
    return { status, user };
  }
  
  export default connect(mapStateToProps, { getStatus })(Status);