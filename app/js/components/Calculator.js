'use strict';

import React from 'react';
import helpers from '../helpers.js';

class Calculator extends React.Component {

    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const value = event.target.value;
        const input = event.target.id;

        this.props.inputChange(value, input);
    }

    handleSubmit(event) {
        event.preventDefault();
        const repaymentData = helpers.calculateRepayment({
            balance: this.props.balance,
            interest: this.props.interest,
            payment: this.props.payment
        });

        this.props.handleRepaymentData(repaymentData);
    }

    render() {
        return (
            <form className="calculator-form" noValidate onSubmit={this.handleSubmit}>
                <div className="form-input">
                    <label htmlFor="balance">Total Debt:</label>
                    <input id="balance" type="number" value={this.props.balance} onChange={this.handleChange} />
                </div>
                <div className="form-input">
                    <label htmlFor="interest">Interest Rate:</label>
                    <input id="interest" type="number" step="any" value={this.props.interest} onChange={this.handleChange} />
                </div>
                <div className="form-input">
                    <label htmlFor="payment">Monthly Payment:</label>
                    <input id="payment" type="number" value={this.props.payment} onChange={this.handleChange} />
                </div>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

Calculator.PropTypes = {
    inputChange: React.PropTypes.func,
    balance: React.PropTypes.number.isRequired,
    interest: React.PropTypes.number.isRequired,
    payment: React.PropTypes.number.isRequired,
    handleRepaymentData: React.PropTypes.func
}

export default Calculator;
