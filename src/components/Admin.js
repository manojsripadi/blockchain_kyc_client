import React, { Component } from 'react';
import Header from './Header';
import { getUserDetails, approveDocuments, rejectDocuments } from '../actions/index';
import { connect } from 'react-redux';
import './Admin.css';

class Admin extends Component {
    userDetails = [];
    componentDidMount() {
        this.props.getUserDetails(this.props.user.jwtToken);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.admin.approvedAccountNumber !== this.props.admin.approvedAccountNumber) {
            const index = this.getIndex(nextProps.admin.approvedAccountNumber);
            const docDetailsElem = document.querySelectorAll('.doc-details')[index];
            docDetailsElem.setAttribute('class', 'doc-details class-approved');
            docDetailsElem.querySelector('.doc-status').innerText = this.userDetails[index].kycId ? 'Accepted' : 'Approved';
            docDetailsElem.querySelector('.button-approve').setAttribute('disabled', true);
            docDetailsElem.querySelector('.button-reject').setAttribute('disabled', true)
        } else if (nextProps.admin.rejectedAccountNumber !== this.props.admin.rejectedAccountNumber) {
            const index = this.getIndex(nextProps.admin.rejectedAccountNumber);
            const docDetailsElem = document.querySelectorAll('.doc-details')[index];
            docDetailsElem.setAttribute('class', 'doc-details class-rejected');
            docDetailsElem.querySelector('.doc-status').innerText = 'Rejected';
            docDetailsElem.querySelector('.button-approve').setAttribute('disabled', true);
            docDetailsElem.querySelector('.button-reject').setAttribute('disabled', true)
            docDetailsElem.querySelector('.button-container').style.display = 'none';
        }
    }

    getIndex(accountNumber) {
        return this.userDetails.findIndex(elem => elem.accountNumber === accountNumber);
    }

    approveHandler(e, index, kycId) {
        if (kycId) {
            this.props.rejectDocuments(this.userDetails[index], 'ACCEPTED');
        } else {
            this.props.approveDocuments(this.userDetails[index])
        }
    }

    rejectHandler(e, index) {
        this.props.rejectDocuments(this.userDetails[index], 'REJECTED');
    }

    renderContent(userList = []) {
        this.userDetails = userList;
        return userList.map((item, index) => {
            let dynamicClass;
            if (item.status === 'Pending') {
                dynamicClass = 'class-pending'
            } else if (item.status === 'Approved') {
                dynamicClass = 'class-approved'
            } else {
                dynamicClass = 'class-rejected'
            }
            return (
                <div className={dynamicClass + ' ' + 'doc-details'} key={index}>
                    <div className="doc-list">{item.date}</div>
                    <div className="doc-list">{item.kycId}</div>
                    <div className="doc-list">{item.validUntil}</div>
                    <div className="doc-list doc-account-number">{item.accountNumber}</div>
                    <div className="doc-list">{item.customerName}</div>
                    <div className="doc-list">{!item.kycId && <a href={item.fileName} target="_blank" className="doc-list-customer-file">Customer File</a>}</div>
                    <div className="doc-list doc-status">{item.status}</div>
                    {item.status !== 'Rejected' && <div className="doc-list button-container"><div><button className="doc-list-button button-approve" onClick={e => this.approveHandler(e, index, item.kycId)}>{item.kycId ? 'Accept' : 'Approve'}</button></div>
                        <div><button className="doc-list-button button-reject" onClick={e => this.rejectHandler(e, index)}>Reject</button></div></div>}
                </div>
            )
        })
    }

    render() {
        return (
            <div className="admin-container">
                <h3 className="admin-heading"> KYC Documents for Approval </h3>
                <div className="user-details">
                    <div className="documents-list-heading">Date</div>
                    <div className="documents-list-heading">KYC ID</div>
                    <div className="documents-list-heading">Valid Until</div>
                    <div className="documents-list-heading">Account No.</div>
                    <div className="documents-list-heading">Customer Name</div>
                    <div className="documents-list-heading">File Name</div>
                    <div className="documents-list-heading">Status</div>
                    <div className="documents-list-heading">Approve/Reject</div>
                </div>
                <div>{this.renderContent(this.props.admin.userDetails)}</div>
            </div>
        )
    }
}

function mapStateToProps({ user, admin }) {
    return { user, admin };
}

export default connect(mapStateToProps, { getUserDetails, approveDocuments, rejectDocuments })(Admin);