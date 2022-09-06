import React, { Component } from 'react';
import './Status.css';
import { connect } from 'react-redux';
import { getStatus } from '../actions';

class Status extends Component{
    componentDidMount() {
        this.props.getStatus();
    }

    clickHandler = (e) => {
        console.log('inside status comp', this)
        this.props.getStatus();
    }

    render() {
        return (
            <div className="status-container"> 
            <div class="status-text">Your KYC Request to ICICI Bank is {this.props.status.docStatus}
            </div>
            <button className="status-button" onClick={this.clickHandler}>
                Get Latest Status
            </button>
            </div>
        )
    }
}

function mapStateToProps({ status }) {
    return { status };
  }
  
  export default connect(mapStateToProps, { getStatus })(Status);